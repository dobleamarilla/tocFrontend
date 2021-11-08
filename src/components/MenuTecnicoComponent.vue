<template>
  <div class="container-fliud">
      <div class="row text-center mt-2">
          <div class="col">
            <button class="btn btn-primary buttonSizeTecnico" @click="descargarClientesFinales()">Descargar clientes finales</button>
          </div>
      </div>
      <div class="row text-center mt-2">
          <div class="col">
            <button class="btn btn-primary buttonSizeTecnico" @click="descargarTicketInfo()">Descargar info. ticket finales</button>
          </div>
      </div>
  </div>
  <div class="position-fixed bottom-0 start-0 ms-2 mb-2">
      <button class="btn btn-warning buttonSizeTecnico" @click="volver()">Volver</button>
  </div>
</template>

<script>
import axios from 'axios';
import router from '../router/index';
import { useToast } from 'vue-toastification';

export default {
    setup() {
        const toast = useToast();
        function descargarClientesFinales() {
            axios.post('clientes/descargarClientesFinales').then((res) => {
                if (res.data.error == false) {
                    toast.success('Clientes descargados OK');
                } else {
                    toast.error(res.data.mensaje);
                }
            }).catch((err) => {
                toast.error('Error descargarClientesFinales CATCH');
            });
        }

        function volver() {
            router.push('/menu/caja');
        }

        function descargarTicketInfo() {
            axios.post('params-ticket/descargarInfoTicket').then((res) => {
                if (res.data.error == false) {
                    toast.success('Info. ticket actualizada');
                } else {
                    toast.error(res.data.mensaje);
                }
            }).catch((err) => {
                console.log(err);
                toast.error('Error en Catch');
            });
        }

        return {
            descargarTicketInfo,
            volver,
            descargarClientesFinales
        };     
    },
}
</script>

<style scoped>
 .buttonSizeTecnico {
     font-size: 40px;
 }
</style>