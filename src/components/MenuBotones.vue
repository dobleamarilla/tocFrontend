<template>
  <div class="col-md-7 ps-4" style="padding-top: 36px;">
    <div class="row">
      <button
        class="btn btn-secondary sizeMenus botonesPrincipales anchoBotonTotal me-2 menusColorIvan"
        @click="cobrar()"><i class="bi bi-cart iconosBootstrap"></i>
        {{getTotal}} €
      </button>
      <button class="btn btn-secondary botonesPrincipales anchoBotonBorrar me-2 menusColorIvan"
        @click="borrar()"><i class="bi bi-trash iconosBootstrap"></i>
      </button>
      <button class="btn btn-secondary botonesPrincipales anchoBotonMas menusColorIvan"
        @click="abrirModalTicketsAbiertos()">
        <i class="bi bi-plus-circle-fill iconosBootstrap"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';

import { computed } from 'vue';

import axios from 'axios';

export default {
  name: 'MenuBotones',
  setup() {
    const store = useStore();
    const cesta = computed(() => store.state.Cesta.cesta);
    const activo = computed(() => store.state.Cesta.activo);
    const lineaDeRegalo = null;
    const getTotal = computed(() => {
      let suma = 0;
      for (let i = 0; i < cesta.value.lista.length; i += 1) {
        if (i !== lineaDeRegalo) {
          suma += cesta.value.lista[i].subtotal;
        }
      }
      return suma.toFixed(2);
    });

    function borrar() {
      if (activo.value === null) {
        /* eslint no-underscore-dangle: 0 */
        console.log(cesta.value._id);
        axios.post('/borrarCesta', { id: cesta.value._id }).then((cestaVacia) => {
          store.dispatch('Cesta/setCestaAction', cestaVacia.data.cestaNueva);
        });
        // ipcRenderer.send('mostrar-visor', {texto: "", p
        // recio: "", total: toc.getCesta().tiposIva.importe2, dependienta: ""});
      } else {
        // toc.borrarItemCesta(activo.value);
        // ipcRenderer.send('mostrar-visor', {texto: "", pre
        // cio: "", total: toc.getCesta().tiposIva.importe2, dependienta: ""});
      }
      store.dispatch('Cesta/setActivoAction', null);
    //   this.lineaDeRegalo = null;
    }

    function cobrar() {
      console.log('COBRO');
    }

    function abrirModalTicketsAbiertos() {
      console.log('ABRIR');
    }

    return {
      getTotal,
      borrar,
      cobrar,
      abrirModalTicketsAbiertos,
    };
  },
};
</script>

<style scoped>
.sizeMenus{
    font-size: 42px;
}
.anchoBotonTotal {
  width: 420px;
}
.anchoBotonBorrar {
  width: 200px;
}
.anchoBotonMas {
  width: 200px;
}
.botonesPrincipales{
  background-color: #fff5e9;
  color: #c95907;
  border-color: #bf5c18;
  border-width: 3px;
}
.menusColorIvan.btn-secondary:hover {
    color: #c95907 !important;
    background-color: #fff5e9 !important;
    border-color: #bf5c18 !important;
    border-width: 3px;
  }

.menusColorIvan.btn-secondary:focus, .btn-secondary.focus {
  color: #c95907 !important;
  background-color: #fff5e9 !important;
  border-color: #bf5c18 !important;
  box-shadow: none !important;
  border-width: 3px;
}

.menusColorIvan.btn-secondary:not(:disabled):not(.disabled):active,
.btn-secondary:not(:disabled):not(.disabled).active,
.show > .btn-secondary.dropdown-toggle {
  color: #c95907 !important;
  background-color: #fff5e9 !important;
  border-color: #bf5c18 !important;
  border-width: 3px;
}

.menusColorIvan.btn-secondary:not(:disabled):not(.disabled):active:focus,
.btn-secondary:not(:disabled):not(.disabled).active:focus,
.show > .btn-secondary.dropdown-toggle:focus {
  box-shadow: none !important;
}

.iconosBootstrap {
  font-size: 5rem;
}
</style>
