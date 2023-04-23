import { useState, useEffect } from 'react'
import axios from 'axios'
import './PrincipalPagina.css'

import Navbar from '../compartidos/Navbar';
import Titulo from '../compartidos/Titulo';
import Grid from '../compartidos/Grid';
import Footer from '../compartidos/Footer';
import Rastreo from '../compartidos/Rastreo';
import Paginacion from '../compartidos/Paginacion';
import ContenidoNotFound from '../compartidos/ContenidoNotFound';
import Avisos from '../compartidos/Avisos';


function PrincipalPagina({path}) {

  const [rol, setRol] = useState('alumno');
  const [titulo, setTitulo] = useState('Objetos');
  const [objetos, setObjetos] = useState([]);
  const [acciones, setAcciones] = useState([]);
  const [filtros, setFiltros] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [flagObjetoRegistrado, setFlagObjetoRegistrado] = useState(false);
  const [muestra404, setMuestra404] = useState(false);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/sesion/${localStorage.getItem("sesion_token")}`)
      .then(res => {
        let userId = res.data.payload.persona.id;
        axios.get(`http://127.0.0.1:8000/api/persona/${userId}`)
          .then(res => {
            setRol(res.data.payload.rol);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  useEffect(() => {
    setMuestra404(false);
    if (flagObjetoRegistrado === true) setFlagObjetoRegistrado(false);
    if (path === '/objetos') {
      setTitulo('Objetos');
      axios.get(`http://127.0.0.1:8000/api/objeto?p=${paginaActual}` + filtros)
      .then(res => {
        setTotalPaginas(res.data.total_paginas)
        setObjetos(res.data.payload);
        if (res.data.total_objetos === 0) setMuestra404(true);   
      })
      .catch((err) => {
        console.log(err);
        setObjetos([]);
        setMuestra404(true);
      });
    }
    if (path === '/rastreo') {
      setTitulo('Rastreo');
      axios.get(`http://127.0.0.1:8000/api/accion?p=${paginaActual}` + filtros)
      .then(res => {
        setTotalPaginas(res.data.total_paginas)
        setAcciones(res.data.payload);
        if (res.data.total_objetos === 0) setMuestra404(true);  
      })
      .catch((err) => {
        console.log(err);
        setAcciones([]);
        setMuestra404(true);
      });
    }
    if (path === '/mis-objetos') {
      setTitulo('Mis objetos');
      axios.get(`http://127.0.0.1:8000/api/sesion/${localStorage.getItem("sesion_token")}`)
      .then(res => {
        let userId = res.data.payload.persona.id;
        axios.get(`http://127.0.0.1:8000/api/misObjetos/${userId}?p=${paginaActual}` + filtros)
          .then(res => {
            setTotalPaginas(res.data.total_paginas)
            setObjetos(res.data.payload);
            if (res.data.total_objetos === 0) setMuestra404(true);  
          })
          .catch((err) => {
            console.log(err);
            setObjetos([]);
            setMuestra404(true);
          });
      })
      .catch(err => {
        console.log(err);
      })
    }
    if (path == '/avisos') {
      setTitulo('Avisos');
    }
  }, [filtros, paginaActual, flagObjetoRegistrado]);
  
  return (
    <>
      <div className='main-container'>
        <div className='main-page-main-container'>
          <Navbar activeLink={path} actualizaFiltros={setFiltros} nuevoObjetoRegistrado={setFlagObjetoRegistrado} rol={rol} />
          <Titulo titulo={titulo} />
          { (path == '/rastreo') && <Rastreo acciones={acciones} /> }
          { (path == '/objetos' || path == '/mis-objetos') && <Grid objetos={objetos} userRol={rol} nuevoObjetoRegistrado={setFlagObjetoRegistrado} /> }
          { (path == '/avisos') && <Avisos /> }
          { (muestra404) && <ContenidoNotFound /> }
        </div>
        <div className='main-page-footer-container'>
          <Paginacion paginaActual={paginaActual} totalPaginas={totalPaginas} cambioPaginaActual={setPaginaActual} />
          <Footer />
        </div>
      </div>
    </>
  )
}

export default PrincipalPagina
