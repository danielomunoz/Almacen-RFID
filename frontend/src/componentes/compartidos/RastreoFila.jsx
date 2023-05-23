import { useState } from 'react'
import './RastreoFila.css'


function capitalizeFirstLetter(string) {
  if (string == undefined || string == null || string.length == 0) return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function parseStringToDate(string) {
  let mydate = new Date(string);
  return `${mydate.toLocaleDateString()}  ${(mydate.getHours() > 9) ? mydate.getHours() : '0' + mydate.getHours()}:${(mydate.getMinutes() > 9) ? mydate.getMinutes() : '0' + mydate.getMinutes()}:${(mydate.getSeconds() > 9) ? mydate.getSeconds() : '0' + mydate.getSeconds()}`;
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
