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
               <button type="button" class="btn btn-secondary btn-lg" @click="volver()">
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
                                    <button
                                     @click="infoPuntos(cliente.id)"
                                     href="#" class="btn btn-info ms-2 btn-lg" style="width: 170px">
                                        Info. puntos
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

export default {
  name: 'MenuClientes',
  setup() {
    const store = useStore();
    const GLOVO = 'CliBoti_000_{A83B364B-252F-464B-B0C3-AA89DA258F64}';
    const DELIVERO = 'CliBoti_000_{3F7EF049-80E2-4935-9366-0DB6DED30B67}';
    const nombre = 'Santy';
    const inputBusqueda = ref('');
    const clienteActivo = computed(() => store.state.Clientes.clienteActivo);
    const arrayClientes = ref([]);
    let modalClientes = null;
    function selectGlovo() {
      store.dispatch('Clientes/setClienteActivo', GLOVO);
      console.log('El cliente es: ', clienteActivo.value);
      modalClientes.hide();
      store.dispatch('setToastAction', {
         tipo: 'SUCCESS',
         mensaje: 'Cliente seleccionado'
      });
      store.dispatch('showToast');
    }

    function selectDeliveroo() {
      axios.post('clientes/infoDeliveroo').then((res) => {
         if (!res.data.error) {
            this.selectCliente(res.data.deliveroo);
         } else {
            store.dispatch('setToastAction', {
               tipo: 'DANGER',
               mensaje: 'Error. No se ha podido seleccionar DELIVEROO'
            });
            store.dispatch('showToast');
         }
      }).catch((err) => {
         console.log(err);
         store.dispatch('setToastAction', {
            tipo: 'DANGER',
            mensaje: 'Error. No se ha podido seleccionar DELIVEROO'
         });
         store.dispatch('showToast');
      }); 
      this.selectCliente();
    }

    //  function borrarClienteActivo() {
    //     store.dispatch('Clientes/borrarClienteActivo', null);
    //  }

    function selectCliente(cliente) {
      store.dispatch('Clientes/setClienteActivo', cliente);
      store.dispatch('setModoActual', 'CLIENTE');
      store.dispatch('Footer/setMenuActivo', 1);
      modalClientes.hide();
      store.dispatch('setToastAction', {
         tipo: 'SUCCESS',
         mensaje: 'Cliente seleccionado'
      });
      store.dispatch('showToast');
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
       console.log('Mostrar puntos del cliente: ', id);
    }

    onMounted(() => {
      modalClientes = new Modal(document.getElementById('modalClientes'), {
        keyboard: false,
      });
    });

    return {
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
