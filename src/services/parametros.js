import axios from "axios";
const baseURL = 'http://localhost:3000/';
class ParametrosClass {
    parametros = null;

    constructor() {
        axios.post(baseURL + 'parametros/getParametros').then((res) => {
            if (res.data.error === false) {
                this.parametros = res.data.parametros;
            } else {
                throw "Error en parametros/getParametros";
            }
        });
    }

    getParametros() { return this.parametros };
}

export const parametros = new ParametrosClass();