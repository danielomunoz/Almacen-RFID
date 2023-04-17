import { useState } from 'react'
import './RastreoFila.css'


function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function parseStringToDate(string) {
  let mydate = new Date(string);
  return `${mydate.toLocaleDateString()}  ${mydate.getHours()}:${mydate.getMinutes()}:${mydate.getSeconds()}`;
}


function RastreoFila({accion, indice, accionPulsada}) {

  return (
    <tr>
      <th scope="row">{indice + 1}</th>
      <td>{capitalizeFirstLetter(accion.tipo)}</td>
      <td className="pulsable" data-bs-toggle="modal" data-bs-target="#verObjetoModal" onClick={() => accionPulsada(indice)}>{accion.objeto.nombre}</td>
      <td className="pulsable" data-bs-toggle="modal" data-bs-target="#verPersonaModal" onClick={() => accionPulsada(indice)}>{accion.persona.nombre}</td>
      <td>{parseStringToDate(accion.fecha)}</td>
    </tr>
  )
}

export default RastreoFila
