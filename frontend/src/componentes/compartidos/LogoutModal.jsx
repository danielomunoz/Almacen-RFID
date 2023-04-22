import { useState } from 'react'
import './LogoutModal.css'

import axios from 'axios'


function LogoutModal() {

  const cerrarSesion = () => {
    axios.delete(`http://127.0.0.1:8000/api/sesion/${localStorage.getItem("sesion_token")}`)
      .then(() => {
        localStorage.removeItem("sesion_token");
        location.reload();
      })
      .catch(err => console.log(err))
  }
  
  return (
    <div className="modal fade" id="logoutModal" tabIndex="-1" aria-labelledby="logoutModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="logoutModalLabel">¿Está seguro?</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                <button type="button" className="btn btn-danger" onClick={() => cerrarSesion()}>Sí, cerrar sesión</button>
            </div>
            </div>
        </div>
    </div>
  )
}

export default LogoutModal
