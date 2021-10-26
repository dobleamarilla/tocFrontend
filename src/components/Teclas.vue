<template>
<button @click="test()">TESTIABLE</button>
  <div class="row p-2" id="menusColores">
    <template v-if="listaMenus.length <= 11">
      <div v-for="(item, index) of listaMenus" :key="item.nomMenu" @click="clickMenu(index)" class="col colJuntitasMenus menus" style="padding-left: 4px;">
        <button class="btn btn-secondary w-100 menus menusColorIvan colorMenus" v-bind:class="[{'activo' : esActivo(index)}]">
          {{item.nomMenu}}
        </button>
      </div>
    </template>
    <template v-else class="scrollmenu">
      <div class="scrollmenu" style="-webkit-transform: translateZ(0); ">
        <div class="col colJuntitasMenus menus">
          <button v-for="(item, index) of listaMenus"
          :key="index" style="width: 200px"
          class="btn btn-secondary menus menusColorIvan ms-2"
          v-bind:class="[{'activo' : esActivo(index)}, 'colorMenus']"
          @click="clickMenu(index)">{{item.nomMenu}}</button>
        </div>
      </div>
    </template>
  </div>
  <div>
    <div class="row" v-for="index in 6" :key="index">
        <div class="col colJuntitas" v-for="index2 in 6" :key="index2">
          <template v-if="listadoTeclas[(index-1)*6+(index2-1)].esSumable === true">
            <div v-if="botonesPrecio === true">
              <button v-bind:id="listadoTeclas[(index-1)*6+(index2-1)].idBoton"
              class="btn btn-primary rounded-0 w-100 teclas"
              v-bind:class="[listadoTeclas[(index-1)*6+(index2-1)].color,
              {'invisible': listadoTeclas[(index-1)*6+(index2-1)].idArticle == -1}]"
              @click="clickTecla(listadoTeclas[(index-1)*6+(index2-1)]);
               mostrarInfoVisor(listadoTeclas[(index-1)*6+(index2-1)]);"
              v-on:contextmenu="abrirFicha(listadoTeclas[(index-1)*6+(index2-1)].idArticle)"
              style="background-color: #dee3e9; font-size: 1.02vw;">
                {{listadoTeclas[(index-1)*6+(index2-1)].nombreArticulo.nombre}}
                {{listadoTeclas[(index-1)*6+(index2-1)].nombreArticulo.precio}}
              </button>
            </div>
            <div v-else>
              <button v-bind:id="listadoTeclas[(index-1)*6+(index2-1)].idBoton"
              class="btn btn-primary rounded-0 w-100 teclas"
              v-bind:class="[listadoTeclas[(index-1)*6+(index2-1)].color,
              {'invisible': listadoTeclas[(index-1)*6+(index2-1)].idArticle == -1}]"
              @click="clickTecla(listadoTeclas[(index-1)*6+(index2-1)]);
              mostrarInfoVisor(listadoTeclas[(index-1)*6+(index2-1)]);"
              v-on:contextmenu="abrirFicha(listadoTeclas[(index-1)*6+(index2-1)].idArticle)"
              style="background-color: #dee3e9;">
              {{listadoTeclas[(index-1)*6+(index2-1)].nombreArticulo.nombre}}
              </button>
            </div>
          </template>
          <template v-else>
            <button v-bind:id="listadoTeclas[(index-1)*6+(index2-1)].idBoton"
            class="btn btn-primary rounded-0 w-100 teclas"
            v-bind:class="[listadoTeclas[(index-1)*6+(index2-1)].color,
            {'invisible': listadoTeclas[(index-1)*6+(index2-1)].idArticle == -1}]"
            @click="modalesSumable(listadoTeclas[(index-1)*6+(index2-1)],
            listadoTeclas[(index-1)*6+(index2-1)].idBoton);
            mostrarInfoVisor(listadoTeclas[(index-1)*6+(index2-1)])"
            style="background-color: #dee3e9;">
            {{listadoTeclas[(index-1)*6+(index2-1)].nombreArticulo.nombre}}
            </button>
          </template>
        </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
