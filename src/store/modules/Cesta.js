export default {
  namespaced: true,
  state: {
    cesta: {
      _id: -1,
      lista: [],
    },
  },
  mutations: {
    setCestaMutation(state, payload) {
      state.cesta = payload;
    },
  },
  actions: {
    setCestaAction({ commit }, cesta) {
      commit('setCestaMutation', cesta);
    },
  },
};
