import { useState, useEffect, useRef } from 'react'

import axios from 'axios'

import './Navbar.css'

import MiPerfilModal from './MiPerfilModal'
import FiltrosObjetosGridModal from './FiltrosObjetosGridModal'
import RegistrarObjetoModal from './RegistrarObjetoModal'
import LogoutModal from './LogoutModal'


function Navbar({activeLink, actualizaFiltros, nuevoObjetoRegistrado, rol}) {

    const navbarInterval = useRef(null);
    const [hayPersonasSinDarDeAlta, setHayPersonasSinDarDeAlta] = useState(false);
    const [hayObjetosSinRFID, setHayObjetosSinRFID] = useState(false);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/persona?alta=false`)
            .then(res => {
            (res.data.payload.length != 0) ? setHayPersonasSinDarDeAlta(true) : setHayPersonasSinDarDeAlta(false);
            })
            .catch(err => console.log(err));

        axios.get(`http://127.0.0.1:8000/api/objeto?codigo_rfid=`)
            .then(res => {
            (res.data.payload.length != 0) ? setHayObjetosSinRFID(true) : setHayObjetosSinRFID(false);
            })
            .catch(err => console.log(err));
        navbarInterval.current = setInterval(() => {
            // console.log('Llamando a intervalo navbar');
            axios.get(`http://127.0.0.1:8000/api/persona?alta=false`)
              .then(res => {
                (res.data.payload.length != 0) ? setHayPersonasSinDarDeAlta(true) : setHayPersonasSinDarDeAlta(false);
              })
              .catch(err => console.log(err));
    
            axios.get(`http://127.0.0.1:8000/api/objeto?codigo_rfid=`)
              .then(res => {
                (res.data.payload.length != 0) ? setHayObjetosSinRFID(true) : setHayObjetosSinRFID(false);
              })
              .catch(err => console.log(err));
          }, 5000);
    }, [])

    useEffect(() => () => {
        // console.log('Limpiando intervalo navbar');
        clearInterval(navbarInterval.current);
        navbarInterval.current = null;
    }, []);
  
  return (
    <>
      <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
            <a className="navbar-brand" href="/">Almacén RFID</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <a className={activeLink === '/objetos' ? 'nav-link active' : 'nav-link'} href="/objetos">Objetos</a>
                    </li>
                    <li className="nav-item">
                        <a className={activeLink === '/rastreo' ? 'nav-link active' : 'nav-link'} href="/rastreo">Rastreo</a>
                    </li>
                    {   
                        (rol == 'profesor')
                        &&
                        <li className="nav-item nav-item-avisos">
                            <a className={activeLink === '/avisos' ? 'nav-link active' : 'nav-link'} href="/avisos">Avisos</a>
                            {(hayPersonasSinDarDeAlta || hayObjetosSinRFID) && <div className='red-circle'></div>}
                        </li>
                    }
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Mi perfil
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><a className="dropdown-item" data-bs-toggle="modal" data-bs-target="#miPerfilModal">Información</a></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><a className="dropdown-item" href="/mis-objetos">Mis objetos</a></li>
                        </ul>
                    </li>
                    {
                        (activeLink != '/avisos')
                        &&
                        <li className="nav-item display-on-small-devices">
                            <a className="nav-link" data-bs-toggle="modal" data-bs-target="#filtrosModal">Filtrar</a>
                        </li>
                    }
                    <li className="nav-item display-on-small-devices">
                        <a className="nav-link" data-bs-toggle="modal" data-bs-target="#registroObjetoModal">Registrar objeto</a>
                    </li>
                    <li className="nav-item display-on-small-devices">
                        <a className="nav-link" data-bs-toggle="modal" data-bs-target="#logoutModal">Logout</a>
                    </li>
                </ul>
                <div className="navbar-buttons-container">
                    <button type="button" className="btn btn-outline-warning" data-bs-toggle="modal" data-bs-target="#filtrosModal" disabled={(activeLink == '/avisos') && true}>Filtrar</button>
                    <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#registroObjetoModal">Registrar objeto</button>
                    <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#logoutModal">Logout</button>
                </div>
            </div>
        </div>
      </nav>
      <FiltrosObjetosGridModal actualizaFiltros={actualizaFiltros} activeLink={activeLink} />
      <RegistrarObjetoModal nuevoObjetoRegistrado={nuevoObjetoRegistrado} />
      <LogoutModal />
      <MiPerfilModal />
    </>
  )
}

export default Navbar
