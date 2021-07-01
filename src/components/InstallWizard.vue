<template>
    <div class="modal" id="modalInstallWizard" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="mb-3">
                        <label class="form-label">Nº Licencia</label>
                        <input v-model="licencia" type="text" class="form-control form-control-lg">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Contraseña</label>
                        <input v-model="password"
                            type="password"
                            class="form-control form-control-lg">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Tipo impresora</label>
                        <select v-model="tipoImpresora" class="form-select form-select-lg mb-3">
                            <option selected value="USB">USB</option>
                            <option value="SERIE">SERIE</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Tipo datáfono</label>
                        <select v-model="tipoDatafono" class="form-select form-select-lg mb-3">
                            <option selected value="CLEARONE">CLEARONE</option>
                            <option value="3G">3G</option>
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
                    <div class="row" v-if="esperando">
                        <img src="assets/loading.gif"
                        style="display:block;margin:auto;width:200px"
                        alt="Esperando respuesta del servidor">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary"
                    @click="confirmar()"> Confirmar </button>
                    <button type="button" class="btn btn-danger"
                    @click="reset()"> Reset </button>
                </div>
                <button @click="testPrint()">TESTIABLE</button>
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';

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
          licencia: licencia.value,
          password: password.value,
          tipoImpresora: tipoImpresora.value,
          tipoDatafono: tipoDatafono.value,
          impresoraCafeteria: impresoraCafeteria.value,
        },
      };
      console.log(lol);
      axios.post('/pedirDatosLicencia', lol);
    }

    onMounted(() => {
      store.dispatch('InstallWizard/setModal');
    });

    return {
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
