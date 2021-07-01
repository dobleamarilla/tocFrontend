<template>
	<div class="row pt-1">
		<div class="col-md-5 ordenado">
			<div class="table-responsive estiloCesta">
				<table class="table fuenteIvan colorFuente" id="job-table">
					<thead>
						<tr>
							<th scope="col">Productos</th>
							<th scope="col">Unidades</th>
							<th scope="col">Precio</th>
						</tr>
					</thead>
					<tbody class="tableBody" :style="conCliente">
						<tr v-for="(item, index) of listaAlReves" :key="index" v-bind:class="{'estiloPromo': item.promocion.esPromo, 'seleccionado': activo === index}" @click="selectActivo(index)">
							<td v-if="sePuedeRegalar(item.subtotal, item.promocion.esPromo)">{{item.nombre}} <img @click="regalar(index)" src="assets/imagenes/regalo.png" alt="Regalar"></td>
							<td v-else>{{item.nombre}}</td>
							<td>{{item.unidades}}</td>
							<td>{{item.subtotal.toFixed(2)}}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<div class="col-md-7 ps-4" style="padding-top: 36px;">
			<div class="row">
        <!-- <div class="col-md-6">
					<button class="btn btn-primary sizeMenus botonesPrincipales" @click="cobrar()"><i class="bi bi-cart iconosBootstrap"></i> {{getTotal}} €</button>
        </div>
        <div class="col-md-3">
          <button class="btn btn-primary botonesPrincipales" @click="abrirModalTicketsAbiertos()"><i class="bi bi-plus-circle-fill iconosBootstrap"></i></button>
        </div>
        <div class="col-md-3">
					<button class="btn btn-primary botonesPrincipales" @click="borrar()"><i class="bi bi-trash iconosBootstrap"></i></button>
        </div> -->

					<button class="btn btn-secondary sizeMenus botonesPrincipales anchoBotonTotal me-2 menusColorIvan" @click="cobrar()"><i class="bi bi-cart iconosBootstrap"></i> {{getTotal}} €</button>
          <button class="btn btn-secondary botonesPrincipales anchoBotonBorrar me-2 menusColorIvan" @click="borrar()"><i class="bi bi-trash iconosBootstrap"></i></button>
          <button class="btn btn-secondary botonesPrincipales anchoBotonMas menusColorIvan" @click="abrirModalTicketsAbiertos()"><i class="bi bi-plus-circle-fill iconosBootstrap"></i></button>
					

			</div>
			<!-- <div class="row pt-1" v-if="prohibirBuscarArticulos === false">
				<div class="col-md-3 paraNumerico" id="botonClientes">
					<button class="btn btn-secondary btn-block sizeMenus" @click="abrirModalBuscarProductos()"><i class="bi-search"></i></button>
				</div>
			</div> -->
		</div>
	</div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import axios from "axios";
export default {
    name: 'Footer',
    setup() {
        var cesta = {_id: -1, lista: []};
        var activo = null;
        var conCliente = null;
        var puntosClienteActivo = 0;
        var lineaDeRegalo = null;
        var prohibirBuscarArticulos = true;


        function setCesta(cestaFromBackend) {
            cesta = cestaFromBackend;
        }

        var listaAlReves = computed(()=> [...cesta.lista].reverse());
        var getTotal = computed(()=> {
            let suma = 0;
            for(let i = 0; i < cesta.lista.length; i++)
            {
                if(i !== lineaDeRegalo)
                {
                    suma += cesta.lista[i].subtotal;    
                }
            }
            return suma.toFixed(2);
        });

        /* INICIALIZACIÓN DE CESTA */
        axios.post("/getCesta").then(res=>{
            setCesta(res.data);
        });
        
        return {getTotal, listaAlReves, conCliente};
    }
}
</script>

<style scoped>
.sizeMenus{
    font-size: 42px;
}
.anchoBotonTotal {
  width: 420px;
}
.anchoBotonBorrar {
  width: 200px;
}
.anchoBotonMas {
  width: 200px;
}
.botonesPrincipales{
  background-color: #fff5e9;
  color: #c95907;
  border-color: #bf5c18;
  border-width: 3px;
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

.menusColorIvan.btn-secondary:not(:disabled):not(.disabled):active, .btn-secondary:not(:disabled):not(.disabled).active,
.show > .btn-secondary.dropdown-toggle {
  color: #c95907 !important;
  background-color: #fff5e9 !important;
  border-color: #bf5c18 !important;
  border-width: 3px;
}

.menusColorIvan.btn-secondary:not(:disabled):not(.disabled):active:focus, .btn-secondary:not(:disabled):not(.disabled).active:focus,
.show > .btn-secondary.dropdown-toggle:focus {
  box-shadow: none !important;
}

.iconosBootstrap {
  font-size: 5rem;
}
</style>