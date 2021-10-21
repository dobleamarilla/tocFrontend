<template>
  <div class="row pt-1 align-items-center">
    <div class="col text-center" style="max-width: 250px">
      <div class="row ms-2" style="max-width: 220px">
        <button
        style="max-width: 102px"
        class="btn btn-secondary btn-sm botonesPrincipales menusColorIvan" @click="showMenu">
          <i class="bi bi-list display-6"></i>
        </button>
        <button
        style="max-width: 102px"
          class="btn btn-secondary ms-1 btn-block sizeMenus btn-sm botonesPrincipales
          me-2 menusColorIvan"
          @click="buscarProducto()"><i class="bi bi-search display-6"></i>
        </button>
      </div>

      <div class="row mt-1 ms-2" style="max-width: 220px">
        <button
        style="max-width: 102px"
        class="btn btn-secondary botonesPrincipales btn-sm menusColorIvan"
          data-bs-toggle="modal" data-bs-target="#modalClientes">
          <i class="bi bi-person-fill display-6"></i>
        </button>
        <router-link
        style="max-width: 102px"
        class="btn btn-secondary botonesPrincipales btn-sm ms-1 menusColorIvan"
        to='/mesas'>
          <i class="bi bi-cart-plus-fill display-6"></i>
        </router-link>
      </div>

      <div class="row mt-1 ms-2" style="max-width: 220px">
        <button
        style="max-width: 102px"
        class="btn btn-secondary botonesPrincipales btn-sm menusColorIvan"
          @click="borrar()"><i class="bi bi-calculator display-6"></i>
        </button>
        <button
        style="max-width: 102px"
        class="btn btn-secondary botonesPrincipales btn-sm ms-1 menusColorIvan"
          @click="borrar()">
          <i v-if='activo === null' class="bi bi-trash display-6"></i>
          <i v-else @click="borrarItemCesta()" class="bi bi-x-lg display-6"></i>
        </button>
      </div>
    </div>

    <div class="col">
        <div class="table-responsive estiloCesta section" style="height: 26vh !important;">
          <table class="table fuenteIvan colorFuente" id="job-table">
            <thead style="background-color: red">
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
              @click="setActivo(index)">
                <td v-if="sePuedeRegalar(item.subtotal, item.promocion.esPromo)">
                  {{item.nombre}} <img @click="regalar(index)"
                  src="../assets/imagenes/regalo.png"
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
    <div class="col">
      <div class="row me-1">
        <select @change="cambioActivo()" class="form-select" v-model="trabajadorActivo">
          <option v-for="(trabajador, index) in arrayTrabajadores" v-bind:key="index">
            {{trabajador.nombre}}
          </option>
        </select>
      </div>
      <div class="row me-1 mt-1">
        <button
          class="btn btn-secondary w-100 botonesPrincipales menusColorIvan">
          <i class="bi bi-bell-fill display-6"></i>
          <span style="font-size: 27px;"
          :class="{'bg-warning': notificaciones > 0}">
          &nbsp; Mensajes: {{notificaciones}} &nbsp;</span>
        </button>
      </div>
      <div class="row mt-1 me-1">
        <button
          class="btn btn-secondary w-100 botonesPrincipales menusColorIvan"
          @click="goToCobrar()"><i class="bi bi-cash-coin sizeBotonCobrar"></i>
          <span class="sizeBotonCobrar">&nbsp;{{getTotal}} €</span>
        </button>
      </div>
    </div>

    <MenuClientes />
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue';

import axios from 'axios';

import { useStore } from 'vuex';

import MenuClientes from '@/components/MenuClientes.vue'; // @ is an alias to /src

import { Toast } from 'bootstrap';

import router from '../router/index';

