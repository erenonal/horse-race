<template>
  <div class="horse-list">
    <h2>Horse List (1 - 20)</h2>
    <table v-if="horses.length">
      <thead>
        <tr>
          <th>Name</th>
          <th>Condition</th>
          <th>Color</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="horse in sortedHorses" :key="horse.name">
          <td>{{ horse.name }}</td>
          <td>{{ horse.condition }}</td>
          <td>
            <div
              class="horse-icon-list"
              :style="{ backgroundColor: horse.color }"
            >
              <img
                src="@/assets/img/horse.png"
                alt="Horse Icon"
                class="horse-image-list"
              />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const horses = computed(() => store.state.horses);
const sortedHorses = computed(() => {
  return [...horses.value].sort((a, b) => b.condition - a.condition);
});
</script>

<style scoped lang="scss">
@import '@/assets/styles/main.scss';

.horse-icon-list {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.horse-image-list {
  width: 100%;
  height: auto;
}
</style>
