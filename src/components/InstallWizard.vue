<template>
  <div class=" row mt-1">
    <h1 class="text-center" style="font-weight: bold">Instalador de licencia</h1>
  </div>
  <div class="row mt-2">
    <div class="col">
      <div class="mb-3">
          <label class="form-label">Nº Licencia</label>
          <input v-model="licencia" type="number" class="form-control form-control-lg">
      </div>
      <div class="mb-3">
        <label class="form-label">Contraseña</label>
        <input v-model="password"
            type="password"
            class="form-control form-control-lg" autocomplete="on">
      </div>
      <div class="mb-3">
          <label class="form-label">Tipo datáfono</label>
          <select v-model="tipoDatafono" class="form-select form-select-lg mb-3">
              <option selected value="CLEARONE">CLEARONE</option>
              <option value="3G">3G</option>
          </select>
      </div>
    </div>
    <div class="col">
      <div class="mb-3">
          <label class="form-label">Tipo impresora</label>
          <select v-model="tipoImpresora" class="form-select form-select-lg mb-3">
              <option selected value="USB">USB</option>
              <option value="SERIE">SERIE</option>
          </select>
      </div>
      <div class="mb-3">
          <label class="form-label">Impresora cafetería</label>
          <select v-model="impresoraCafeteria"
              class="form-select form-select-lg mb-3">
                <option selected value="SI">SI</option>
                <option value="NO">NO</option>
          </select>
      </div>
    </div>
  </div>
  <div v-if="primeraParte"  class="row">
      <p style="font-size: 20px; font-weight: bold;">¡Atención! Si ya habían datos en este TPV, instalar la licencia eliminará los datos antiguos.</p>
      <img v-if="esperando" src="../assets/imagenes/loadingNew.gif"
      style="display:block;margin:auto;width:300px"
      alt="Esperando respuesta del servidor">
  </div>

  <div v-if="segundaParte" class="row">
    <p style="font-size: 20px; font-weight: bold; color: green">¡Datos correctos! Espera mientras se descargan los datos del TPV.</p>
    <img src="../assets/imagenes/loadingNew.gif"
    style="display:block;margin:auto;width:300px"
    alt="Esperando respuesta del servidor">
  </div>

  <div class="position-absolute bottom-0 end-0 me-2">
      <button type="button" class="btn btn-primary botones me-2"
      @click="confirmar()"> Confirmar </button>
      <button type="button" class="btn btn-danger botones"
      @click="reset()"> Reset </button>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';
// import { parametros } from '../services/parametros';

export default {
  name: 'InstallWizard',
  setup() {
    const store = useStore();
    const licencia = ref('');
    const password = ref('');
    const tipoImpresora = ref('USB');
    const tipoDatafono = ref('CLEARONE');
    const impresoraCafeteria = ref('NO');
    const esperando = ref(false);
    const primeraParte = ref(true);
    const segundaParte = ref(false);

    onMounted(() => {
      store.dispatch('InstallWizard/copyInitialData').then((res) => {
        licencia.value = res.licencia;
        password.value = res.password;
        tipoImpresora.value = res.tipoImpresora;
        tipoDatafono.value = res.tipoDatafono;
        impresoraCafeteria.value = res.impresoraCafeteria;
      });
    });

    function testPrint() {
      console.log(`La password es: ${password.value} y la licencia: ${licencia.value}`);
    }
    function confirmar() {
      esperando.value = true;
      const lol = {
        parametros: {
          licencia: Number(licencia.value),
          password: password.value,
          tipoImpresora: tipoImpresora.value,
          tipoDatafono: tipoDatafono.value,
          impresoraCafeteria: impresoraCafeteria.value,
        },
      };

      axios.post('/instalador/pedirDatos', {
        password: lol.parametros.password,
        numLlicencia: lol.parametros.licencia
      }).then((res) => {
        if (!res.data.error) {
          console.log(res.data.info);
          esperando.value = false;
          primeraParte.value = false;
          segundaParte.value = true;
        } else {
          esperando.value = false;
          alert(res.data.mensaje);
        }        
      }).catch((err) => {
        console.log(err);
        esperando.value = false;
      });
    }

    onMounted(() => {
      store.dispatch('InstallWizard/setModal');
    });

    return {
      primeraParte,
      segundaParte,
      testPrint,
      confirmar,
      licencia,
      password,
      tipoImpresora,
      tipoDatafono,
      impresoraCafeteria,
      esperando,
    };
  },
};
</script>

<style scoped>
  .botones {
    font-size: 40px;
  }
</style>