import { useState } from 'react'
import { useNavigate } from "react-router-dom";

import './Titulo.css'


function Titulo({titulo, login = false, registro = false}) {

  const navigate = useNavigate();
  
  return (
    <>
      <div className='titulo-container'>
        <div className='titulo-plus-button'>
          <h1>{titulo}</h1>
          {
            (registro)
            &&
            <a onClick={() => navigate('/login')}>&larr; Voler a Login</a>
          }
          {
            (login)
            &&
            <button type="button" className="btn btn-sm btn-secondary" onClick={() => navigate('/registro')}>¿Eres nuevo? Regístrate</button>
          }
        </div>
        <hr></hr>
      </div>
    </>
  )
}

export default Titulo
