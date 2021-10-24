import { createApp } from 'vue';

import axios from 'axios';

import App from './App.vue';

import router from './router';

import store from './store';

import { parametros } from './services/parametros';

import 'bootstrap/dist/css/bootstrap.min.css';

import 'bootstrap-icons/font/bootstrap-icons.css';

import 'bootstrap';

axios.defaults.baseURL = 'http://localhost:3000';

createApp(App).use(parametros).use(store).use(router).mount('#app');
