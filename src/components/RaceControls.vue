<template>
  <header>
    <div class="left">
      <h1>Horse Racing</h1>
    </div>
    <div class="right">
      <button @click="generateProgram">Generate Program</button>
      <button @click="toggleRace">
        {{ buttonText }}
      </button>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const isRacing = ref(false);
const buttonText = ref('Start Race');
let raceInterval = null;

const allRacesFinished = computed(() => store.getters.allRacesFinished);

watch(allRacesFinished, (newValue) => {
  if (newValue) {
    buttonText.value = 'All Races Finished';
  } else {
    buttonText.value = isRacing.value ? 'Pause Race' : 'Start Race';
  }
});

const generateProgram = () => {
  store.dispatch('generateSchedule');
};

const toggleRace = () => {
  if (allRacesFinished.value) {
    return;
  }
  if (isRacing.value) {
    pauseRace();
  } else if (store.state.racePaused) {
    continueRace();
  } else {
    startRace();
  }
};

const startRace = () => {
  isRacing.value = true;
  buttonText.value = 'Pause Race';
  store.dispatch('startRace');
  raceInterval = setInterval(() => {
    if (!store.state.racePaused && store.state.schedule) {
      const roundIndex = store.state.currentRound;
      const round = store.state.schedule[roundIndex];
      let raceFinished = false;

      if (round) {
        round.participants.forEach((horse) => {
          horse.position =
            (horse.position || 0) + Math.random() * (100 / round.distance);

          if (horse.position >= 100) {
            raceFinished = true;
          }
        });

        if (raceFinished) {
          store.commit('ADD_RESULT', {
            round: round.round,
            horses: round.participants.map((horse) => ({ ...horse })),
          });

          store.commit('INCREMENT_ROUND');

          if (store.state.currentRound >= store.state.schedule.length) {
            clearInterval(raceInterval);
            isRacing.value = false;
            buttonText.value = 'All Races Finished';
          }
        }
      } else {
        clearInterval(raceInterval);
        buttonText.value = 'Thanks';
        isRacing.value = false;
      }
    }
  }, 100);
};

const pauseRace = () => {
  isRacing.value = false;
  buttonText.value = 'Resume Race';
  store.dispatch('pauseRace');
  clearInterval(raceInterval);
};

const continueRace = () => {
  isRacing.value = true;
  buttonText.value = 'Pause Race';
  store.dispatch('continueRace');
  raceInterval = setInterval(() => {
    if (!store.state.racePaused && store.state.schedule) {
      const roundIndex = store.state.currentRound;
      const round = store.state.schedule[roundIndex];
      let raceFinished = false;

      if (round) {
        round.participants.forEach((horse) => {
          horse.position =
            (horse.position || 0) + Math.random() * (100 / round.distance);

          if (horse.position >= 100) {
            raceFinished = true;
          }
        });

        if (raceFinished) {
          store.commit('ADD_RESULT', {
            round: round.round,
            horses: round.participants.map((horse) => ({ ...horse })),
          });

          store.commit('INCREMENT_ROUND');

          if (store.state.currentRound >= store.state.schedule.length) {
            clearInterval(raceInterval);
            isRacing.value = false;
            buttonText.value = 'All Races Finished';
          }
        }
      } else {
        clearInterval(raceInterval);
        buttonText.value = 'Thanks';
        isRacing.value = false;
      }
    }
  }, 100);
};
</script>

<style scoped lang="scss">
@import '@/assets/styles/main.scss';

button {
  background-color: $secondary-color;
  color: $text-color;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  margin-right: 0.5rem;
}

button:last-child {
  margin-right: 0;
}
</style>
