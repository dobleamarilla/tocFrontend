export default {
    namespaced: true,
    state: {
        arrayTrabajadores: [],
        trabajadorActivo: '',
    },
    mutations: {
      setArrayTrabajadoresMutation(state, payload) {
        state.arrayTrabajadores = payload;
      },
      setTrabajadorActivoMutation(state, payload) {
        state.trabajadorActivo = payload;
      },
    },
    getters: {
      // eslint-disable-next-line no-underscore-dangle
      getArrayTrabajadores: (state) => state.arrayTrabajadores,
      getTrabajadorActivo: (state) => state.trabajadorActivo,
    },
    actions: {
      setArrayTrabajadores({ commit }, data) {
        commit('setArrayTrabajadoresMutation', data);
      },
      setTrabajadorActivo({ commit }, data) {
        commit('setTrabajadorActivoMutation', data);
      },
    },
  };
