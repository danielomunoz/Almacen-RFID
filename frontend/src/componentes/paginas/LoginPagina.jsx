import { useState, useRef } from 'react'
import './LoginPagina.css'

import Titulo from '../compartidos/Titulo';
import Footer from '../compartidos/Footer';


function LoginPagina() {

  const [titulo, setTitulo] = useState('Login');

  const user = useRef(null);
  const password = useRef(null);

  const doLogin = () => {
    if (user.current.value == ''){
        alert(`Por favor, introduzca su nombre de usuario o email para loguearse en la aplicación`);
        return;
    }
    if (password.current.value == ''){
        alert(`Por favor, introduzca su contraseña para loguearse en la aplicación`);
        return;
    }
  }
  
  return (
    <div className='login-page-container'>
        <div className='login-container'>
            <Titulo titulo={titulo} login={true} />
            <div className='login-form-container'>
                <form>
                    <div className='mb-3'>
                        <label htmlFor="exampleFormControlInput1" className="form-label">Introduzca email o usuario</label>
                        <input type="text" className="form-control" autoComplete="off" ref={user} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="exampleFormControlInput1" className="form-label">Introduzca contraseña</label>
                        <input type="password" className="form-control" autoComplete="off" ref={password} />
                    </div>
                    <div className='login-button'>
                        <button type="button" className="btn btn-warning" onClick={() => doLogin()}>Loguéame</button>
                    </div>
                </form>
            </div>
        </div>
        <div className='login-footer'>
            <Footer />
        </div>
    </div>
  )
}

export default LoginPagina
