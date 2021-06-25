<template>
    <div class="modal" id="modalInstallWizard" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-body">
                    <!-- <div class="form-group row">
                        <label for="inputLicencia" class="col-sm-3 col-form-label">Licencia</label>
                        <div class="col-sm-9">
                            <input v-model="licencia" type="text" class="form-control" id="xxxxxxx">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputPassword" class="col-sm-3 col-form-label">Contraseña</label>
                        <div class="col-sm-9">
                            <input v-model="password" type="password" class="form-control" id="xxxx">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputImpresora" class="col-sm-3 col-form-label">Impresora</label>
                        <div class="col-sm-9">
                            <select v-model="tipoImpresora" class="custom-select">
                                <option selected value="USB">USB</option>
                                <option value="SERIE">SERIE</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputDatafono" class="col-sm-3 col-form-label">Datáfono</label>
                        <div class="col-sm-9">
                            <select v-model="tipoDatafono" class="custom-select">
                                <option selected value="CLEARONE">CLEARONE</option>
                                <option value="3G">3G</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputImpresoraCafe" class="col-sm-3 col-form-label">Impresora cafeteria</label>
                        <div class="col-sm-9">
                            <select v-model="impresoraCafeteria" class="custom-select">
                                <option selected value="SI">SI</option>
                                <option value="NO">NO</option>
                            </select>
                        </div>
                    </div>
                    <div class="row" v-if="esperando">
                        <img src="assets/loading.gif" style="display:block;margin:auto;" alt="Esperando respuesta del servidor">
                    </div> -->
                    <div class="mb-3">
                        <label class="form-label">Nº Licencia</label>
                        <input v-model="licencia" type="text" class="form-control form-control-lg">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Contraseña</label>
                        <input v-model="password" type="password" class="form-control form-control-lg">
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
                        <select v-model="impresoraCafeteria" class="form-select form-select-lg mb-3">
                            <option selected value="SI">SI</option>
                            <option value="NO">NO</option>
                        </select>
                    </div>
                    <div class="row" v-if="esperando">
                        <img src="assets/loading.gif" style="display:block;margin:auto;width:200px" alt="Esperando respuesta del servidor">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" @click="confirmar()">Confirmar</button>
                    <button type="button" class="btn btn-danger" @click="reset()">Reset</button>
                </div>
                <button @click="testPrint()">TESTIABLE</button>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, computed, ref } from 'vue';
import {useStore} from "vuex";
import axios from "axios";

export default defineComponent({
    name: 'ModalInstallWizard',
    setup() {
        const store = useStore();
        var licencia = ref('');
        var password = ref('');
        var tipoImpresora = ref('USB');
        var tipoDatafono = ref('CLEARONE');
        var impresoraCafeteria = ref('NO');
        var esperando = ref(false);

        onMounted(()=>{
            store.dispatch("modalInstallWizard/copyInitialData").then((res)=>{
                licencia.value = res.licencia;
                password.value = res.password;
                tipoImpresora.value = res.tipoImpresora;
                tipoDatafono.value = res.tipoDatafono;
                impresoraCafeteria.value = res.impresoraCafeteria;
            })
        });

    function testPrint(){
        console.log(`La password es: ${password.value} y la licencia: ${licencia.value}`)
    }
        function confirmar() {
            esperando.value = true;
            const lol = {
                parametros: {
                    licencia: licencia.value,
                    password: password.value,
                    tipoImpresora: tipoImpresora.value,
                    tipoDatafono: tipoDatafono.value,
                    impresoraCafeteria: impresoraCafeteria.value
                }
                
            };
            console.log(lol);
            axios.post("/pedirDatosLicencia", lol);
        }

        onMounted(()=>{
            store.dispatch("modalInstallWizard/setModal");
        });

        return {testPrint, confirmar, licencia, password, tipoImpresora, tipoDatafono, impresoraCafeteria, esperando}
    },
})
</script>
