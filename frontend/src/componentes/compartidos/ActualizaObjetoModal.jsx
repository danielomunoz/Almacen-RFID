import { useState, useRef } from 'react'
import './ActualizaObjetoModal.css'

import axios from 'axios'

import Imagen404 from '../../assets/imagen404.png'


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function formateaEstadoObjeto(estado_objeto) {
    if (estado_objeto == 'en deposito') return 'En depósito';
    return capitalizeFirstLetter(estado_objeto);
}

function ActualizaObjetoModal({objeto, nuevoObjetoRegistrado}) {

    const formRef = useRef(null);

    const nombre = useRef(null);
    const descripcion = useRef(null);
    const familia = useRef(null);
    const categoria = useRef(null);
    const subcategoria = useRef(null);
    const numero_serie = useRef(null);
    const propietario = useRef(null);
    const localizacion = useRef(null);
    const estado_objeto = useRef(null);
    const imagen = useRef(null);

    const actualizaObjeto = () => {
        let body = {};
        (nombre.current.value != undefined && nombre.current.value != "") ? body.nombre = nombre.current.value : null;
        (descripcion.current.value != undefined && descripcion.current.value != "") ? body.descripcion = descripcion.current.value : null;
        (familia.current.value != undefined && familia.current.value != "") ? body.familia = familia.current.value : null;
        (categoria.current.value != undefined && categoria.current.value != "") ? body.categoria = categoria.current.value : null;
        (subcategoria.current.value != undefined && subcategoria.current.value != "") ? body.subcategoria = subcategoria.current.value : null;
        (numero_serie.current.value != undefined && numero_serie.current.value != "") ? body.numero_serie = numero_serie.current.value : null;
        (propietario.current.value != undefined && propietario.current.value != "") ? body.propietario = propietario.current.value : null;
        (localizacion.current.value != undefined && localizacion.current.value != "") ? body.localizacion = localizacion.current.value : null;
        (estado_objeto.current.value != "0" && estado_objeto.current.value != "") ? body.estado_objeto = estado_objeto.current.value : null;
        (imagen.current.files.length != 0 && imagen.current.value != "") ? body.imagen = imagen.current.files[0] : null;
        
        axios.put(`http://127.0.0.1:8000/api/objeto/${objeto.id}`, body, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then(res => {
                if (res.data.ok){
                    alert(`Objeto actualizado satisfactoriamente`);
                    nuevoObjetoRegistrado(true);
                    formRef.current.reset();
                } else {
                    alert('El objeto no pudo ser actualizado');
                    console.log(res);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }
  
  return (
        <div className="modal fade" id="actualizaObjetoModal" tabIndex="-1" aria-labelledby="actualizaObjetoModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="actualizaObjetoModalLabel">Actualizar objeto</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <form ref={formRef}>
                        <div className='avatar mb-3'>
                            <img src={(objeto.imagen != undefined && objeto.imagen != null) ? objeto.imagen : Imagen404} alt="Mi imagen" className="img-thumbnail" />
                            <input className="form-control" type="file" name="imagen" accept="image/jpeg,image/png,image/jpg,image/gif" ref={imagen} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="exampleFormControlInput1" className="form-label">Nombre</label>
                            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder={objeto.nombre} ref={nombre} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="exampleFormControlInput1" className="form-label">Descripción</label>
                            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder={objeto.descripcion} ref={descripcion} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="exampleFormControlInput1" className="form-label">Familia</label>
                            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder={objeto.familia} ref={familia} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="exampleFormControlInput1" className="form-label">Categoría</label>
                            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder={objeto.categoria} ref={categoria} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="exampleFormControlInput1" className="form-label">Subcategoría</label>
                            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder={objeto.subcategoria} ref={subcategoria} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="exampleFormControlInput1" className="form-label">Número de serie</label>
                            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder={objeto.numero_serie} ref={numero_serie} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="exampleFormControlInput1" className="form-label">Código RFID del Propietario del objeto</label>
                            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder={objeto.propietario.codigo_rfid} ref={propietario} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="exampleFormControlInput1" className="form-label">Localización</label>
                            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder={objeto.localizacion} ref={localizacion} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="exampleFormControlInput1" className="form-label">Estado del objeto</label>
                            <select className="form-select" aria-label="Default select example"
                                    ref={estado_objeto}>
                                <option value="0">Seleccione uno de los posibles estados</option>
                                <option value="nuevo">Nuevo</option>
                                <option value="usado">Usado</option>
                                <option value="defectuoso">Defectuoso</option>
                            </select>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    <button type="button" className="btn btn-warning" data-bs-dismiss="modal" onClick={() => actualizaObjeto()}>Actualizar</button>
                </div>
                </div>
            </div>
        </div>
  )
}

export default ActualizaObjetoModal
