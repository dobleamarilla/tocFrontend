<template>
    <div class='col-md-6 ms-3 mt-3'>
        <div class='row ms-3'>
            <div class="card cardWidth">
                <div class="card-body" style='text-align: center;'>
                    <span><i class="bi bi-door-open"></i></span>
                    <a href="#" class="btn btn-primary" @click="abrirModal()">Fichar</a>
                </div>
            </div>

            <div class="card cardWidth">
                <div class="card-body" style='text-align: center;'>
                    <span><i class="bi bi-cup-straw"></i></span>
                    <button @click="consumoPersonal()" class="btn btn-primary">Consumo personal</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="modalFichajes" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Fichar</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <div class="row">
                <input v-model="inputBusqueda" class="form-control" style="width: 350px; height: 50px; font-size: 20px" type="text" placeholder="Introduce tu nombre">
                <button type="button" style="width: 100px" class="btn btn-primary ms-2" @click="buscar()">Buscar</button>
                <div class="row">
                    <div class="table" style="height: 400px;">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Fichar/Desfichar</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(trabajador, index) of arrayTrabajadores" v-bind:key="index">
                                    <td>{{trabajador.nombre}}</td>
                                    <td v-if="trabajador.fichado === false || trabajador.fichado == undefined"><a href="#" class="btn btn-outline-primary btn_fc" @click="fichar(trabajador, index)">FICHAR</a></td>
                                    <td v-else><a href="#" class="btn btn-outline-success btn_fc" @click="desfichar(trabajador, index)">DESFICHAR</a></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary btn-lg" data-bs-dismiss="modal">Cerrar</button>
        </div>
        </div>
    </div>
    </div>
</template>
<script>
import { Modal } from 'bootstrap';
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { useStore } from 'vuex';
import router from '../router/index';

export default {
    name: 'Dependientas',
    setup() {
        const store = useStore();
        const nombre = 'Santy';
        const id = 156;
        let modalFichajes = null;
        const arrayTrabajadores = ref([]);
        const inputBusqueda = ref('');

        function abrirModal() {
            modalFichajes.show();
        }

        function cerrarModal() {
            modalFichajes.hide();
        }

        function buscar() {
            axios.post('trabajadores/buscar', { busqueda: inputBusqueda.value }).then((res) => {
                arrayTrabajadores.value = res.data;
            }).catch((err) => {
                console.log(err);
            });
        }

        function fichar(trabajador, index) {
            axios.post('trabajadores/fichar', { idTrabajador: trabajador.idTrabajador }).then((res) => {
                if (!res.data.error) {
                    console.log('Trabajador fichado');
                    arrayTrabajadores.value[index].fichado = true;
                } else {
                    console.log(res.data.mensaje);
                    arrayTrabajadores.value[index].fichado = false;
                }
            }).catch((err) => {
                console.log(err);
            });
        }

        function desfichar(trabajador, index) {
            axios.post('trabajadores/desfichar', { idTrabajador: trabajador.idTrabajador }).then((res) => {
                if (!res.data.error) {
                    console.log('Trabajador desfichado');
                    arrayTrabajadores.value[index].fichado = false;
                } else {
                    console.log('Error al desfichar');
                }
            }).catch((err) => {
                console.log(err);
            });
        }

        function consumoPersonal() {
            store.dispatch('setModoActual', 'CONSUMO PERSONAL');
            store.dispatch('Footer/setMenuActivo', 1);
            router.push('/');
        }

        onMounted(() => {
            modalFichajes = new Modal(document.getElementById('modalFichajes'), {
                keyboard: false,
            });
        });

        return {
            consumoPersonal,
            fichar,
            desfichar,
            inputBusqueda,
            arrayTrabajadores,
            buscar,
            cerrarModal,
            abrirModal,
            nombre,
            id,
        };
    },
};
</script>
<style scoped>
    .cardWidth {
       width: 10rem;
       margin: 5px;
    }
    span i {
        font-size: 5rem;
    }
</style>
