import { useEffect, useState } from 'react'
import './Grid.css'

import CartaObjeto from './CartaObjeto';
import DetalleObjetoModal from './DetalleObjetoModal';
import ReplicaObjetoModal from './ReplicaObjetoModal';
import ActualizaObjetoModal from './ActualizaObjetoModal';
import BorraObjetoModal from './BorraObjetoModal';


function Grid({objetos, userRol, nuevoObjetoRegistrado}) {

  const [indiceObjetoPulsado, setIndiceObjetoPulsado] = useState(0);
  
  return (
    <>
      {
        (objetos.length != 0)
        &&
        <>
          <div className="album py-5">
            <div className="container">
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
                {
                  objetos.map((objeto, indice) => <CartaObjeto key={objeto + indice}
                                                              objeto={objeto}
                                                              indice={indice}
                                                              userRol={userRol}
                                                              objetoPulsado={setIndiceObjetoPulsado} />)
                }
              </div>
            </div>
          </div>
          <DetalleObjetoModal objeto={objetos[indiceObjetoPulsado]} />
          <ReplicaObjetoModal objeto={objetos[indiceObjetoPulsado]}
                              nuevoObjetoRegistrado={nuevoObjetoRegistrado} />
          <ActualizaObjetoModal objeto={objetos[indiceObjetoPulsado]}
                                nuevoObjetoRegistrado={nuevoObjetoRegistrado}/>
          <BorraObjetoModal objeto={objetos[indiceObjetoPulsado]}
                            nuevoObjetoRegistrado={nuevoObjetoRegistrado} />
        </>
      }
    </>
  )
}

export default Grid