// import { Modal } from 'bootstrap';
import axios from 'axios';
import router from '../router/index';

export default {
  name: 'Teclas',
  setup() {
    const store = useStore();
    const cesta = computed(() => store.state.Cesta.cesta);
    const cajaAbierta = computed(() => store.state.Caja.cajaAbierta);
    const listaMenus = ref([{ nomMenu: '' }]);
    let clickMenuBloqueado = false;
    const listaPrecios = ref([{
      _id: -1,
      nombre: '',
      precioConIva: 0,
      precioBase: 0,
      tipoIva: 0,
      esSumable: true,
      familia: '',
    },
    ]);
    const listadoTeclas = ref([]);
    let menuActivo = 0;
    const botonesPrecio = false;
    const unidadesAplicar = 1;
    const edadState = computed(() => store.state.modalPeso.edadState);

    function test() {
      // //store.dispatch('ModalPeso/abrirModal', { idArticulo: articuloAPeso.idArticle, idBoton });
      // axios.post('pruebas/test', { idCliente: 'CliBoti_000_{A83B364B-252F-464B-B0C3-AA89DA258F64}', parametros: {
      //   database: 'Fac_Tena'
      // } }).then((res) => {
      //   console.log(res);
      // });
      axios.post('pruebas/test');
    }
    function esActivo(x) {
      if (x === menuActivo) {
        return true;
      }
      return false;
    }
    function modalesSumable(articuloAPeso, idBoton) {
      store.dispatch('ModalPeso/abrirModal', { idArticulo: articuloAPeso.idArticle, idBoton });
    }
    function mostrarInfoVisor(objListadoTeclas) {
      const a = objListadoTeclas;
      a.toString();
    }
    function resetTeclado() {
      listadoTeclas.value = [
        {
          idBoton: 'tecla0',
          idArticle: -1,
          pos: -1,
          color: 'colorIvan1',
          nombreArticulo: { nombre: '', precio: '' },
          esSumable: true,
        },
        {
          idBoton: 'tecla1',
          idArticle: -1,
          pos: -1,
          color: 'colorIvan1',
          nombreArticulo: { nombre: '', precio: '' },
          esSumable: true,
        },
        {
          idBoton: 'tecla2',
          idArticle: -1,
          pos: -1,
          color: 'colorIvan1',
          nombreArticulo: { nombre: '', precio: '' },
          esSumable: true,
        },
        {
          idBoton: 'tecla3',
          idArticle: -1,
          pos: -1,
          color: 'colorIvan1',
          nombreArticulo: { nombre: '', precio: '' },
          esSumable: true,
        },
        {
          idBoton: 'tecla4',
          idArticle: -1,
          pos: -1,
          color: 'colorIvan1',
          nombreArticulo: { nombre: '', precio: '' },
          esSumable: true,
        },
        {
          idBoton: 'tecla5',
          idArticle: -1,
          pos: -1,
          color: 'colorIvan1',
          nombreArticulo: { nombre: '', precio: '' },
          esSumable: true,
        },
        {
          idBoton: 'tecla6',
          idArticle: -1,
          pos: -1,
          color: 'colorIvan2',
          nombreArticulo: { nombre: '', precio: '' },
          esSumable: true,
        },
        {
          idBoton: 'tecla7',
          idArticle: -1,
          pos: -1,
          color: 'colorIvan2',
          nombreArticulo: { nombre: '', precio: '' },
          esSumable: true,
        },
        {
          idBoton: 'tecla8',
          idArticle: -1,
          pos: -1,
          color: 'colorIvan2',
          nombreArticulo: { nombre: '', precio: '' },
          esSumable: true,
        },
        {
          idBoton: 'tecla9',
          idArticle: -1,
          pos: -1,
          color: 'colorIvan2',
          nombreArticulo: { nombre: '', precio: '' },
          esSumable: true,
        },
        {
          idBoton: 'tecla10',
          idArticle: -1,
          pos: -1,
          color: 'colorIvan2',
          nombreArticulo: { nombre: '', precio: '' },
          esSumable: true,
        },
        {
          idBoton: 'tecla11',
          idArticle: -1,
          pos: -1,
          color: 'colorIvan2',
          nombreArticulo: { nombre: '', precio: '' },
          esSumable: true,
        },
        {
          idBoton: 'tecla12',
          idArticle: -1,
          pos: -1,
          color: 'colorIvan3',
          nombreArticulo: { nombre: '', precio: '' },
          esSumable: true,
        },
        {
          idBoton: 'tecla13',
          idArticle: -1,
          pos: -1,
          color: 'colorIvan3',
          nombreArticulo: { nombre: '', precio: '' },
          esSumable: true,
        },
        {
          idBoton: 'tecla14',
          idArticle: -1,
          pos: -1,
          color: 'colorIvan3',
          nombreArticulo: { nombre: '', precio: '' },
          esSumable: true,
        },
        {
          idBoton: 'tecla15',
          idArticle: -1,
          pos: -1,
          color: 'colorIvan3',
          nombreArticulo: { nombre: '', precio: '' },
          esSumable: true,
        },
        {
          idBoton: 'tecla16',
          idArticle: -1,
          pos: -1,
          color: 'colorIvan3',
          nombreArticulo: { nombre: '', precio: '' },
          esSumable: true,
        },
        {
          idBoton: 'tecla17',
          idArticle: -1,
          pos: -1,
          color: 'colorIvan3',
          nombreArticulo: { nombre: '', precio: '' },
          esSumable: true,
        },
        {
          idBoton: 'tecla18',
          idArticle: -1,
          pos: -1,
          color: 'colorIvan4',
          nombreArticulo: { nombre: '', precio: '' },
          esSumable: true,
        },
        {
          idBoton: 'tecla19',
          idArticle: -1,
          pos: -1,
          color: 'colorIvan4',
          nombreArticulo: { nombre: '', precio: '' },
          esSumable: true,
        },
        {
          idBoton: 'tecla20',
          idArticle: -1,
          pos: -1,
          color: 'colorIvan4',
          nombreArticulo: { nombre: '', precio: '' },
          esSumable: true,
        },
        {
          idBoton: 'tecla21',
          idArticle: -1,
          pos: -1,
          color: 'colorIvan4',
          nombreArticulo: { nombre: '', precio: '' },
          esSumable: true,
        },
        {
          idBoton: 'tecla22',
          idArticle: -1,
          pos: -1,
          color: 'colorIvan4',
          nombreArticulo: { nombre: '', precio: '' },
          esSumable: true,
        },
        {
          idBoton: 'tecla23',
          idArticle: -1,
          pos: -1,
          color: 'colorIvan4',
          nombreArticulo: { nombre: '', precio: '' },
          esSumable: true,
        },
        {
          idBoton: 'tecla24',
          idArticle: -1,
          pos: -1,
          color: 'colorIvan5',
          nombreArticulo: { nombre: '', precio: '' },
          esSumable: true,
        },
        {
          idBoton: 'tecla25',
          idArticle: -1,
          pos: -1,
          color: 'colorIvan5',
          nombreArticulo: { nombre: '', precio: '' },
          esSumable: true,
        },
        {
          idBoton: 'tecla26',
          idArticle: -1,
          pos: -1,
          color: 'colorIvan5',
          nombreArticulo: { nombre: '', precio: '' },
          esSumable: true,
        },
        {
          idBoton: 'tecla27',
          idArticle: -1,
          pos: -1,
          color: 'colorIvan5',
          nombreArticulo: { nombre: '', precio: '' },
          esSumable: true,
        },
        {
          idBoton: 'tecla28',
          idArticle: -1,
          pos: -1,
          color: 'colorIvan5',
          nombreArticulo: { nombre: '', precio: '' },
          esSumable: true,
        },
        {
          idBoton: 'tecla29',
          idArticle: -1,
          pos: -1,
          color: 'colorIvan5',
          nombreArticulo: { nombre: '', precio: '' },
          esSumable: true,
        },
        {
          idBoton: 'tecla30',
          idArticle: -1,
          pos: -1,
          color: 'colorIvan6',
          nombreArticulo: { nombre: '', precio: '' },
          esSumable: true,
        },
        {
          idBoton: 'tecla31',
          idArticle: -1,
          pos: -1,
          color: 'colorIvan6',
          nombreArticulo: { nombre: '', precio: '' },
          esSumable: true,
        },
        {
          idBoton: 'tecla32',
          idArticle: -1,
          pos: -1,
          color: 'colorIvan6',
          nombreArticulo: { nombre: '', precio: '' },
          esSumable: true,
        },
        {
          idBoton: 'tecla33',
          idArticle: -1,
          pos: -1,
          color: 'colorIvan6',
          nombreArticulo: { nombre: '', precio: '' },
          esSumable: true,
        },
        {
          idBoton: 'tecla34',
          idArticle: -1,
          pos: -1,
          color: 'colorIvan6',
          nombreArticulo: { nombre: '', precio: '' },
          esSumable: true,
        },
        {
          idBoton: 'tecla35',
          idArticle: -1,
          pos: -1,
          color: 'colorIvan6',
          nombreArticulo: { nombre: '', precio: '' },
          esSumable: true,
        },
      ];
    }
    function cargarTeclado(data) {
      resetTeclado();
      for (let i = 0; i < data.length; i += 1) {
        listadoTeclas.value[data[i].pos].nombreArticulo.nombre = data[i].nombreArticulo;
        if (data[i].nombreArticulo != null) {
          listadoTeclas.value[data[i].pos].idArticle = data[i].idArticle;
        } else {
          listadoTeclas.value[data[i].pos].idArticle = -1;
        }
        // this.listadoTeclas[data[i].pos].color = this.auxTranslateColor(i);
        listadoTeclas.value[data[i].pos].esSumable = data[i].esSumable;
        /* LISTADO PRECIOS */
        const datosProducto = listaPrecios.value.find((x) => x.nombre === data[i].nombreArticulo);
        listadoTeclas.value[data[i].pos].nombreArticulo.precio = (datosProducto !== undefined) ? `${datosProducto.precioConIva}€` : '0€';
      }
    }
    function clickMenu(index) {
      if (!clickMenuBloqueado) {
        clickMenuBloqueado = true;
        axios.post('/menus/clickMenu', { nombreMenu: listaMenus.value[index].nomMenu }).then((res) => {
          if (!res.data.bloqueado) {
            menuActivo = index;
            clickMenuBloqueado = false;
            cargarTeclado(res.data.resultado);
          } else {
            console.log('Pero donde vas, Rayo McQueen');
          }
        }).catch((err) => {
          console.log(err);
          clickMenuBloqueado = false;
        });
      } else {
        console.log('Estoy bloqueado');
      }
    }
    function clickTecla(objListadoTeclas, esAPeso = false) {
      if (!esAPeso) {
        axios.post('cestas/setUnidadesAplicar', { unidades: unidadesAplicar }).then((res) => {
          if (res.data.okey) {
            if (!esAPeso) { // TIPO NORMAL
              axios.post('cestas/clickTeclaArticulo', {
                idArticulo: objListadoTeclas.idArticle,
                idBoton: objListadoTeclas.idBoton,
                peso: esAPeso,
                infoPeso: null,
                idCesta: cesta.value._id
              }).then((res2) => {
                if (res2.data.error === false && res2.data.bloqueado === false) {
                  store.dispatch('Cesta/setCestaAction', res2.data.cesta);
                } else {
                  console.log('Error en clickTeclaArticulo');
                }
              });
            } else { // TIPO A PESO
            }
          } else {
            console.log('Error en setUnidadesAplicar');
          }
        });
      }
    }
    resetTeclado();
    axios.post('/menus/getMenus').then((res) => {
      if (!res.data.bloqueado) {
        listaMenus.value = res.data.resultado;
        clickMenu(0);
      } else {
        console.log('EN ESTE MOMENTO NO ES POSIBLE CARGAR EL TECLADO');
      }
    });

    onMounted(() => {
      document.onselectstart = function(){ return false; }
      /* OBSERVAR SI LA CAJA ESTÁ ABIERTA */
      axios.post('caja/estadoCaja').then((res) => {
        if (!res.data.error) {
          if (res.data.abierta) {
            store.dispatch('Caja/setEstadoCaja', true);
            console.log('establezco cajaAbierta = true');
          } else {
            store.dispatch('Caja/setEstadoCaja', false);
            router.push('/abrirCaja');
            console.log("PORQUEEEEEEEEEEEEE");
          }
        }
      }).catch((err) => {
        console.log(err);
        alert('Error, contactar con informática');
      });
    });

    return {
      test,
      edadState,
      listaMenus,
      menuActivo,
      listadoTeclas,
      esActivo,
      botonesPrecio,
      clickMenu,
      clickTecla,
      mostrarInfoVisor,
      modalesSumable,
    };
    /* FINAL SETUP */
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.teclas {
    height: 70px;
}
.colJuntitas {
    /* padding-right: 0px; */
    padding: 2px;
}
.colorIvan1 {
    background-color: #DEE3E9 !important;
    color: #5E5F61 !important;
    border-color: #DEE3E9 !important;
}
.colorIvan2 {
    background-color: #EDDECB !important;
    color: #5E5F61 !important;
    border-color: #EDDECB !important;
}
.colorIvan3 {
    background-color: #FBB5B5 !important;
    color: #5E5F61 !important;
    border-color: #FBB5B5 !important;
}
.colorIvan4 {
    background-color: #DCE9D5 !important;
    color: #5E5F61 !important;
    border-color: #DCE9D5 !important;
}
.colorIvan5 {
    background-color: #EFD8A6 !important;
    color: #5E5F61 !important;
    border-color: #EFD8A6 !important;
}
.colorIvan6 {
    background-color: #B0AEC6 !important;
    color: #5E5F61 !important;
    border-color: #B0AEC6 !important;
}
.botonesMenu {
    background-color: #d45600;
    border-color: #d45600;
    margin-right: 4px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
.menus {
    height: 70px;
}
.colorMenus {
    background-color: #d45600;
    color: #fffaee;
    border-color: #d45600;
}
.activo {
    background-color: #fff5e9;
    color: #c95907;
    border-color: #bf5c18;
}
.btn-secondary:hover {
    color: #c95907 !important;
    background-color: #fff5e9 !important;
    border-color: #bf5c18 !important;
  }
  .btn-secondary:focus, .btn-secondary.focus {
    color: #c95907 !important;
    background-color: #fff5e9 !important;
    border-color: #bf5c18 !important;
    box-shadow: none !important;
  }
  .btn-secondary.disabled, .btn-secondary:disabled {
    color: #fff !important;
    background-color: #6c757d !important;
    border-color: #6c757d !important;
  }
  .btn-secondary:not(:disabled):not(.disabled):active,
  .btn-secondary:not(:disabled):not(.disabled).active,
  .show > .btn-secondary.dropdown-toggle {
    color: #c95907 !important;
    background-color: #fff5e9 !important;
    border-color: #bf5c18 !important;
  }
  .btn-secondary:not(:disabled):not(.disabled):active:focus,
  .btn-secondary:not(:disabled):not(.disabled).active:focus
  .show > .btn-secondary.dropdown-toggle:focus {
    box-shadow: none !important;
  }
  .colJuntitasMenus {
    padding-right: 0px;
  }
  div.scrollmenu {
    width: 100%;
    overflow-x: scroll;
    white-space: nowrap;
  }
</style>
