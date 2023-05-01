
import axios from 'axios'

const avisosServicios = {
    haySolicitudesAbiertas: () => {
        return new Promise(async (resolve, reject) => {
            try {
                const respuesta = await axios.get(`http://127.0.0.1:8000/api/solicitudRegistro`);
                resolve((respuesta.data.payload.length == 0) ? false : true);   
            } catch (error) {
                console.log(error);
                reject(error);
            }
        });
    },
    solicitudRegistroObjeto : (body) => {
        return new Promise(async (resolve, reject) => {
            try {
                const respuesta = await axios.post(`http://127.0.0.1:8000/api/solicitudRegistro`, body, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });
                resolve(respuesta.data.payload);
            } catch (error) {
                console.log(error);
                reject(error);
            }
        });
    }
}

export default avisosServicios;
