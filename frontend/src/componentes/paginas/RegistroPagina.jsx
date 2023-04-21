import { useState } from 'react'
import './RegistroPagina.css'

import Titulo from '../compartidos/Titulo';
import Footer from '../compartidos/Footer';


function RegistroPagina() {

    const [titulo, setTitulo] = useState('Registro');
  
  return (
    <div className='registro-container'>
        <Titulo titulo={titulo} registro={true} />
        <div className='registro-form-container'>
            <form>
                <div className='avatar mb-3'>
                    <input className="form-control" type="file" name="imagen" accept="image/jpeg,image/png,image/jpg,image/gif" />
                </div>
                <div className='mb-3'>
                    <label htmlFor="exampleFormControlInput1" className="form-label">Nombre</label>
                    <input type="text" className="form-control" autoComplete="off" />
                </div>
                <div className='mb-3'>
                    <label htmlFor="exampleFormControlInput1" className="form-label">Email</label>
                    <input type="email" className="form-control" autoComplete="off" />
                </div>
                <div className='mb-3'>
                    <label htmlFor="exampleFormControlInput1" className="form-label">Móvil</label>
                    <input type="text" className="form-control" autoComplete="off" />
                </div>
                <div className='mb-3'>
                    <label htmlFor="exampleFormControlInput1" className="form-label">DNI</label>
                    <input type="text" className="form-control" autoComplete="off" />
                </div>
                <div className='mb-3'>
                        <label htmlFor="exampleFormControlInput1" className="form-label">Estado del objeto</label>
                        <select className="form-select" aria-label="Default select example">
                            <option value="0">Seleccione uno de los roles disponibles</option>
                            <option value="nuevo">Alumno</option>
                            <option value="usado">Profesor</option>
                        </select>
                    </div>
                <div className='mb-3'>
                    <label htmlFor="exampleFormControlInput1" className="form-label">Usuario</label>
                    <input type="text" className="form-control" autoComplete="off" />
                </div>
                <div className='mb-3'>
                    <label htmlFor="exampleFormControlInput1" className="form-label">Contraseña</label>
                    <input type="password" className="form-control" autoComplete="off" />
                </div>
                <div className='mb-3'>
                    <label htmlFor="exampleFormControlInput1" className="form-label">Repita su contraseña</label>
                    <input type="password" className="form-control" autoComplete="off" />
                </div>
                <div className='registro-button'>
                    <button type="button" className="btn btn-warning" onClick={() => registraObjetos()}>Regístrame</button>
                </div>
            </form>
        </div>
        <Footer />
    </div>
  )
}

export default RegistroPagina
