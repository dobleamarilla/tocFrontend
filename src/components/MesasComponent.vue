<template>
    <div class='container-mesas'>
        <div class='row mt-3'>
            <div class='col text-center'>
                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">Mesa 1</h5>
                        <p class="card-text">Total: 10.25€</p>
                        <a href="#" class="btn btn-primary">Seleccionar</a>
                        <a href="#" class="btn btn-danger ms-2">Borrar</a>
                    </div>
                </div>
            </div>
            <div class='col text-center'>
                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">Mesa 2</h5>
                        <p class="card-text">Total: 10.25€</p>
                        <a href="#" class="btn btn-primary">Seleccionar</a>
                        <a href="#" class="btn btn-danger ms-2">Borrar</a>
                    </div>
                </div>
            </div>
            <div class='col text-center'>
                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">Mesa 3</h5>
                        <p class="card-text">Total: 10.25€</p>
                        <a href="#" class="btn btn-primary">Seleccionar</a>
                        <a href="#" class="btn btn-danger ms-2">Borrar</a>
                    </div>
                </div>
            </div>
            <div class='col text-center'>
                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">Mesa 4</h5>
                        <p class="card-text">Total: 10.25€</p>
                        <a href="#" class="btn btn-primary">Seleccionar</a>
                        <a href="#" class="btn btn-danger ms-2">Borrar</a>
                    </div>
                </div>
            </div>
            <div class='col text-center'>
                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">Mesa 5</h5>
                        <p class="card-text">Total: 10.25€</p>
                        <a href="#" class="btn btn-primary">Seleccionar</a>
                        <a href="#" class="btn btn-danger ms-2">Borrar</a>
                    </div>
                </div>
            </div>
        </div>
        <div class='row mt-3'>
            <div class='col text-center'>
                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">Mesa 6</h5>
                        <p class="card-text">Total: 10.25€</p>
                        <a href="#" class="btn btn-primary">Seleccionar</a>
                        <a href="#" class="btn btn-danger ms-2">Borrar</a>
                    </div>
                </div>
            </div>
        </div>
        <div class='row mt-3 mb-3 fixed-row-bottom'>
            <div class='col text-center'>
                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">Nueva mesa</h5>
                        <p class="card-text">Crear nueva mesa</p>
                        <a href="#" class="btn btn-primary">Crear</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="position-absolute bottom-0 end-0">
        <button @click="volver()" class="btn btn-primary btn-lg me-2">VOLVER</button>
    </div>
</template>
<script>
    import router from '../router/index';
    export default {
        name: 'MesasComponent',
        setup() {
            function volver() {
                router.push('/');
            }
            return {
                volver,
            };
        },
    };
</script>
<style scoped>
    .fixed-row-bottom {
        position: fixed;
        bottom: 0;
    }
</style>