export default {
  name: 'Footer',
  setup() {
    const store = useStore();
    const cesta = computed(() => store.state.Cesta.cesta);
    const activo = computed(() => store.state.Cesta.activo);
    const notificaciones = computed(() => store.state.Notificaciones.cantidad);
    const conCliente = null;
    const trabajadorActivo = ref('');
    const arrayTrabajadores = ref([]);
    let toastElList = null;
    let toastList = null;

    function abrirToast() {
      toastList[0].show();
    }
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
    function cambioActivo() {
      axios.post('trabajadores/setActivo', { nombre: trabajadorActivo.value }).then((res) => {
        if (!res.data.error) {
          store.dispatch('Trabajadores/setTrabajadorActivo', trabajadorActivo.value);
        } else {
          console.log('Error al cambiar trabajador activo');
        }
      });
    }

    function goToCobrar() {
      router.push(`/cobro/${getTotal.value}`);
    }

    onMounted(() => {
      toastElList = [].slice.call(document.querySelectorAll('.toast'));
      toastList = toastElList.map((toastEl) => new Toast(toastEl));

      /* INICIALIZACIÓN DE CESTA */
      axios.post('/cestas/getCesta').then((res) => {
        store.dispatch('Cesta/setCestaAction', res.data);
      });

      axios.post('trabajadores/getTrabajadoresFichados').then((info) => {
        if(!info.data.error) {
          if (info.data.res.length > 0) {
            store.dispatch('Trabajadores/setArrayTrabajadores', info.data.res);
            arrayTrabajadores.value = info.data.res;
            axios.post('trabajadores/getCurrentTrabajador').then((infoTrabajador) => {
              if (!infoTrabajador.data.error) {
                trabajadorActivo.value = infoTrabajador.data.trabajador.nombre;
                store.dispatch('Trabajadores/setTrabajadorActivo', infoTrabajador.data.trabajador.nombre);
              } else {
                console.log('Error en getCurrentTrabajador');
              }
            }).catch((err) => {
              console.log(err);
            });
          } else {
            // ENVIAR DIRECTAMENTE A FICHAR TRABAJADOR !!!
          }
        } else {
          console.log('Error en getTrabajadoresFichados');
        }
      }).catch((err) => {
        console.log(err);
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
    function setActivo(index) {
      console.log(index);
      store.dispatch('Cesta/setActivoAction', index);
    }
    function borrar() {
      if (activo.value === null) {
        /* eslint no-underscore-dangle: 0 */
        axios.post('/cestas/borrarCesta', { id: cesta.value._id }).then((cestaVacia) => {
          store.dispatch('Cesta/setCestaAction', cestaVacia.data.cestaNueva);
        });
        // ipcRenderer.send('mostrar-visor', {texto: "", p
        // recio: "", total: toc.getCesta().tiposIva.importe2, dependienta: ""});
      } else {
        console.log('LALALAL');
        // toc.borrarItemCesta(activo.value);
        // ipcRenderer.send('mostrar-visor', {texto: "", pre
        // cio: "", total: toc.getCesta().tiposIva.importe2, dependienta: ""});
        axios.post('/cestas/borrarItemCesta', { _id: store.state.Cesta.cesta._id, idArticulo: store.getters['Cesta/getItem'] }).then((res) => {
          if (res.data.okey) {
            store.dispatch('Cesta/setCestaAction', res.data.cestaNueva);
          } else {
            console.log(res.data.okey);
          }
        });
      }
      store.dispatch('Cesta/setActivoAction', null);
    //   this.lineaDeRegalo = null;
    }

    function showMenu() {
      router.push('/menu/caja');
    }

    return {
      getTotal,
      conCliente,
      cesta,
      sePuedeRegalar,
      activo,
      cestaAlReves,
      setActivo,
      borrar,
      showMenu,
      notificaciones,
      trabajadorActivo,
      arrayTrabajadores,
      cambioActivo,
      abrirToast,
      goToCobrar,
    };
  },
  components: {
    MenuClientes,
  },
};
</script>

<style scoped>
.seleccionado {
  background-color: rgb(255, 221, 176);
}
.anchoBotonMenu {
  width: 125px;
  height: 100px;
  margin: 5px;
}
.botonesPrincipales{
  background-color: #fff5e9;
  color: #c95907;
  border-color: #bf5c18;
  border-width: 3px;
}
.iconosBootstrap {
  font-size: 1rem;
}
.botonesLateralesIzq {
  height: 15.5vh;
  width: 7vw;
  margin: 5px;
}

.sizeBotonCobrar {
  font-size: 54px;
  font-weight: bold;
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
.section::-webkit-scrollbar {
    width: 16px;
}

.section::-webkit-scrollbar-track {
    background-color: #e4e4e4;
    border-radius: 100px;
}

.section::-webkit-scrollbar-thumb {
    background-color: #c95907;
    border-radius: 100px;
}
</style>
