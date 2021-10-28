import axios from "axios";
const baseURL = 'http://localhost:3000/';

class tocGameV3 {
    parametros = null;

    constructor() {
        axios.post(baseURL + 'parametros/getParametros').then((res) => {
            if (res.data.error === false) {
                this.parametros = res.data.parametros;
            } else {
                throw "Error en parametros/getParametros";
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    getParametros() { return this.parametros };

    hayFichados() {
        return axios.post(baseURL + 'trabajadores/getTrabajadoresFichados').then((res) => {
            if (res.data.error == false) {
                if (res.data.res.length > 0) {
                    return true;
                }
                return false;
            } else {
                alert('Error en tocGame.js - AXIOS trabajadores/getTrabajadoresFichados');
                return false;
            }
        }).catch((err) => {
            console.log(err);
            return false;
        });
    }

    cajaAbierta() {
        return axios.post(baseURL + 'caja/estadoCaja').then((res) => {
            if (res.data.error == false) {
                return res.data.abierta;
            } else {
                console.log(res.data.mensaje);
                return false;
            }
        }).catch((err) => {
            console.log(err);
            return false;
        });
    }
}



export const tocGame = new tocGameV3();