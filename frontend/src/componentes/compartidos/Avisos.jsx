import { useState, useEffect, useRef } from 'react'

import axios from 'axios'

import './Avisos.css'

import avisosServicios from '../../servicios/Avisos.servicios'

import DetalleObjetoModal from '../compartidos/DetalleObjetoModal'
import DetallePersonaModal from '../compartidos/DetallePersonaModal'

function parseStringToDate(string) {
  let mydate = new Date(string);
  return `${mydate.toLocaleDateString()}  ${(mydate.getHours() > 9) ? mydate.getHours() : '0' + mydate.getHours()}:${(mydate.getMinutes() > 9) ? mydate.getMinutes() : '0' + mydate.getMinutes()}:${(mydate.getSeconds() > 9) ? mydate.getSeconds() : '0' + mydate.getSeconds()}`;
}


function Avisos({activeTag, personasSinRegistrar, objetosSinRFID, setActiveTag}) {

  const [indicePersona, setIndicePersona] = useState(0);
  const [objetosSeleccionados, setObjetosSeleccionados] = useState([]);
  const intervalRef = useRef(null);

  const darDeAltaPersona = (indice) => {
    axios.get(`http://127.0.0.1:8000/api/solicitudRegistro`)
      .then(res => {
        if (res.data.payload.length != 0){
          alert('Este detector ya tiene solicitudes de registro en curso. Debes esperar a que quede libre para poder realizar tu registro');
          return;
        }
        axios.post(`http://127.0.0.1:8000/api/solicitudRegistro`, {
          tipo: 'persona',
          persona: personasSinRegistrar[indice].id
        },
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
          .then(res => {
            console.log(res.data);
            alert('Solicitud de registro creada! Esperando a que el detector registre el código RFID de la persona, id: ' + personasSinRegistrar[indice].id);
            intervalRef.current = setInterval(() => {
              axios.get(`http://127.0.0.1:8000/api/solicitudRegistro`)
                .then(res => {
                  console.log('Comprobando si llegó un código al detector');
                  if (res.data.payload.length == 0){
                    alert('Código RFID correctamente registrado :)');
                    axios.put(`http://127.0.0.1:8000/api/persona/${personasSinRegistrar[indice].id}`, {
                      alta_confirmada: true
                    },
                    {
                      headers: {
                        "Content-Type": "multipart/form-data"
                      }
                    })
                      .then(res => {
                        alert('Persona dada de alta satisfactoriamente!');
                        clearInterval(intervalRef.current);
                        intervalRef.current = null;
                      })
                      .catch(err => console.log(err));
                  }
                })
                .catch(err => console.log(err));
            }, 2000);
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }

  const darDeAltaObjetos = async () => {
    try {
      let hay_solicitudes_abiertas = await avisosServicios.haySolicitudesAbiertas();
      if (hay_solicitudes_abiertas) {
        alert('Este detector ya tiene solicitudes de registro en curso. Debes esperar a que quede libre para poder realizar tu registro');
        return;
      }
      for (let i = 0; i < objetosSeleccionados.length; i++){
        let body = {
          tipo: 'objeto',
          objeto: objetosSinRFID[objetosSeleccionados[i]].id
        }
        if (i==0) body.batch = objetosSeleccionados.length;
        await avisosServicios.solicitudRegistroObjeto(body);
      }
      alert('Solicitudes de registro creadas! Esperando a que el Detector reciba los códigos RFID de los distintos objetos');
      intervalRef.current = setInterval(async () => {
        console.log('Comprobando registro del RFID de los objetos');
        let hay_solicitudes_abiertas = await avisosServicios.haySolicitudesAbiertas();
        if (!hay_solicitudes_abiertas) {
          alert('Códigos RFID de los objetos registrados satisfactoriamente!');
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          setObjetosSeleccionados([]);
          return;
        }
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <div className="avisos-container">
        <nav>
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
                <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true" onClick={() => setActiveTag('personas')}>Registro de nuevos usuarios</button>
                <button className="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false" onClick={() => setActiveTag('objetos')}>Objetos sin código RFID asignado</button>
            </div>
            {(activeTag == 'objetos') && <button className='btn btn-warning' onClick={() => darDeAltaObjetos()}>Dar de alta</button>}
        </nav>
        <div className="tab-content" id="nav-tabContent">
            <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
              <div className='tabla-avisos-registros-container'>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Persona</th>
                            <th scope="col">Fecha</th>
                            <th scope="col" className='th-seleccion'>Registrar RFID</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                      personasSinRegistrar.map((persona, indice) => {
                        return (
                          <tr key={persona + indice}>
                            <th scope="row">{indice + 1}</th>
                            <td className="pulsable" data-bs-toggle="modal" data-bs-target="#verPersonaModal" onClick={() => setIndicePersona(indice)}>{persona.nombre}</td>
                            <td>{parseStringToDate(persona.fecha_registro)}</td>
                            <td>
                              <button className='btn btn-warning' onClick={() => darDeAltaPersona(indice)}>Dar de alta</button>
                            </td>
                          </tr>
                        )
                      })
                    }
                    </tbody>
                </table>
              </div>
            </div>
            <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
              <div className='tabla-objetos-rfid-container'>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Objeto</th>
                            <th scope="col">Fecha</th>
                            <th scope="col" className='th-seleccion'>
                              {
                                (personasSinRegistrar.length > 0)
                                &&
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="true" id="flexCheckChecked" checked={[...Array(objetosSinRFID.length).keys()].every(i => objetosSeleccionados.includes(i))} onChange={(e) => ((e.target.checked) ? setObjetosSeleccionados([...Array(objetosSinRFID.length).keys()]) : setObjetosSeleccionados([]))} />
                                </div>
                              }
                              Seleccionar
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                      objetosSinRFID.map((objeto, indice) => {
                        return (
                          <tr key={objeto + indice}>
                            <th scope="row">{indice + 1}</th>
                            <td className="pulsable" data-bs-toggle="modal" data-bs-target="#verObjetoModal" onClick={() => console.log('jeje')}>{objeto.nombre}</td>
                            <td>{parseStringToDate(objeto.fecha_alta)}</td>
                            <td>
                              <div className="form-check">
                                  <input className="form-check-input" type="checkbox" value="false" id="flexCheckChecked" checked={objetosSeleccionados.includes(indice)} onChange={(e) => ((e.target.checked) ? setObjetosSeleccionados(prevArray => [...prevArray, indice]) : setObjetosSeleccionados(objetosSeleccionados.filter(item => item != indice)))} />
                              </div>
                            </td>
                          </tr>
                        )
                      })
                    }
                    </tbody>
                </table>
              </div>
            </div>
        </div>
        { (objetosSinRFID.length > 0) && <DetalleObjetoModal objeto={objetosSinRFID[0]} />}
        { (personasSinRegistrar.length > 0) && <DetallePersonaModal persona={personasSinRegistrar[indicePersona]} />}
    </div>
  )
}

export default Avisos
