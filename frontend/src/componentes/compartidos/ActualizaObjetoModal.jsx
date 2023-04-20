import { useState } from 'react'
import './ActualizaObjetoModal.css'

import Imagen404 from '../../assets/imagen404.png'


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function formateaEstadoObjeto(estado_objeto) {
    if (estado_objeto == 'en deposito') return 'En depósito';
    return capitalizeFirstLetter(estado_objeto);
}

function ActualizaObjetoModal({objeto}) {
  
  return (
        <></>
  )
}

export default ActualizaObjetoModal
