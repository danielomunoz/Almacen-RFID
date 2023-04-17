import { useState, useRef } from 'react'
import axios from 'axios'

import './RegistrarObjetoModal.css'

function RegistrarObjetoModal({nuevoObjetoRegistrado}) {

    const nombre = useRef(null);
    const descripcion = useRef(null);
    const familia = useRef(null);
    const categoria = useRef(null);
    const subcategoria = useRef(null);
    const numero_serie = useRef(null);
    const propietario = useRef(null);
    const localizacion = useRef(null);
    const codigo_rfid = useRef(null);
    const estado_objeto = useRef(null);
    const imagen = useRef(null);

    const formRef = useRef(null);
    
    const boton_cerrar = useRef(null);

    const registraObjeto = () => {

        if (imagen.current.files.length === 0){
            alert('Es necesario subir una imagen para el objeto');
            return;
        }

        if (nombre.current.value === '') {
            alert('El nombre no puede ser un valor en blanco');
            return;
        }
        if (descripcion.current.value === '') {
            alert('La descripcion no puede ser un valor en blanco');
            return;
        }
        if (propietario.current.value === '') {
            alert('El código rfid del propietario no puede ser un valor en blanco');
            return;
        }
        if (localizacion.current.value === '') {
            alert('La localización no puede ser un valor en blanco');
            return;
        }
        if (codigo_rfid.current.value === '') {
            alert('El código rfid del objeto no puede ser un valor en blanco');
            return;
        }

        const body = {
            nombre: nombre.current.value,
            descripcion: descripcion.current.value,
            familia: familia.current.value,
            categoria: categoria.current.value,
            subcategoria: subcategoria.current.value,
            numero_serie: numero_serie.current.value,
            propietario: propietario.current.value,
            localizacion: localizacion.current.value,
            codigo_rfid: codigo_rfid.current.value,
            imagen: imagen.current.files[0],
        };

        (estado_objeto.current.value != "0") ? body.estado_objeto = estado_objeto.current.value : null;

        axios.post("http://127.0.0.1:8000/api/objeto", body, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then(res => {
                console.log(res);
                if (res.data.ok){
                    alert('Objeto registrado satisfactoriamente');
                    nuevoObjetoRegistrado(true);
                    boton_cerrar.current.click();
                    formRef.current.reset();
                } else {
                    alert('El objeto no pudo ser registrado');
                }
            })
            .catch(err => {
                console.log(err);
                alert(err);
            });
    }
  
  return (
    <div className="modal fade" id="registroObjetoModal" tabIndex="-1" aria-labelledby="registroObjetoModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="registroObjetoModalLabel">Registro de Objeto</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <form ref={formRef}>
                    <div className='avatar mb-3'>
                        <input className="form-control" type="file" name="imagen" accept="image/jpeg,image/png,image/jpg,image/gif" ref={imagen} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="exampleFormControlInput1" className="form-label">Nombre</label>
                        <input type="email" className="form-control" id="exampleFormControlInput1" autoComplete="off" ref={nombre} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="exampleFormControlInput1" className="form-label">Descripción</label>
                        <input type="email" className="form-control" id="exampleFormControlInput1" autoComplete="off" ref={descripcion} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="exampleFormControlInput1" className="form-label">Familia</label>
                        <input type="email" className="form-control" id="exampleFormControlInput1" autoComplete="off" ref={familia} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="exampleFormControlInput1" className="form-label">Categoría</label>
                        <input type="email" className="form-control" id="exampleFormControlInput1" autoComplete="off" ref={categoria} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="exampleFormControlInput1" className="form-label">Subcategoría</label>
                        <input type="email" className="form-control" id="exampleFormControlInput1" autoComplete="off" ref={subcategoria} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="exampleFormControlInput1" className="form-label">Número de serie</label>
                        <input type="email" className="form-control" id="exampleFormControlInput1" autoComplete="off" ref={numero_serie} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="exampleFormControlInput1" className="form-label">Código RFID del Propietario del objeto</label>
                        <input type="email" className="form-control" id="exampleFormControlInput1" autoComplete="off" ref={propietario} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="exampleFormControlInput1" className="form-label">Localización</label>
                        <input type="email" className="form-control" id="exampleFormControlInput1" autoComplete="off" ref={localizacion} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="exampleFormControlInput1" className="form-label">Código RFID</label>
                        <input type="email" className="form-control" id="exampleFormControlInput1" autoComplete="off" ref={codigo_rfid} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="exampleFormControlInput1" className="form-label">Estado del objeto</label>
                        <select className="form-select" aria-label="Default select example" ref={estado_objeto}>
                            <option value="0">Seleccione uno de los posibles estados</option>
                            <option value="nuevo">Nuevo</option>
                            <option value="usado">Usado</option>
                            <option value="defectuoso">Defectuoso</option>
                        </select>
                    </div>
                </form>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={boton_cerrar}>Cerrar</button>
                <button type="button" className="btn btn-warning" onClick={() => registraObjeto()}>Registrar objeto</button>
            </div>
            </div>
        </div>
    </div>
  )
}

export default RegistrarObjetoModal
