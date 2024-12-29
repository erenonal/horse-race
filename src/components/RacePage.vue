<template>
  <div id="header">
    <Controls @programGenerated="handleProgramGenerated" />
    <main>
      <div class="left">
        <HorseList />
      </div>
      <div class="middle">
        <RaceTrack />
      </div>
      <div class="right">
        <RaceSchedule />
        <RaceResults />
      </div>
    </main>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import HorseList from './HorseList.vue';
import RaceSchedule from './RaceSchedule.vue';
import RaceTrack from './RaceTrack.vue';
import RaceResults from './RaceResults.vue';
import Controls from './RaceControls.vue';

const store = useStore();

const handleProgramGenerated = (generatedProgram) => {
  store.commit('SET_SCHEDULE', generatedProgram);
};
</script>

<style scoped lang="scss">
@import '@/assets/styles/main.scss';

.left {
  flex: 1;
  border-right: 1px solid #ccc;
  padding: 10px;
}

.middle {
  flex: 2;
  border-right: 1px solid #ccc;
  padding: 10px;
}

.right {
  flex: 1;
  display: flex;
  flex-direction: row;
  padding: 10px;
}

.right > * {
  flex: 1;
  margin-right: 10px;
}

.right > *:last-child {
  margin-right: 0;
}
</style>
