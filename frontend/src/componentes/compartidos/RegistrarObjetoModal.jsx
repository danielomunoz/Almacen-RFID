import { useState, useRef, useEffect } from 'react'
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
    const estado_objeto = useRef(null);
    const imagen = useRef(null);

    const formRef = useRef(null);
    
    const boton_cerrar = useRef(null);

    const [numCopias, setNumCopias] = useState(1);
    const [indiceCopias, setIndiceCopias] = useState(0);
    const [bodyObjetos, setBodyObjetos] = useState([{
        nombre: '',
        descripcion: '',
        familia: '',
        categoria: '',
        subcategoria: '',
        numero_serie: '',
        estado_en_almacen: 'en deposito',
        propietario: '',
        localizacion: '',
        imagen: null,
        estado_objeto: '',
    }]);

    const aumentaNumCopia = () => {
        setBodyObjetos(bodyObjetos => [...bodyObjetos, bodyObjetos[indiceCopias]]);
        setNumCopias(numCopias + 1);
    };

    const borraCopias = () => {
        if (numCopias == 1) return;
        setNumCopias(1);
        setBodyObjetos([bodyObjetos[indiceCopias]]);
        setIndiceCopias(0);
    }

    const aumentaIndiceCopia = () => {
        if (indiceCopias == (numCopias - 1)) return;
        setIndiceCopias(indiceCopias + 1);
    }

    const disminuyeIndiceCopia = () => {
        if (indiceCopias == 0) return;
        setIndiceCopias(indiceCopias - 1);
    }

    const actualizaBodyObjetos = () => {
        let auxBodyObjetos = [...bodyObjetos];
        auxBodyObjetos[indiceCopias] = {
            nombre: (nombre.current.value != undefined) ? nombre.current.value : '',
            descripcion: (descripcion.current.value != undefined) ? descripcion.current.value : '',
            familia: (familia.current.value != undefined) ? familia.current.value : '',
            categoria: (categoria.current.value != undefined) ? categoria.current.value : '',
            subcategoria: (subcategoria.current.value != undefined) ? subcategoria.current.value : '',
            numero_serie: (numero_serie.current.value != undefined) ? numero_serie.current.value : '',
            estado_en_almacen: 'en deposito',
            propietario: (propietario.current.value != undefined) ? propietario.current.value : '',
            localizacion: (localizacion.current.value != undefined) ? localizacion.current.value : '',
            estado_objeto: (estado_objeto.current.value != "0") ? estado_objeto.current.value : null,
        };
        if (imagen.current.files.length != 0){
            auxBodyObjetos[indiceCopias].imagen = imagen.current.files[0];
            imagen.current.value = '';
        } else {
            auxBodyObjetos[indiceCopias].imagen = bodyObjetos[indiceCopias].imagen;
        }
        setBodyObjetos(auxBodyObjetos);
    }

    const registraObjetos = () => {

        for (let i = 0; i < numCopias; i++){

            if (bodyObjetos[i].imagen == null){
                alert(`Es necesario subir una imagen para el objeto ${i+1}`);
                return;
            }
            if (bodyObjetos[i].nombre == '') {
                alert(`El nombre del objeto ${i+1} no puede ser un valor en blanco`);
                return;
            }
            if (bodyObjetos[i].descripcion == '') {
                alert(`La descripción del objeto ${i+1} no puede ser un valor en blanco`);
                return;
            }
            if (bodyObjetos[i].propietario == '') {
                alert(`El código RFID del propietario del objeto ${i+1} no puede ser un valor en blanco`);
                return;
            }
            if (bodyObjetos[i].localizacion == '') {
                alert(`La localización del objeto ${i+1} no puede ser un valor en blanco`);
                return;
            }

        }

        for (let i = 0; i < numCopias; i++){

            axios.post("http://127.0.0.1:8000/api/objeto", bodyObjetos[i], {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
                .then(res => {
                    if (res.data.ok){
                        alert(`Objeto ${i+1} registrado satisfactoriamente`);
                        if (i === (numCopias - 1)){
                            nuevoObjetoRegistrado(true);
                            boton_cerrar.current.click();
                            borraCopias();
                            setBodyObjetos([{
                                nombre: '',
                                descripcion: '',
                                familia: '',
                                categoria: '',
                                subcategoria: '',
                                numero_serie: '',
                                estado_en_almacen: 'en deposito',
                                propietario: '',
                                localizacion: '',
                                imagen: null,
                                estado_objeto: '',
                            }]);
                            formRef.current.reset();
                        }
                    } else {
                        alert('El objeto no pudo ser registrado');
                    }
                })
                .catch(err => {
                    console.log(err);
                    alert(err);
                });

        }

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
                    <div className="copias-container">
                        <div className="copias-buttons-container">
                            <button type="button" className="btn btn-warning btn-sm" onClick={() => aumentaNumCopia()}>Copiar</button>
                            <button type="button" className="btn btn-danger btn-sm" onClick={() => borraCopias()}>Borrar copias</button>
                        </div>
                        <div className="copias-page-container">
                            <a className="page-link" tabIndex="-1" onClick={() => disminuyeIndiceCopia()}>&larr;</a>
                            <span>Objeto {indiceCopias + 1} de {numCopias}</span>
                            <a className="page-link" onClick={() => aumentaIndiceCopia()}>&rarr;</a>
                        </div>
                    </div>
                    <hr></hr>
                    <div className='avatar mb-3'>
                        <input className="form-control"
                               type="file"
                               name="imagen"
                               accept="image/jpeg,image/png,image/jpg,image/gif"
                               ref={imagen}
                               onChange={() => actualizaBodyObjetos()} />
                        <span>{(bodyObjetos[indiceCopias].imagen != null) ? `Imagen a adjuntar: ${bodyObjetos[indiceCopias].imagen.name}` : 'Sin imagen a adjuntar'}</span>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="exampleFormControlInput1" className="form-label">Nombre</label>
                        <input type="email"
                               className="form-control"
                               autoComplete="off"
                               ref={nombre}
                               value={bodyObjetos[indiceCopias].nombre}
                               onChange={() => actualizaBodyObjetos()} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="exampleFormControlInput1" className="form-label">Descripción</label>
                        <input type="email"
                               className="form-control"
                               autoComplete="off"
                               ref={descripcion}
                               value={bodyObjetos[indiceCopias].descripcion}
                               onChange={() => actualizaBodyObjetos()} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="exampleFormControlInput1" className="form-label">Familia</label>
                        <input type="email"
                               className="form-control"
                               autoComplete="off"
                               ref={familia}
                               value={bodyObjetos[indiceCopias].familia}
                               onChange={() => actualizaBodyObjetos()} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="exampleFormControlInput1" className="form-label">Categoría</label>
                        <input type="email"
                               className="form-control"
                               autoComplete="off"
                               ref={categoria}
                               value={bodyObjetos[indiceCopias].categoria}
                               onChange={() => actualizaBodyObjetos()} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="exampleFormControlInput1" className="form-label">Subcategoría</label>
                        <input type="email"
                               className="form-control"
                               autoComplete="off"
                               ref={subcategoria}
                               value={bodyObjetos[indiceCopias].subcategoria}
                               onChange={() => actualizaBodyObjetos()} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="exampleFormControlInput1" className="form-label">Número de serie</label>
                        <input type="email"
                               className="form-control"
                               autoComplete="off"
                               ref={numero_serie}
                               value={bodyObjetos[indiceCopias].numero_serie}
                               onChange={() => actualizaBodyObjetos()} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="exampleFormControlInput1" className="form-label">Código RFID del Propietario del objeto</label>
                        <input type="email"
                               className="form-control"
                               autoComplete="off"
                               ref={propietario}
                               value={bodyObjetos[indiceCopias].propietario}
                               onChange={() => actualizaBodyObjetos()} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="exampleFormControlInput1" className="form-label">Localización</label>
                        <input type="email"
                               className="form-control"
                               autoComplete="off"
                               ref={localizacion}
                               value={bodyObjetos[indiceCopias].localizacion}
                               onChange={() => actualizaBodyObjetos()} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="exampleFormControlInput1" className="form-label">Estado del objeto</label>
                        <select className="form-select" aria-label="Default select example"
                                ref={estado_objeto}
                                value={(bodyObjetos[indiceCopias].estado_objeto != null) ? bodyObjetos[indiceCopias].estado_objeto : '0'}
                                onChange={() => actualizaBodyObjetos()}>
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
                <button type="button" className="btn btn-warning" onClick={() => registraObjetos()}>Registrar</button>
            </div>
            </div>
        </div>
    </div>
  )
}

export default RegistrarObjetoModal
