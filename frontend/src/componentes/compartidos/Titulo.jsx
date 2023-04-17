import { useState } from 'react'
import './Titulo.css'


function Titulo({titulo}) {
  
  return (
    <>
      <div className='titulo-container'>
        <h1>{titulo}</h1>
        <hr></hr>
      </div>
    </>
  )
}

export default Titulo
