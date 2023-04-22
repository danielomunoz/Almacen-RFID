import { useState, useRef } from 'react'
import './LoginPagina.css'

import axios from 'axios'

import Titulo from '../compartidos/Titulo';
import Footer from '../compartidos/Footer';


function LoginPagina({}) {

  const [titulo, setTitulo] = useState('Login');

  const user = useRef(null);
  const password = useRef(null);

  const formRef = useRef(null);

  const doLogin = () => {
    if (user.current.value == ''){
        alert(`Por favor, introduzca su nombre de usuario o email para loguearse en la aplicación`);
        return;
    }
    if (password.current.value == ''){
        alert(`Por favor, introduzca su contraseña para loguearse en la aplicación`);
        return;
    }

    axios.post("http://127.0.0.1:8000/api/login", {
        usuario: user.current.value,
        password: password.current.value,
    }, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then(res => {
                if (res.data.ok){
                    localStorage.setItem('sesion_token', res.data.token);
                    formRef.current.reset();
                    location.reload();
                } else {
                    console.log(res.data);
                    alert('El nuevo usuario no pudo ser logueado');
                }
            })
            .catch(err => {
                console.log(err);
            });
  }
  
  return (
    <div className='login-page-container'>
        <div className='login-container'>
            <Titulo titulo={titulo} login={true} />
            <div className='login-form-container'>
                <form ref={formRef}>
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
