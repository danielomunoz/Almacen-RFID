import { useState } from 'react'
import './LoginPagina.css'

import Titulo from '../compartidos/Titulo';
import Footer from '../compartidos/Footer';


function LoginPagina() {

  const [titulo, setTitulo] = useState('Login');
  
  return (
    <div className='login-container'>
        <Titulo titulo={titulo} login={true} />
        <div className='login-form-container'>
            <form>
                <div className='mb-3'>
                    <label htmlFor="exampleFormControlInput1" className="form-label">Introduzca email o usuario</label>
                    <input type="text" className="form-control" autoComplete="off" />
                </div>
                <div className='mb-3'>
                    <label htmlFor="exampleFormControlInput1" className="form-label">Introduzca contraseña</label>
                    <input type="password" className="form-control" autoComplete="off" />
                </div>
                <div className='login-button'>
                    <button type="button" className="btn btn-warning" onClick={() => registraObjetos()}>Loguéame</button>
                </div>
            </form>
        </div>
        <Footer />
    </div>
  )
}

export default LoginPagina
