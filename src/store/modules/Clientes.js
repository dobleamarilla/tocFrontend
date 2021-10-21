export default {
  namespaced: true,
  state: {
      clienteActivo: null,
  },
  mutations: {
    setClienteActivoMutation(state, payload) {
      state.clienteActivo = payload;
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
  