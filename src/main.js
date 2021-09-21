import { createApp } from 'vue';
import store from '@/state/store';
import App from './App.vue';
import router from '@/router/routes';
import VeeValidatePlugin from './includes/validation';
import { auth } from './includes/firebase';
import './assets/tailwind.css';
import './assets/main.css';

let app;

auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App);

    app.use(store);
    app.use(router);
    app.use(VeeValidatePlugin);

    app.mount('#app');
  }
});
