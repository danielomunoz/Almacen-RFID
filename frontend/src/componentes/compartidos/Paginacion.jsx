import { useState, useRef } from 'react'
import './Paginacion.css'


function Paginacion({paginaActual, totalPaginas, cambioPaginaActual}) {

  const pagina = useRef(null);
  const [deshabilitaFlechas, setDeshabilitaFlechas] = useState(false);

  const irAPagina = () => {
    if (pagina.current.value == '') return;

    if (pagina.current.value == paginaActual) {
      alert('Ya estás en la página solicitada')
      return;
    }

    if (pagina.current.value < 1 || pagina.current.value > totalPaginas) {
      alert('La página solicitada no existe')
      return;
    }

    cambioPaginaActual(pagina.current.value);
    pagina.current.value = '';
  }
  
  const avanzaPagina = (pagina_actual) => {
    pagina.current.value = '';
    cambioPaginaActual(parseInt(pagina_actual) + 1);
  }
  const retrocedePagina = (pagina_actual) => {
    pagina.current.value = '';
    cambioPaginaActual(parseInt(pagina_actual) - 1);
  }

  return (
    <nav className="pagination-container" aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        <li className={(paginaActual > 1 && !deshabilitaFlechas) ? 'page-item' : 'page-item disabled'}>
          <a className="page-link" tabIndex="-1" onClick={() => retrocedePagina(paginaActual)}>&larr;</a>
        </li>
        <li className="page-item active"><input type="number" autoComplete='off' className="form-control pagination-form" id="exampleFormControlInput1" placeholder={`Página ${paginaActual} de ${(totalPaginas != 0 ? totalPaginas : 1)}`} ref={pagina} /></li>
        <li className={(paginaActual < totalPaginas && !deshabilitaFlechas) ? 'page-item' : 'page-item disabled'}>
          <a className="page-link" onClick={() => avanzaPagina(paginaActual)}>&rarr;</a>
        </li>
      </ul>
      <button type="button" className="btn btn-sm btn-outline-warning" onClick={() => irAPagina()}>Ir a página</button>
    </nav>
  )
}

export default Paginacion
