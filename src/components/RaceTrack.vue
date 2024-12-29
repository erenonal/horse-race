<template>
  <div class="race-track">
    <div v-for="lane in 10" :key="lane" class="lane">
      <span class="lane-number">{{ lane }}</span>
      <div class="dashed-line" ref="dashedLine"></div>

      <div
        v-for="horse in raceHorses.filter((h) => h.lane === lane)"
        :key="horse.id"
        class="horse"
        :style="{ left: `${(horse.position * maxHorsePosition) / 100}px` }"
      >
        <img
          src="@/assets/img/horse.png"
          alt="Horse Icon"
          class="horse-image"
        />
      </div>
    </div>

    <div class="finish-line">
      <div class="finish-line-vertical"></div>
      <span class="finish-label">FINISH</span>
    </div>

    <div class="round-distance">
      <span>{{ currentDistance }} m</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const raceHorses = ref([]);
const maxHorsePosition = ref(0);

const defaultRaceHorsePositions = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  name: `Horse ${index + 1}`,
  lane: index + 1,
  position: 0,
}));

onMounted(() => {
  raceHorses.value = defaultRaceHorsePositions;
  maxHorsePosition.value = document.querySelector('.dashed-line').offsetWidth;
});

const currentRound = computed(() => store.state.currentRound);
const currentDistance = computed(() => {
  const roundIndex = store.state.currentRound - 1;
  if (roundIndex >= 0 && roundIndex < store.state.schedule.length) {
    return store.state.schedule[roundIndex].distance;
  }
  return 0;
});

watch(
  currentRound,
  (newRound) => {
    const roundIndex = newRound - 1;
    raceHorses.value = defaultRaceHorsePositions.map((horse) => ({
      ...horse,
      position: 0,
    }));
    if (roundIndex < 0 || roundIndex >= store.state.schedule.length) {
      return;
    }

    setTimeout(() => {
      const newPositions = store.state.schedule[roundIndex].participants.map(
        (horse, index) => ({
          ...horse,
          lane: index + 1,
          position: horse.position || 0,
        }),
      );

      raceHorses.value = raceHorses.value.map((horse) => {
        const updatedHorse = newPositions.find((h) => h.lane === horse.lane);
        return updatedHorse
          ? { ...horse, position: updatedHorse.position }
          : horse;
      });
    }, 1000);
  },
  { immediate: true },
);
</script>

<style scoped lang="scss">
@import '@/assets/styles/main.scss';
</style>
