import { useState, useEffect } from 'react'
import { Route, Routes, Navigate, useLocation } from "react-router-dom"
import './App.css'

import PrincipalPagina from './componentes/paginas/PrincipalPagina';
import LoginPagina from './componentes/paginas/LoginPagina';
import RegistroPagina from './componentes/paginas/RegistroPagina';

function App() {

  const [estoyAutenticado, setEstoyAutenticado] = useState(false);
  const [userId, setUserId] = useState('a18e32e6-db09-4324-8189-3781d27a1b8c');
  const location = useLocation();
  // const query = useLocation().search;
  // console.log(location.pathname);
  // console.log(query);
  
  return (
    <>
      {
        estoyAutenticado
          ?
            <Routes>
              <Route path="/objetos" element={<PrincipalPagina path={location.pathname} autenticado={setEstoyAutenticado} userId={userId} />} />
              <Route path="/rastreo" element={<PrincipalPagina path={location.pathname} autenticado={setEstoyAutenticado} userId={userId} />} />
              <Route path="/mis-objetos" element={<PrincipalPagina path={location.pathname} autenticado={setEstoyAutenticado} userId={userId} />} />
              <Route path="*" element={<Navigate to="/objetos" />} />
            </Routes>
          :
            <Routes>
              <Route path="/login" element={<LoginPagina autenticado={setEstoyAutenticado} />} />
              <Route path="/registro" element={<RegistroPagina />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
      }
    </>
  )
}

export default App
