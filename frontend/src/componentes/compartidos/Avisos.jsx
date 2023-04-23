import { useState, useEffect } from 'react'

import axios from 'axios'

import './Avisos.css'

import DetalleObjetoModal from '../compartidos/DetalleObjetoModal'
import DetallePersonaModal from '../compartidos/DetallePersonaModal'

function parseStringToDate(string) {
  let mydate = new Date(string);
  return `${mydate.toLocaleDateString()} - ${mydate.getHours()}:${mydate.getMinutes()}:${mydate.getSeconds()}`;
}


function Avisos({}) {

  const [personasSinRegistrar, setPersonasSinRegistrar] = useState([]);
  const [objetosSinRFID, setObjetosSinRFID] = useState([]);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/persona?alta=false`)
      .then(res => {
        setPersonasSinRegistrar(res.data.payload);
      })
      .catch(err => console.log(err));

    axios.get(`http://127.0.0.1:8000/api/objeto?codigo_rfid=`)
      .then(res => {
        setObjetosSinRFID(res.data.payload);
      })
      .catch(err => console.log(err));
  }, []);
  
  return (
    <div className="avisos-container">
        <nav>
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
                <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Registro de nuevos usuarios</button>
                <button className="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Objetos sin código RFID asignado</button>
            </div>
            <button className='btn btn-warning'>Dar de alta</button>
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
                            <th scope="col" className='th-seleccion'>
                              {
                                (personasSinRegistrar.length > 0)
                                &&
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="true" id="flexCheckChecked" onChange={() => console.log('jeje')} />
                                </div>
                              }
                              Seleccionar
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                      personasSinRegistrar.map((persona, indice) => {
                        return (
                          <tr key={persona + indice}>
                            <th scope="row">{indice + 1}</th>
                            <td className="pulsable" data-bs-toggle="modal" data-bs-target="#verPersonaModal" onClick={() => console.log('jeje')}>{persona.nombre}</td>
                            <td>{parseStringToDate(persona.fecha_registro)}</td>
                            <td>
                              <div className="form-check">
                                  <input className="form-check-input" type="checkbox" value="false" id="flexCheckChecked" onChange={() => console.log('jeje')} />
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
                                    <input className="form-check-input" type="checkbox" value="true" id="flexCheckChecked" onChange={() => console.log('jeje')} />
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
                                  <input className="form-check-input" type="checkbox" value="false" id="flexCheckChecked" onChange={() => console.log('jeje')} />
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
        { (personasSinRegistrar.length > 0) && <DetallePersonaModal persona={personasSinRegistrar[0]} />}
    </div>
  )
}

export default Avisos
