import { useState, useRef } from 'react'
import './FiltrosObjetosGridModal.css'


function FiltrosObjetosGridModal({actualizaFiltros, activeLink}) {

    const formRef = useRef(null);

    // Campos para el filtrado de objetos y mis objetos
    const soy_propietario = useRef(null);
    const soy_responsable = useRef(null);
    const nombre = useRef(null);
    const descripcion = useRef(null);
    const familia = useRef(null);
    const categoria = useRef(null);
    const subcategoria = useRef(null);
    const numero_serie = useRef(null);
    const estado_en_almacen = useRef(null);
    const fecha_registrado_desde = useRef(null);
    const fecha_registrado_hasta = useRef(null);
    const localizacion = useRef(null);
    const fecha_ultima_accion_desde = useRef(null);
    const fecha_ultima_accion_hasta = useRef(null);
    const codigo_rfid = useRef(null);
    const estado_objeto = useRef(null);

    // Campos para el filtrado de acciones (rastreo)
    const tipo = useRef(null);
    const nombre_objeto = useRef(null);
    const nombre_persona = useRef(null);
    const fecha_desde = useRef(null);
    const fecha_hasta = useRef(null);

    const aplicarFiltrosPulsado = () => {
        let filtros = '';

        (activeLink === '/mis-objetos' && soy_propietario.current.checked === true) ? filtros += `&soy_propietario=true` : null;
        (activeLink === '/mis-objetos' && soy_responsable.current.checked === true) ? filtros += `&soy_responsable=true` : null;

        (activeLink !== '/rastreo' && nombre.current.value !== '') ? filtros += `&nombre=${nombre.current.value}` : null;
        (activeLink !== '/rastreo' && descripcion.current.value !== '') ? filtros += `&descripcion=${descripcion.current.value}` : null;
        (activeLink !== '/rastreo' && familia.current.value !== '') ? filtros += `&familia=${familia.current.value}` : null;
        (activeLink !== '/rastreo' && categoria.current.value !== '') ? filtros += `&categoria=${categoria.current.value}` : null;
        (activeLink !== '/rastreo' && subcategoria.current.value !== '') ? filtros += `&subcategoria=${subcategoria.current.value}` : null;
        (activeLink !== '/rastreo' && numero_serie.current.value !== '') ? filtros += `&numero_serie=${numero_serie.current.value}` : null;
        (activeLink !== '/rastreo' && estado_en_almacen.current.value !== '0') ? filtros += `&estado_en_almacen=${estado_en_almacen.current.value}` : null;
        (activeLink !== '/rastreo' && fecha_registrado_desde.current.value !== '') ? filtros += `&fecha_registrado_desde=${fecha_registrado_desde.current.value}` : null;
        (activeLink !== '/rastreo' && fecha_registrado_hasta.current.value !== '') ? filtros += `&fecha_registrado_hasta=${fecha_registrado_hasta.current.value}` : null;
        (activeLink !== '/rastreo' && localizacion.current.value !== '') ? filtros += `&localizacion=${localizacion.current.value}` : null;
        (activeLink !== '/rastreo' && fecha_ultima_accion_desde.current.value !== '') ? filtros += `&fecha_ultima_accion_desde=${fecha_ultima_accion_desde.current.value}` : null;
        (activeLink !== '/rastreo' && fecha_ultima_accion_hasta.current.value !== '') ? filtros += `&fecha_ultima_accion_hasta=${fecha_ultima_accion_hasta.current.value}` : null;
        (activeLink !== '/rastreo' && codigo_rfid.current.value !== '') ? filtros += `&codigo_rfid=${codigo_rfid.current.value}` : null;
        (activeLink !== '/rastreo' && estado_objeto.current.value !== '0') ? filtros += `&estado_objeto=${estado_objeto.current.value}` : null;

        (activeLink === '/rastreo' && tipo.current.value !== '0') ? filtros += `&tipo=${tipo.current.value}` : null;
        (activeLink === '/rastreo' && nombre_objeto.current.value !== '') ? filtros += `&nombre_objeto=${nombre_objeto.current.value}` : null;
        (activeLink === '/rastreo' && nombre_persona.current.value !== '') ? filtros += `&nombre_persona=${nombre_persona.current.value}` : null;
        (activeLink === '/rastreo' && fecha_desde.current.value !== '') ? filtros += `&fecha_desde=${fecha_desde.current.value}` : null;
        (activeLink === '/rastreo' && fecha_hasta.current.value !== '') ? filtros += `&fecha_hasta=${fecha_hasta.current.value}` : null;

        actualizaFiltros(filtros.replace(' ', '%20'));
    }

    const borrarFiltros = () => {
        formRef.current.reset()
    }

    const compruebaCheckboxes = (ref) => {
        if (!soy_propietario.current.checked && !soy_responsable.current.checked) {
            alert('Debe seleccionar los objetos de los que usted es propietario y/o responsable');
            ref.current.checked = true;
        }
    }
  
  return (
    <div className="modal fade" id="filtrosModal" tabIndex="-1" aria-labelledby="filtrosModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="filtrosModalLabel">Filtros</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <form ref={formRef}>
                    { 
                        (activeLink === '/mis-objetos')
                        &&
                        <>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="true" id="flexCheckChecked" defaultChecked onChange={() => compruebaCheckboxes(soy_propietario)} ref={soy_propietario} />
                                <label className="form-check-label" htmlFor="flexCheckChecked">
                                    Soy propietario
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="true" id="flexCheckChecked" defaultChecked onChange={() => compruebaCheckboxes(soy_responsable)} ref={soy_responsable} />
                                <label className="form-check-label" htmlFor="flexCheckChecked">
                                    Soy responsable
                                </label>
                            </div>
                            <hr></hr>
                        </>
                    }
                    {
                        (activeLink === '/objetos' || activeLink === '/mis-objetos')
                        &&
                        <>
                            <div className='mb-3'>
                                <label htmlFor="exampleFormControlInput1" className="form-label">Nombre</label>
                                <input type="text" className="form-control" id="exampleFormControlInput1" autoComplete="off" ref={nombre} />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="exampleFormControlInput1" className="form-label">Descripción</label>
                                <input type="text" className="form-control" id="exampleFormControlInput1" autoComplete="off" ref={descripcion} />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="exampleFormControlInput1" className="form-label">Familia</label>
                                <input type="text" className="form-control" id="exampleFormControlInput1" autoComplete="off" ref={familia} />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="exampleFormControlInput1" className="form-label">Categoría</label>
                                <input type="text" className="form-control" id="exampleFormControlInput1" autoComplete="off" ref={categoria} />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="exampleFormControlInput1" className="form-label">Subcategoría</label>
                                <input type="text" className="form-control" id="exampleFormControlInput1" autoComplete="off" ref={subcategoria} />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="exampleFormControlInput1" className="form-label">Número de serie</label>
                                <input type="text" className="form-control" id="exampleFormControlInput1" autoComplete="off" ref={numero_serie} />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="exampleFormControlInput1" className="form-label">Estado en almacén</label>
                                <select className="form-select" aria-label="Default select example" ref={estado_en_almacen} >
                                    <option value="0">Seleccione según el estado en almacén</option>
                                    <option value="en%20deposito">En depósito</option>
                                    <option value="retirado">Retirado</option>
                                </select>
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="exampleFormControlInput1" className="form-label">Registrado desde (fecha incluída)</label>
                                <input type="date" className="form-control" id="exampleFormControlInput1" autoComplete="off" ref={fecha_registrado_desde} />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="exampleFormControlInput1" className="form-label">Registrado hasta (fecha no incluída)</label>
                                <input type="date" className="form-control" id="exampleFormControlInput1" autoComplete="off" ref={fecha_registrado_hasta} />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="exampleFormControlInput1" className="form-label">Localización</label>
                                <input type="text" className="form-control" id="exampleFormControlInput1" autoComplete="off" ref={localizacion} />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="exampleFormControlInput1" className="form-label">Código RFID</label>
                                <input type="text" className="form-control" id="exampleFormControlInput1" autoComplete="off" ref={codigo_rfid} />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="exampleFormControlInput1" className="form-label">Última acción desde (fecha incluída)</label>
                                <input type="date" className="form-control" id="exampleFormControlInput1" autoComplete="off" ref={fecha_ultima_accion_desde} />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="exampleFormControlInput1" className="form-label">Última acción hasta (fecha no incluída)</label>
                                <input type="date" className="form-control" id="exampleFormControlInput1" autoComplete="off" ref={fecha_ultima_accion_hasta} />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="exampleFormControlInput1" className="form-label">Estado del objeto</label>
                                <select className="form-select" aria-label="Default select example" ref={estado_objeto} >
                                    <option value="0">Seleccione según el estado del objeto</option>
                                    <option value="nuevo">Nuevo</option>
                                    <option value="usado">Usado</option>
                                    <option value="defectuoso">Defectuoso</option>
                                    <option value="baja">Defectuoso</option>
                                </select>
                            </div>
                        </>
                    }
                    {
                        (activeLink === '/rastreo')
                        &&
                        <>
                            <div className='mb-3'>
                                <label htmlFor="exampleFormControlInput1" className="form-label">Tipo</label>
                                <select className="form-select" aria-label="Default select example" ref={tipo} >
                                    <option value="0">Seleccione el tipo de acción</option>
                                    <option value="ingreso">Ingreso</option>
                                    <option value="salida">Salida</option>
                                </select>
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="exampleFormControlInput1" className="form-label">Nombre del objeto</label>
                                <input type="text" className="form-control" id="exampleFormControlInput1" autoComplete="off" ref={nombre_objeto} />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="exampleFormControlInput1" className="form-label">Nombre de la persona</label>
                                <input type="text" className="form-control" id="exampleFormControlInput1" autoComplete="off" ref={nombre_persona} />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="exampleFormControlInput1" className="form-label">Fecha desde (fecha incluída)</label>
                                <input type="date" className="form-control" id="exampleFormControlInput1" autoComplete="off" ref={fecha_desde} />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="exampleFormControlInput1" className="form-label">Fecha hasta (fecha no incluída)</label>
                                <input type="date" className="form-control" id="exampleFormControlInput1" autoComplete="off" ref={fecha_hasta} />
                            </div>
                        </>
                    }
                </form>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                <button type="button" className="btn btn-danger" onClick={() => borrarFiltros()}>Borrar filtros</button>
                <button type="button" className="btn btn-warning" data-bs-dismiss="modal" onClick={() => aplicarFiltrosPulsado()}>Aplicar filtros</button>
            </div>
            </div>
        </div>
    </div>
  )
}

export default FiltrosObjetosGridModal
