import { createStore } from 'vuex'
import modalPeso from "./modules/modalPeso";
import modalInstallWizard from "./modules/modalInstallWizard";


export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
    toast({commit}, mensaje){
      console.log(mensaje);
    },
    test(){
      return "hola caracola";
    }
  },
  modules: {
    modalPeso,
    modalInstallWizard
  }
})
