export default {
  namespaced: true,
  state: {
      infoCliente: {
        id: '',
        nombre: '',
        pagaEnTienda: true
      },
      infoClienteVip: {
        nif: '',
        nombre: '',
        cp: '',
        direccion: '',
        ciudad: ''
      },
      GLOVO: 'CliBoti_000_{A83B364B-252F-464B-B0C3-AA89DA258F64}',
      DELIVEROO: 'CliBoti_000_{3F7EF049-80E2-4935-9366-0DB6DED30B67}'
  },
  getters: {
    getGlovo: (state) => state.GLOVO,
    getDeliveroo: (state) => state.DELIVEROO,
    getInfoCliente: (state) => state.infoCliente.id,
    getClientePagaEnTienda: (state) => state.infoCliente.pagaEnTienda,
    getInfoClienteVip: (state) => state.infoClienteVip
  },
  mutations: {
    setClienteActivoMutation(state, payload) {
      state.infoCliente.id = payload.id;
      state.infoCliente.nombre = payload.nombre;
      state.infoCliente.pagaEnTienda = payload.pagaEnTienda;
    },
    setInfoClienteVipMutation(state, payload) {
      state.infoClienteVip = payload;
    }
  },
  actions: {
    setClienteActivo({ commit }, activo) {
      commit('setClienteActivoMutation', activo);
    },
    setInfoClienteVip({ commit }, payload) {
      commit('setInfoClienteVipMutation', payload);
    },
    resetClienteActivo({ commit }) {
      commit('setClienteActivoMutation', {
        id: '',
        nombre: '',
        pagaEnTienda: true
      });
      commit('setInfoClienteVipMutation', {
        nif: '',
        nombre: '',
        cp: '',
        direccion: '',
        ciudad: ''
      });
    },
  },
};
  