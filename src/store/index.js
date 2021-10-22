import { createStore } from 'vuex';

import { Toast } from 'bootstrap';

import InstallWizard from './modules/InstallWizard';

import ModalPeso from './modules/ModalPeso';

import Cesta from './modules/Cesta';

import Ticket from './modules/Ticket';

import Menu from './modules/Menu';

import Dinero from './modules/Dinero';

import Notificaciones from './modules/Notificaciones';

import Trabajadores from './modules/Trabajadores';

import Clientes from './modules/Clientes';

import Footer from './modules/Footer';

import socket from '../sockets/socket';

import Caja from './modules/Caja';

let toastElList = null;
let toastList = null;

window.addEventListener('contextmenu', function (e) { 
  // do something here... 
  e.preventDefault(); 
}, false);

export default createStore({
  state: {
    modoActual: 'NORMAL',
    toast: {
      tipo: 'INFO',
      mensaje: '',
    },
  },
  mutations: {
    setToastMutation(state, payload) {
      state.toast = payload;
    },
    setModoActualMutation(state, payload) {
      state.modoActual = payload;
    }
  },
  actions: {
    initToast() {
      toastElList = [].slice.call(document.querySelectorAll('.toast'));
      toastList = toastElList.map((toastEl) => new Toast(toastEl));
    },
    setToastAction({ commit }, payload) {
      commit('setToastMutation', payload);
    },
    showToast() {
      toastList[0].show();
    },
    setModoActual({ commit }, payload) {
      commit('setModoActualMutation', payload);
    }
  },
  modules: {
    InstallWizard,
    ModalPeso,
    Cesta,
    Ticket,
    Menu,
    Dinero,
    Notificaciones,
    Trabajadores,
    Clientes,
    Caja,
    Footer,
  },
});
