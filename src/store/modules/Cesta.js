export default {
  namespaced: true,
  state: {
    cesta: {
      _id: -1,
      lista: [],
    },
    activo: null,
  },
  mutations: {
    setCestaMutation(state, payload) {
      state.cesta = payload;
    },
    setActivoMutation(state, payload) {
      state.activo = payload;
    },
  },
  actions: {
    setCestaAction({ commit }, cesta) {
      commit('setCestaMutation', cesta);
    },
    setActivoAction({ commit }, activo) {
      commit('setActivoMutation', activo);
    },
  },
};
