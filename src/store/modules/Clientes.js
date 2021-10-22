export default {
  namespaced: true,
  state: {
      infoCliente: null,
  },
  mutations: {
    setClienteActivoMutation(state, payload) {
      state.infoCliente = payload;
    },
  },
  actions: {
    setClienteActivo({ commit }, activo) {
      commit('setClienteActivoMutation', activo);
    },
    borrarClienteActivo({ commit }) {
      commit('setClienteActivoMutation', null);
    },
  },
};
  