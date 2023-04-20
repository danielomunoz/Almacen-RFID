import { useState } from 'react'
import './BorraObjetoModal.css'

import axios from 'axios'


function BorraObjetoModal({objeto, nuevoObjetoRegistrado}) {

    const borraObjeto = () => {
        axios.delete(`http://127.0.0.1:8000/api/objeto/${objeto.id}`)
            .then(res => {
                if (res.data.ok){
                    alert(`Objeto borrado con éxito`);           
                    nuevoObjetoRegistrado(true);
                } else {
                    alert(`No se pudo borrar el objeto`);
                }
            })
            .catch(err => {
                console.log();(err.message);
            });
    }
  
  return (
    <div className="modal fade" id="borraObjetoModal" tabIndex="-1" aria-labelledby="borraObjetoModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="borraObjetoModalLabel">¿Está seguro de que desea borrar este objeto?</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => borraObjeto()}>Sí, continuar</button>
            </div>
            </div>
        </div>
    </div>
  )
}

export default BorraObjetoModal
