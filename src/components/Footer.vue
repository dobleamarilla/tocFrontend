<template>
  <div class="row pt-1">
    <div class="col-md-5 ordenado">
      <div class="table-responsive estiloCesta">
        <table class="table fuenteIvan colorFuente" id="job-table">
          <thead>
            <tr>
              <th scope="col">Productos</th>
              <th scope="col">Unidades</th>
              <th scope="col">Precio</th>
            </tr>
          </thead>
          <tbody class="tableBody" :style="conCliente">
            <tr v-for="(item, index) of cesta.lista.reverse()"
            :key="index"
            v-bind:class="{
              'estiloPromo': item.promocion.esPromo,
              'seleccionado': activo === index
            }"
            @click="selectActivo(index)">
              <td v-if="sePuedeRegalar(item.subtotal, item.promocion.esPromo)">
                {{item.nombre}} <img @click="regalar(index)"
                src="assets/imagenes/regalo.png"
                alt="Regalar">
              </td>
              <td v-else>{{item.nombre}}</td>
              <td>{{item.unidades}}</td>
              <td>{{item.subtotal.toFixed(2)}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
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
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';

import axios from 'axios';

import { useStore } from 'vuex';

export default {
  name: 'Footer',
  setup() {
    const store = useStore();
    const cesta = computed(() => store.state.Cesta.cesta);
    let activo = null;
    activo = null;
    const conCliente = null;
    // const puntosClienteActivo = 0;
    const lineaDeRegalo = null;
    // var prohibirBuscarArticulos = true;
    // const listaAlReves = computed(() => cesta.value.reverse());
    const getTotal = computed(() => {
      let suma = 0;
      for (let i = 0; i < cesta.value.lista.length; i += 1) {
        if (i !== lineaDeRegalo) {
          suma += cesta.value.lista[i].subtotal;
        }
      }
      return suma.toFixed(2);
    });

    // onBeforeMount(() => {
    //   axios.post('/getCesta').then((res) => {
    //     store.dispatch('Cesta/setCestaAction', res);
    //   });
    // });

    onMounted(() => {
      /* INICIALIZACIÓN DE CESTA */
      axios.post('/getCesta').then((res) => {
        store.dispatch('Cesta/setCestaAction', res.data);
      });
    });

    function sePuedeRegalar(subtotal, esPromo) {
      if (subtotal > 0 && esPromo === true) { // Caso para que compile

      }
      return false;
      // if (!esPromo) {
      //   axios.post('convertirPuntosEnDinero', { puntosClienteActivo }).then((dinero) => {
      //     // Aquí debe ir el nuevo método
      //   });
      //   if (subtotal <= dinero) {
      //     return true;
      //   }
      //   return false;
      // }
      // return false;
    }
    return {
      getTotal,
      conCliente,
      cesta,
      sePuedeRegalar,
      activo,
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
