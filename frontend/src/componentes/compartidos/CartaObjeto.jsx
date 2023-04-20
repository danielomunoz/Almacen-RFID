import { useState } from 'react'
import './CartaObjeto.css'

import Imagen404 from '../../assets/imagen404.png'


function CartaObjeto({objeto, indice, userRol, objetoPulsado}) {

  
  return (
    <div className="col">
      <div className="card shadow-sm">
        <div className='card-titulo' data-bs-toggle="modal" data-bs-target="#verObjetoModal"onClick={() => objetoPulsado(indice)}>
          <span>{objeto.nombre}</span>
        </div>
        <div className='card-imagen' data-bs-toggle="modal" data-bs-target="#verObjetoModal" onClick={() => objetoPulsado(indice)}>
          <img src={(objeto.imagen != null) ? objeto.imagen : Imagen404}
               alt="Imagen del objeto"
               className="img-thumbnail" />
        </div>
        <div className="card-body">
          <p className="card-text" data-bs-toggle="modal" data-bs-target="#verObjetoModal" onClick={() => objetoPulsado(indice)}>{objeto.descripcion}</p>
          <div className="d-flex justify-content-between align-items-center">
            {
              (userRol == 'alumno')
              &&
              <>
                <button type="button"
                    className="btn btn-sm btn-outline-warning"
                    data-bs-toggle="modal"
                    data-bs-target="#verObjetoModal"
                    onClick={() => objetoPulsado(indice)}>Ver detalle</button>
                <small className="text-muted">Familia: {objeto.familia}</small>
              </>
            }
            {
              (userRol == 'profesor')
              &&
              <>
                <button type="button"
                    className="btn btn-sm btn-outline-secondary"
                    data-bs-toggle="modal"
                    data-bs-target="#replicaObjetoModal"
                    onClick={() => objetoPulsado(indice)}>Replicar</button>
                <button type="button"
                    className="btn btn-sm btn-outline-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#actualizaObjetoModal"
                    onClick={() => objetoPulsado(indice)}>Actualizar</button>
                <button type="button"
                    className="btn btn-sm btn-outline-danger"
                    data-bs-toggle="modal"
                    data-bs-target="#borraObjetoModal"
                    onClick={() => objetoPulsado(indice)}>Borrar</button>
              </>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartaObjeto
