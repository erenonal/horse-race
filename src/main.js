import { createApp } from 'vue';
import App from './App.vue';
import './assets/styles/main.scss';
import store from './store';

store.dispatch('generateHorses').then(() => {
  createApp(App).use(store).mount('#app');
});
