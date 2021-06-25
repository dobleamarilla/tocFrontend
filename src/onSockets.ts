import { io } from "socket.io-client";
import { useStore } from "vuex";
const store = useStore();
const socket = io("http://localhost");

socket.on("finalDescargarAllData", ()=>{
    store.dispatch("toast", 'Final instalación licencia Ou yeah');
});