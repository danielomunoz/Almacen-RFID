import { useState, useRef } from 'react'
import './ReplicaObjetoModal.css'

import axios from 'axios'



function ReplicaObjetoModal({objeto, nuevoObjetoRegistrado}) {

    const numeroAReplicar = useRef(null);

    const replicaObjeto = () => {
        if (Math.floor(numeroAReplicar.current.value) < 1 ) {
            alert('Debe indicar un número positivo de réplicas');
            return;
        }
        for (let i = 0; i < Math.floor(numeroAReplicar.current.value); i++){
            axios.post(`http://127.0.0.1:8000/api/objeto/clonar/${objeto.id}`, {})
                .then(res => {
                    if (res.data.ok){
                        alert(`Réplica ${i+1} del objeto creada con éxito`);
                        // TODO: HACER SÍNCRONO ESTE PROCESO
                        if (i === (Math.floor(numeroAReplicar.current.value) - 1)){
                            nuevoObjetoRegistrado(true);
                            numeroAReplicar.current.value = null;
                        }
                    } else {
                        alert(`No se pudo crear la réplica ${i+1} del objeto`);
                    }
                })
                .catch(err => {
                    console.log();(err.message);
                });
        }
    }
  
  return (
    <div className="modal fade" id="replicaObjetoModal" tabIndex="-1" aria-labelledby="replicaObjetoModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="replicaObjetoModalLabel">Replicar objeto</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <div className='mb-3'>
                    <label htmlFor="exampleFormControlInput1" className="form-label">¿Cuántas veces desea replicar este objeto?</label>
                    <input type="number" className="form-control" id="exampleFormControlInput1" placeholder="0" autoComplete='off' ref={numeroAReplicar} />
                </div>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                <button type="button" className="btn btn-warning" data-bs-dismiss="modal" onClick={() => replicaObjeto()}>Replicar</button>
            </div>
            </div>
        </div>
    </div>
  )
}

export default ReplicaObjetoModal
