<template>
   <div class="modal" id="modalClientes" tabindex="-1" role="dialog"
   data-keyboard="false" data-backdrop="static">
      <div class="modal-dialog" role="document" style="max-width: 800px">
         <div class="modal-content">
            <div class="modal-header">
               <button type="button" class="btn btn-warning btn-lg mr-0" @click="selectGlovo()">
                   Glovo
                </button>
               <button type="button" class="btn btn-info btn-lg mr-0" @click="selectDeliveroo()">
                   Deliveroo
                </button>
               <button type="button" class="btn btn-success btn-lg mr-0" @click="nuevoCliente()">
                   NUEVO
                </button>
               <button type="button" class="btn btn-danger btn-lg mr-0" @click="reset()">
                   RESET
                </button>
               <button type="button" class="btn btn-secondary btn-lg" data-bs-dismiss="modal">
                   SALIR
                </button>
            </div>
            <div class="modal-body">
               <div class="row">
                  <input v-model="inputBusqueda" style="width: 659px; height: 50px; font-size: 20px" type="text" class="form-control" placeholder="Nombre cliente">
                  <button @click="buscar()" style="width: 100px; height: 50px; font-size: 22px" class="btn btn-primary ms-1">Buscar</button>
                  <div class="col-md-12">
                     <div class="table-responsive w-100" style="height: 400px;">
                        <table class="table table-striped mt-1">
                           <thead>
                              <tr>
                                 <th class="clientesAnchoNombre" scope="col">Nombre</th>
                                 <th class="clientesAnchoBotones" scope="col"></th>
                              </tr>
                           </thead>
                           <tbody>
                              <tr v-for="(cliente, index) of arrayClientes" v-bind:key="index">
                                 <td class="clientesAnchoNombre">{{cliente.nombre}}</td>
                                 <td class="clientesAnchoBotones">
                                    <button
                                     @click="selectCliente(cliente)"
                                     href="#" class="btn btn-primary btn-lg" style="width: 150px">
                                        Seleccionar
                                    </button>
                                 </td>
                              </tr>
                           </tbody>
                        </table>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>
<script>
import { computed, ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';
import { Modal } from 'bootstrap';
import { useToast } from 'vue-toastification';
import { socket } from '../sockets/socket';

export default {
  name: 'MenuClientes',
  setup() {
    const toast = useToast();
    const store = useStore();
    const GLOVO = store.getters['Clientes/getGlovo'];
    const DELIVEROO = store.getters['Clientes/getDeliveroo'];
    const nombre = 'Santy';
    const inputBusqueda = ref('');
    const clienteActivo = computed(() => store.state.Clientes.clienteActivo);
    const arrayClientes = ref([]);
    let modalClientes = null;

    function selectGlovo() {
      axios.post('clientes/getClienteByID', { idCliente: GLOVO }).then((res) => {
         if (!res.data.error) {
            selectCliente(res.data.infoCliente);
         } else {
            toast.error(res.data.mensaje);
         }
      }).catch((err) => {
         console.log(err);
         toast.error(res.data.mensaje);
      }); 
    }

    function selectDeliveroo() {
       console.log("DELIVEROO: ", DELIVEROO);
      axios.post('clientes/getClienteByID', { idCliente: DELIVEROO }).then((res) => {
         if (!res.data.error) {
            selectCliente(res.data.infoCliente);
         } else {
            toast.error(res.data.mensaje);
         }
      }).catch((err) => {
         console.log(err);
         toast.error(res.data.mensaje);
      }); 
    }

   function nuevoCliente() {
      toast.info('Deshabilitado temporalmente');
   }

   function reset() {
      store.dispatch('setModoActual', 'NORMAL');
      store.dispatch('Clientes/resetClienteActivo');
      store.dispatch('Footer/resetMenuActivo');
      axios.post('articulos/setEstadoTarifaVIP', { nuevoEstado: false }).then((res) => {
         modalClientes.hide();
         toast.info('Reset OK. Estado de cobro: NORMAL');
      }).catch((err) => {
         console.log(err);
      });
   }

    function selectCliente(cliente) {
      axios.post('clientes/comprobarVIP', { idClienteFinal: cliente.id }).then((res) => {
         if (res.data.error === false) {
            /* SET PAGA EN TIENDA */
            if (res.data.info.pagaEnTienda == false) {
               cliente['pagaEnTienda'] = false;
            }

            /* SET MODO CLIENTE */
            if (res.data.info.esVip) {
               store.dispatch('Clientes/setInfoClienteVip', res.data.info.datosCliente);
               store.dispatch('setModoActual', 'VIP');
            } else {
               cliente['puntos'] = res.data.info.puntos;
               store.dispatch('setModoActual', 'CLIENTE');
            }

            /* SET RESTO DE DATOS CLIENTE */
            store.dispatch('Clientes/setClienteActivo', cliente);
            store.dispatch('Footer/setMenuActivo', 1);

            modalClientes.hide();
            toast.success('Cliente seleccionado');
         } else {
            console.log(res.data.mensaje);
            toast.error('Error. Comprobar consola');
         }
      }).catch((err) => {
         console.log(err);
         toast.error('Error. Comprobar consola 2');
      });
    }

    function buscar() {
       axios.post('clientes/buscar', { busqueda: inputBusqueda.value }).then((res) => {
         arrayClientes.value = res.data;
         console.log(res.data);
       }).catch((err) => {
          console.log(err);
       });
    }

    function infoPuntos(id) {
      socket.emit('consultarPuntos', { idClienteFinal: id });
    }

    onMounted(() => {
      modalClientes = new Modal(document.getElementById('modalClientes'), {
        keyboard: false,
      });
    });

    return {
      nuevoCliente,
      reset,
      infoPuntos,
      inputBusqueda,
      buscar,
      nombre,
      arrayClientes,
      selectGlovo,
      selectDeliveroo,
      selectCliente,
      clienteActivo,
    };
  },
};
</script>
<style scoped>
    .clientesAnchoNombre {
        width: 300px !important;
    }
    .clientesAnchoBotones {
        width: 320px !important;
    }
</style>
