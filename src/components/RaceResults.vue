<template>
  <div class="program-result-table">
    <h2>Race Results</h2>
    <div v-for="round in displayedResults" :key="round.round" class="round">
      <h3>Lap {{ round.round }} - {{ round.distance }} m</h3>
      <table>
        <thead>
          <tr>
            <th>Position</th>
            <th>Horse</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="horse in round.horses" :key="horse.id">
            <td>{{ horse.scaledPosition }}</td>
            <td>{{ horse.name }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const results = computed(() => store.state.results);

const sortedResults = computed(() => {
  return results.value.map((round) => {
    const minScore = Math.min(...round.horses.map((horse) => horse.position));
    const maxScore = Math.max(...round.horses.map((horse) => horse.position));

    let scaledHorses = [...round.horses]
      .map((horse) => ({
        ...horse,
        scaledPosition: Math.round(
          1 + ((horse.position - minScore) / (maxScore - minScore)) * 9,
        ),
      }))
      .sort((a, b) => b.position - a.position);

    scaledHorses = scaledHorses.map((horse, index) => ({
      ...horse,
      scaledPosition: index + 1,
    }));

    return {
      ...round,
      horses: scaledHorses,
    };
  });
});

const displayedResults = ref([]);

watch(
  sortedResults,
  (newResults) => {
    newResults.forEach((round) => {
      const existingRound = displayedResults.value.find(
        (r) => r.round === round.round,
      );
      if (!existingRound) {
        setTimeout(() => {
          displayedResults.value.push(round);
        }, 2000);
      }
    });
  },
  { immediate: true },
);
</script>

<style scoped lang="scss">
@import '@/assets/styles/main.scss';

.program-result-table h2 {
  background-color: green;
}
</style>
