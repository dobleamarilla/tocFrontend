export default {
  namespaced: true,
  state: {
      infoCliente: {
        id: '',
        nombre: ''
      },
      GLOVO: 'CliBoti_000_{A83B364B-252F-464B-B0C3-AA89DA258F64}',
      DELIVEROO: 'CliBoti_000_{3F7EF049-80E2-4935-9366-0DB6DED30B67}'
  },
  getters: {
    getGlovo: (state) => state.GLOVO,
    getDeliveroo: (state) => state.DELIVEROO,
    getInfoCliente: (state) => state.infoCliente.id
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
    resetClienteActivo({ commit }) {
      commit('setClienteActivoMutation', {
        id: '',
        nombre: ''
      });
    },
  },
};
  