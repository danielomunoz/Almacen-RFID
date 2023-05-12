import { useState, useEffect } from 'react'
import { Route, Routes, Navigate, useLocation } from "react-router-dom"

import axios from 'axios'

import './App.css'

import PrincipalPagina from './componentes/paginas/PrincipalPagina';
import LoginPagina from './componentes/paginas/LoginPagina';
import RegistroPagina from './componentes/paginas/RegistroPagina';

function App() {

  const location = useLocation();
  // const query = useLocation().search;
  // console.log(location.pathname);
  // console.log(query);

  useEffect(() => {
    axios.post("http://127.0.0.1:8000/api/persona", {
      id: 'a18e32e6-db09-4324-8189-3781d27a1b8c',
      nombre: 'José Luis Redrejo Rodríguez',
      email: 'jredrejo@santiagoapostol.net',
      rol: 'profesor',
      codigo_rfid: '1',
      usuario: 'admin',
      password: 'admin',
      estado: 'alta',
      alta_confirmada: true,
    }, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
      .then(() => null)
      .catch(() => null);
    
    axios.post("http://127.0.0.1:8000/api/detector", {
      id: '70f5436d-ab30-4e0b-9bf3-ab65cb5e13c4',
      descripcion: 'Detector 1',
      localizacion: 'zona1',
    }, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
      .then(() => null)
      .catch(() => null);
  }, []);
  
  return (
    <>
      {
        (localStorage.getItem("sesion_token") !== null)
          ?
            <Routes>
              <Route path="/objetos" element={<PrincipalPagina path={location.pathname} />} />
              <Route path="/rastreo" element={<PrincipalPagina path={location.pathname} />} />
              <Route path="/mis-objetos" element={<PrincipalPagina path={location.pathname} />} />
              <Route path="/avisos" element={<PrincipalPagina path={location.pathname} />} />
              <Route path="*" element={<Navigate to="/objetos" />} />
            </Routes>
          :
            <Routes>
              <Route path="/login" element={<LoginPagina />} />
              <Route path="/registro" element={<RegistroPagina />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
      }
    </>
  )
}

export default App
