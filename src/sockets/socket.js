const io = require('socket.io-client');
const socket = io('http://localhost:3000');
import store from '../store/index';
import router from '../router/index';
import { useToast } from "vue-toastification";

const toast = useToast();

socket.emit('test', 'andate a la concha de tu madre');

socket.on('resDatafono', (data) => {
    console.log(data);
});

socket.on('resConsultaPuntos', (data) => {
  if (data.error == false) {
    toast.info(`Puntos del cliente: ${data.info}`);
  } else {
    toast.error(data.mensaje);
  }
});

socket.on('resDatafono', (data) => {
    store.dispatch('setEsperandoDatafono', false);
    if (data.error == false) {
      store.dispatch('setModoActual', 'NORMAL');
      store.dispatch('Clientes/resetClienteActivo');
      store.dispatch('Footer/resetMenuActivo');
      router.push({ name: 'Home', params: { tipoToast: 'success', mensajeToast: 'Ticket creado' } });
    } else {
      toast.error(data.mensaje);
    }
});

export { socket };