import { createStore } from 'vuex';
import { horseNames, horseColors, shuffleArray } from '@/utils/utils';

export default createStore({
  state: {
    horses: [],
    schedule: [],
    results: [],
    currentRound: 0,
    raceInProgress: false,
    racePaused: false,
    allRacesFinished: false,
    roundInProgress: false,
  },
  mutations: {
    SET_HORSES(state, horses) {
      state.horses = horses;
    },
    SET_SCHEDULE(state, schedule) {
      state.schedule = schedule;
    },
    ADD_RESULT(state, result) {
      state.results.push(result);
    },
    INCREMENT_ROUND(state) {
      state.currentRound++;
    },
    SET_RACE_PROGRESS(state, status) {
      state.raceInProgress = status;
    },
    SET_RACE_PAUSED(state, status) {
      state.racePaused = status;
    },
    SET_ALL_RACES_FINISHED(state, status) {
      state.allRacesFinished = status;
    },
    SET_ROUND_IN_PROGRESS(state, status) {
      state.roundInProgress = status;
    },
    UPDATE_HORSE_POSITION(state, { roundIndex, horseId, position }) {
      const horse = state.schedule[roundIndex].participants.find(
        (h) => h.id === horseId,
      );
      if (horse) {
        horse.position = position;
      }
    },
    RESET_HORSE_POSITIONS(state, roundIndex) {
      state.schedule[roundIndex].participants.forEach((horse) => {
        horse.position = 0;
      });
    },
  },
  actions: {
    generateHorses({ commit }) {
      const horses = horseNames.map((name, index) => ({
        id: index + 1,
        name,
        condition: Math.floor(Math.random() * 100) + 1,
        color: horseColors[index % horseColors.length],
      }));
      commit('SET_HORSES', horses);
    },
    generateSchedule({ commit, state }) {
      const distances = [1200, 1400, 1600, 1800, 2000, 2200];
      const schedule = distances.map((distance, index) => {
        const shuffledHorses = shuffleArray([...state.horses]);
        return {
          round: index + 1,
          distance,
          participants: shuffledHorses.slice(0, 10).map((horse) => ({
            ...horse,
            position: 0,
          })),
        };
      });
      commit('SET_SCHEDULE', schedule);
      commit('SET_ALL_RACES_FINISHED', false);
    },
    async startRace({ commit, state }) {
      commit('SET_RACE_PROGRESS', true);

      for (let i = state.currentRound; i < state.schedule.length; i++) {
        commit('SET_ROUND_IN_PROGRESS', true);
        commit('RESET_HORSE_POSITIONS', i);

        const participants = state.schedule[i].participants;
        const distance = state.schedule[i].distance;

        const result = await new Promise((resolve) => {
          const interval = setInterval(() => {
            if (state.racePaused) {
              return;
            }

            let raceFinished = false;

            participants.forEach((horse) => {
              horse.position += Math.random() * 10;

              if (horse.position >= 100) {
                horse.position = 100;
                raceFinished = true;
              }
            });

            participants.forEach((horse) => {
              commit('UPDATE_HORSE_POSITION', {
                roundIndex: i,
                horseId: horse.id,
                position: horse.position,
              });
            });

            if (raceFinished) {
              clearInterval(interval);
              resolve({ round: i + 1, horses: participants, distance });
            }
          }, distance / 10);
        });

        commit('ADD_RESULT', result);
        commit('INCREMENT_ROUND');

        commit('SET_ROUND_IN_PROGRESS', false);

        if (state.currentRound >= state.schedule.length) {
          commit('SET_ALL_RACES_FINISHED', true);
          break;
        }
      }

      commit('SET_RACE_PROGRESS', false);
    },
    pauseRace({ commit }) {
      commit('SET_RACE_PAUSED', true);
    },
    continueRace({ commit }) {
      commit('SET_RACE_PAUSED', false);
    },
  },
  getters: {
    currentRound(state) {
      return state.schedule[state.currentRound] || null;
    },
    allRacesFinished(state) {
      return state.allRacesFinished;
    },
    roundInProgress(state) {
      return state.roundInProgress;
    },
  },
});
