import { useState } from 'react'
import './CartaObjeto.css'

import Imagen404 from '../../assets/imagen404.png'


function CartaObjeto({objeto, indice, objetoPulsado}) {

  
  return (
    <div className="col">
      <div className="card shadow-sm">
        <div className='card-titulo'>
          <span>{objeto.nombre}</span>
        </div>
        <div className='card-imagen'>
          <img src={(objeto.imagen != null) ? objeto.imagen : Imagen404}
               alt="Imagen del objeto"
               className="img-thumbnail" />
        </div>
        <div className="card-body">
          <p className="card-text">{objeto.descripcion}</p>
          <div className="d-flex justify-content-between align-items-center">
            <button type="button"
                    className="btn btn-sm btn-outline-warning"
                    data-bs-toggle="modal"
                    data-bs-target="#verObjetoModal"
                    onClick={() => objetoPulsado(indice)}>Ver detalle</button>
            <small className="text-muted">Familia: {objeto.familia}</small>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartaObjeto
