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
            <tr v-for="(item, index) of cestaAlReves"
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
    <MenuBotones/>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';

import axios from 'axios';

import { useStore } from 'vuex';

import MenuBotones from '@/components/MenuBotones.vue'; // @ is an alias to /src

export default {
  name: 'Footer',
  setup() {
    const store = useStore();
    const cesta = computed(() => store.state.Cesta.cesta);
    const activo = computed(() => store.state.Cesta.activo);
    const conCliente = null;
    // const puntosClienteActivo = 0;
    const lineaDeRegalo = null;
    // var prohibirBuscarArticulos = true;
    const getTotal = computed(() => {
      let suma = 0;
      for (let i = 0; i < cesta.value.lista.length; i += 1) {
        if (i !== lineaDeRegalo) {
          suma += cesta.value.lista[i].subtotal;
        }
      }
      return suma.toFixed(2);
    });
    const cestaAlReves = computed(() => {
      const aux = cesta.value.lista; // Reverse muta el array.
      return aux.reverse();
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
      cestaAlReves,
    };
  },
  components: {
    MenuBotones,
  },
};
</script>

<style scoped>

</style>
