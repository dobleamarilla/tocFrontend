<template v-if='true'>
  <div class="row ms-4 align-items-center">
    <div class="col">
      <div class="row">
        <div class="table-responsive">
        <!-- <table class="table table-striped table-responsive overflow-auto">
              <thead>
                <tr>
                    <th scope="col">Número ticket</th>
                    <th scope="col">Hora</th>
                    <th scope="col">Forma de pago</th>
                    <th scope="col">Total ({{total}} €)</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) of listaTickets" v-bind:key={index}
                @click="setTicketActivo(index)"
                style="max-height: 60px;"
                v-bind:class="{estiloActivoTicketCaja: index === activo}"
                >
                    <td style="text-align: center">{{item._id}}</td>
                    <td>
                      {{item.timestamp}}
                      </td>
                    <td>{{item.tipoPago}}</td>
                    <td>{{item.total.toFixed(2)}} €</td>
                </tr>
            </tbody>
        </table> -->
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Número ticket</th>
              <th scope="col">Hora</th>
              <th scope="col">Forma de pago</th>
              <th scope="col">Total ({{total.toFixed(2)}} €)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) of listaTickets" v-bind:key={index}
            @click="setTicketActivo(index)"
            v-bind:class="{estiloActivoTicketCaja: index === activo}"
            >
                <td style="text-align: center">{{item._id}}</td>
                <td>
                  {{moment.unix(item.timestamp / 1000).format('DD/MM/YYYY hh:mm:ss')}}
                  </td>
                <td>{{item.tipoPago}}</td>
                <td>{{item.total.toFixed(2)}} €</td>
            </tr>
          </tbody>
        </table>
        </div>
      </div>
      <br />
      <div class="row ms-5">
        <div class="col">
          <button type="button" class="btn btn-secondary
           botonesPrincipales w-100 btn-block botonesWidth"
          data-bs-toggle="modal" data-bs-target="#vueModalClausura">
            <i class="bi bi-lock-fill iconosBootstrap"></i>
          </button>
        </div>
        <div class="col">
          <button
          @click="goTo('/abrirCaja')"
          type="button" class="btn btn-secondary
           botonesPrincipales w-100 btn-block botonesWidth">            <i class="bi bi-unlock-fill iconosBootstrap"></i>
          </button>
        </div>
        <div class="col">
          <button type="button" class="btn btn-secondary
           botonesPrincipales w-100 btn-block botonesWidth"
          data-bs-toggle="modal" data-bs-target="#modalSalidaDinero">
            <i class="bi bi-box-arrow-right iconosBootstrap"></i>
          </button>
        </div>
        <div class="col">
          <button
          @click="imprimirTicket()"
          type="button" class="btn btn-secondary
           botonesPrincipales w-100 btn-block botonesWidth">
            <i class="bi bi-printer-fill iconosBootstrap"></i>
          </button>
        </div>
        <div class="col">
          <button type="button" class="btn btn-secondary
           botonesPrincipales w-100 btn-block botonesWidth"
          data-bs-toggle="modal" data-bs-target="#modalEntradaDinero">
            <i class="bi bi-box-arrow-in-right iconosBootstrap"></i>
          </button>
        </div>
      </div>
    </div>
    <div v-if="ticketInfo != null" class="col">
      <DetalleTicket :ticket="ticketInfo" />
    </div>
  </div>
  <CerrarCaja />
  <SalidaDinero />
  <EntradaDinero />
</template>

<script>
import { ref, onMounted } from 'vue';
import DetalleTicket from '@/components/DetalleTicket.vue';
import CerrarCaja from '@/components/CerrarCaja.vue';
import SalidaDinero from '@/components/SalidaDinero.vue';
import EntradaDinero from '@/components/EntradaDinero.vue';
import axios from 'axios';
import moment from 'moment';
import { useStore } from 'vuex';
import router from '../router/index';

export default {
  name: 'Caja',
  setup() {
    const activo = ref(null);
    const total = ref(0);
    const listaTickets = ref([]);
    const ticketInfo = ref(null);
    const store = useStore();

    function setTicketActivo(index) {
      ticketInfo.value = listaTickets.value[index];
      activo.value = index;
    }

    function goTo(url) {
      router.push(url);
    }

    function imprimirTicket() {
      if (activo.value != null) {
        axios.post('impresora/imprimirTicket', { idTicket: listaTickets.value[activo.value]._id });
      } else {
        console.log('Primero selecciona un ticket');
      }
    }

    onMounted(() => {
      axios.post('tickets/getTicketsIntervalo').then((arrayTickets) => {
        total.value = 0;
        for (let i = 0; i < arrayTickets.data.length; i += 1) {
          total.value += arrayTickets.data[i].total;
        }
        listaTickets.value = arrayTickets.data;
      });
    });
    return {
      goTo,
      listaTickets,
      setTicketActivo,
      activo,
      total,
      moment,
      ticketInfo,
      imprimirTicket,
    };
    /* FINAL SETUP */
  },
  components: {
    DetalleTicket,
    CerrarCaja,
    SalidaDinero,
    EntradaDinero,
  },
};
</script>
<style scoped>
  .table-responsive {
    height: 80vh;
  }
  .estiloActivoTicketCaja {
    background-color:rgb(255, 221, 176) !important;
  }
  .iconosBootstrap {
    font-size: 30px;
  }
  .botonesWidth {
    width: 5vw;
    border: solid black 1px;
  }

  .botonesPrincipales{
    background-color: #fff5e9;
    color: #c95907;
    border-color: #bf5c18;
    border-width: 3px;
}
</style>
