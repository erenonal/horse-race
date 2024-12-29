<template>
  <div class="program-result-table">
    <h2>Program</h2>
    <div v-for="round in program" :key="round.round" class="round">
      <h3>Lap {{ round.round }} - {{ round.distance }} m</h3>
      <table>
        <thead>
          <tr>
            <th>Number</th>
            <th>Horse</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="horse in round.participants" :key="horse.id">
            <td>{{ horse.id }}</td>
            <td>{{ getHorseName(horse) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const program = computed(() => store.state.schedule);
const horses = computed(() => store.state.horses);
const getHorseName = (horseId) => {
  const horse = horses.value.find((h) => h.id === horseId.id);
  return horse ? horse.name : 'Unknown';
};
</script>

<style scoped lang="scss">
@import '@/assets/styles/main.scss';
</style>
