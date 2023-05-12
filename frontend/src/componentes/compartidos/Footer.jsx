import { useState } from 'react'
import './Footer.css'


function Footer() {
  
  return (
    <div className="footer-container">
        <footer className="py-3 my-4">
            <ul className="nav justify-content-center border-bottom pb-3 mb-3">
            </ul>
            <p className="text-center text-muted">© {new Date().getFullYear()} Daniel Muñoz Amaya para IES Santiago Apóstol - Trabajo de fin de ciclo</p>
        </footer>
    </div>
  )
}

export default Footer
