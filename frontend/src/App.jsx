import { useState, useEffect } from 'react'
import { Route, Routes, Navigate, useLocation } from "react-router-dom"
import './App.css'

import PrincipalPagina from './componentes/paginas/PrincipalPagina';
import LoginPagina from './componentes/paginas/LoginPagina';
import RegistroPagina from './componentes/paginas/RegistroPagina';

function App() {

  const location = useLocation();
  // const query = useLocation().search;
  // console.log(location.pathname);
  // console.log(query);
  
  return (
    <>
      {
        (localStorage.getItem("sesion_token") !== null)
          ?
            <Routes>
              <Route path="/objetos" element={<PrincipalPagina path={location.pathname} />} />
              <Route path="/rastreo" element={<PrincipalPagina path={location.pathname} />} />
              <Route path="/mis-objetos" element={<PrincipalPagina path={location.pathname} />} />
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
