<template>
  <div class="row pt-1">
    <div class='col-md-1'>
  <div class="d-flex flex-column align-items-stretch flex-shrink-0 bg-white"
  style="width: 140px;">
      <div class="list-group list-group-flush border-bottom scrollarea">
        <router-link to="/" class="list-group-item list-group-item-action py-3 lh-tight">
          <div class="d-flex w-100 align-items-center justify-content-between">
            <strong class="mb-1">Vender</strong>
          </div>
        </router-link>
        <router-link to="/menu/caja"
        class="list-group-item list-group-item-action py-3 lh-tight">
          <div class="d-flex w-100 align-items-center justify-content-between">
            <strong class="mb-1">Caja</strong>
          </div>
        </router-link>
        <button @click="pedidos()"
        class="list-group-item list-group-item-action py-3 lh-tight">
          <div class="d-flex w-100 align-items-center justify-content-between">
            <strong class="mb-1">Pedidos</strong>
          </div>
        </button>
        <router-link to="/menu/fichajes"
        class="list-group-item list-group-item-action py-3 lh-tight">
          <div class="d-flex w-100 align-items-center justify-content-between">
            <strong class="mb-1">Trabajador/a</strong>
          </div>
        </router-link>
        <button @click="devoluciones()"
        class="list-group-item list-group-item-action py-3 lh-tight">
          <div class="d-flex w-100 align-items-center justify-content-between">
            <strong class="mb-1">Devoluciones</strong>
          </div>
        </button>
        <button @click="imprimirEntregas()"
        class="list-group-item list-group-item-action py-3 lh-tight">
          <div class="d-flex w-100 align-items-center justify-content-between">
            <strong class="mb-1">Entregas</strong>
          </div>
        </button>
      </div>
    </div>
    </div>
    <div class="col">
      <router-view></router-view>
    </div>
  </div>
  <ToastComponent/>
</template>
<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';
import ToastComponent from '@/components/Toast.vue';
import router from '../router/index';
import { parametros } from '../services/parametros';

export default {
  name: 'Menu',
  setup() {
    const store = useStore();
    const isHidden = computed(() => store.state.Menu.hidden);
    const params = parametros.getParametros();

    function quitarActivoTicket() {
      store.dispatch('Ticket/setActivoAction', null);
    }

    function hideMenu() {
      store.dispatch('Menu/setHiddenAction', true);
      quitarActivoTicket();
    }

    function pedidos() {
      router.push(`/menu/pedidos/${params.codigoTienda}`);
    }

    function goTo(url) {
      router.push(url);
    }
    
    /* Establece el modo y redirige a la home */
    function devoluciones() {
      store.dispatch('setModoActual', 'DEVOLUCION');
      router.push('/');
    }

    function imprimirEntregas() {
      // const licencia = this.getNumeroTresDigitos(this.getParametros().licencia);
      const licencia = 842;
      axios.get(`http://dsv.hiterp.com/TpvInforma.asp?Llic=00${licencia}&Versio=6001010&Tipus=EntregasPendientes`).then((response) => {
        const { data } = response;
        let imprimir = '';
        let valid = false;
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < data.length; i++) {
          if (valid || (data[i - 1] === ']' && data[i - 2] === 'a')) {
            valid = true;
            if (data[i] === ']') break;
            imprimir += data[i];
          }
        }
        // Mandar al backend para imprimir
        console.log(imprimir);
      });
      hideMenu();
      quitarActivoTicket();
    }
    return {
      pedidos,
      devoluciones,
      isHidden,
      hideMenu,
      quitarActivoTicket,
      imprimirEntregas,
      goTo,
    };
  },
  components: {
    ToastComponent,
  },
};
</script>
<style scoped>
.sidebar {
  margin: 0;
  padding: 0;
  background-color: #f1f1f1;
  position: fixed;
  height: 60%;
  overflow: scroll;
}
.sidebar a {
  display: block;
  color: black;
  padding: 16px;
  text-decoration: none;
}
.sidebar a.active {
  background-color: #04AA6D;
  color: white;
}
.sidebar a:hover:not(.active) {
  background-color: #555;
  color: white;
}
.component-content {
  margin: 0 auto;
  width: 65%;
}
.hidden {
  display: none;
}
@media screen and (max-width: 700px) {
  .sidebar {
    width: 100%;
    height: auto;
    position: relative;
  }
  .sidebar a {float: left;}
  div.content {margin-left: 0;}
}
@media screen and (max-width: 400px) {
  .sidebar a {
    text-align: center;
    float: none;
  }
}
</style>>
