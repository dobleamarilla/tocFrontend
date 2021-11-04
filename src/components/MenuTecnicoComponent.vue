<template>
  <div class="container-fliud">
      <div class="row text-center mt-2">
          <div class="col">
            <button class="btn btn-primary buttonSizeTecnico" @click="descargarClientesFinales()">Descargar clientes finales</button>
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

export default {
    setup() {
        function descargarClientesFinales() {
            axios.post('clientes/descargarClientesFinales').then((res) => {
                if (res.data.error == false) {
                    alert('Clientes descargados OK');
                } else {
                    alert(res.data.mensaje);
                }
            }).catch((err) => {
                alert('Error descargarClientesFinales CATCH');      
            });
        }

        function volver() {
            router.push('/menu/caja');
        }

        return {
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