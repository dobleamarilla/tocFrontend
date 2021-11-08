import { createStore } from 'vuex';

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

let timeoutBorrar = null;

window.addEventListener('contextmenu', function (e) { 
  // do something here... 
  e.preventDefault(); 
}, false);

export default createStore({
  state: {
    parametros: null,
    modoActual: 'NORMAL',
    unidades: '0'
  },
  getters: {
    getModoActual: (state) => state.modoActual,
    getParametros: (state) => state.parametros,
    getUnidades: (state) => Number(state.unidades)
  },
  mutations: {
    setModoActualMutation(state, payload) {
      state.modoActual = payload;
    },
    setParametrosMutation(state, payload) {
      state.parametros = payload;
    },
    setUnidadesMutation(state, payload) {
      const aux = state.unidades + payload;
      state.unidades = `${Number(aux)}`;
    },
    resetUnidadesMutation(state) {
      state.unidades = '0';
    },
    borrarDigitoMutation(state) {
      const aux = state.unidades.slice(0, -1);
      if (aux == '') {
        state.unidades = '0'
      } else {
        state.unidades = aux;
      }
    }
  },
  actions: {
    setModoActual({ commit }, payload) {
      commit('setModoActualMutation', payload);
    },
    setParametros({ commit }, payload) {
      commit('setParametrosMutation', payload);
    },
    addDigitoUnidades({ commit }, unidades) {
      commit('setUnidadesMutation', unidades);
    },
    resetUnidades({ commit }) {
      commit('resetUnidadesMutation');
    },
    borrarDigitoUnidades({ commit }) {
      commit('borrarDigitoMutation');
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
