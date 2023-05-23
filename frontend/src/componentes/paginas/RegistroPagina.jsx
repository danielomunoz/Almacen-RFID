import { useState, useRef } from 'react'
import { useNavigate } from "react-router-dom";
import './RegistroPagina.css'

import axios from 'axios'

import Titulo from '../compartidos/Titulo';
import Footer from '../compartidos/Footer';


function RegistroPagina() {

    const navigate = useNavigate();

    const nombre = useRef(null);
    const email = useRef(null);
    const movil = useRef(null);
    const dni = useRef(null);
    const rol = useRef(null);
    const usuario = useRef(null);
    const password = useRef(null);
    const password_again = useRef(null);
    const imagen = useRef(null);

    const formRef = useRef(null);

    const registraUsuario = () => {
        if (imagen.current.files.length == 0){
            alert('Debe seleccionar una imagen para el nuevo usuario');
            return;
        }
        if (nombre.current.value == ''){
            alert('El nombre del usuario no puede ser un valor vacío');
            return;
        }
        if (email.current.value == ''){
            alert('El email del usuario no puede ser un valor vacío y debe tener formato de email');
            return;
        }
        if (movil.current.value == ''){
            alert('El movil del usuario no puede ser un valor vacío');
            return;
        }
        if (dni.current.value == ''){
            alert('El dni del usuario no puede ser un valor vacío');
            return;
        }
        if (rol.current.value == '0'){
            alert('Seleccione uno de los roles disponibles para el usuario');
            return;
        }
        if (usuario.current.value == ''){
            alert('El nombre del usuario no puede ser un valor vacío');
            return;
        }
        if (password.current.value == ''){
            alert('La contraseña del usuario no puede ser un valor vacío');
            return;
        }
        if (password_again.current.value == ''){
            alert('La validación de la contraseña no puede ser un valor vacío');
            return;
        }
        if (password.current.value != password_again.current.value){
            alert('La constraseña y su validación no coinciden');
            return;
        }

        axios.post("http://127.0.0.1:8000/api/persona", {
            imagen: imagen.current.files[0],
            nombre: nombre.current.value,
            email: email.current.value,
            movil: movil.current.value,
            dni: dni.current.value,
            rol: rol.current.value,
            usuario: usuario.current.value,
            password: password.current.value,
        }, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
                .then(res => {
                    if (res.data.ok){
                        alert('Nuevo usuario registrado correctamente. Debe pedirle a su profesor que dé de alta su perfil para utilizar la aplicación.');
                        navigate('/login');
                        formRef.current.reset();
                    } else {
                        console.log(res.data);
                        alert('El nuevo usuario no pudo ser registrado');
                    }
                })
                .catch(err => {
                    console.log(err);
                });
    }
  
  return (
    <div className='registro-container'>
        <Titulo titulo={'Registro'} registro={true} />
        <div className='registro-form-container'>
            <form ref={formRef}>
                <div className='avatar mb-3'>
                    <input className="form-control" type="file" name="imagen" accept="image/jpeg,image/png,image/jpg,image/gif" ref={imagen} />
                </div>
                <div className='mb-3'>
                    <label htmlFor="exampleFormControlInput1" className="form-label">Nombre</label>
                    <input type="text" className="form-control" autoComplete="off" ref={nombre} />
                </div>
                <div className='mb-3'>
                    <label htmlFor="exampleFormControlInput1" className="form-label">Email</label>
                    <input type="email" className="form-control" autoComplete="off" ref={email} />
                </div>
                <div className='mb-3'>
                    <label htmlFor="exampleFormControlInput1" className="form-label">Móvil</label>
                    <input type="text" className="form-control" autoComplete="off" ref={movil} />
                </div>
                <div className='mb-3'>
                    <label htmlFor="exampleFormControlInput1" className="form-label">DNI</label>
                    <input type="text" className="form-control" autoComplete="off" ref={dni} />
                </div>
                <div className='mb-3'>
                        <label htmlFor="exampleFormControlInput1" className="form-label">Rol del usuario</label>
                        <select className="form-select" aria-label="Default select example" ref={rol}>
                            <option value="0">Seleccione uno de los roles disponibles</option>
                            <option value="alumno">Alumno</option>
                            <option value="profesor">Profesor</option>
                        </select>
                    </div>
                <div className='mb-3'>
                    <label htmlFor="exampleFormControlInput1" className="form-label">Usuario</label>
                    <input type="text" className="form-control" autoComplete="off" ref={usuario} />
                </div>
                <div className='mb-3'>
                    <label htmlFor="exampleFormControlInput1" className="form-label">Contraseña</label>
                    <input type="password" className="form-control" autoComplete="off" ref={password} />
                </div>
                <div className='mb-3'>
                    <label htmlFor="exampleFormControlInput1" className="form-label">Repita su contraseña</label>
                    <input type="password" className="form-control" autoComplete="off" ref={password_again} />
                </div>
                <div className='registro-button'>
                    <button type="button" className="btn btn-warning" onClick={() => registraUsuario()}>Regístrame</button>
                </div>
            </form>
        </div>
        <Footer />
    </div>
  )
}

export default RegistroPagina
