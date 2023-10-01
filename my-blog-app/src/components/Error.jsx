import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <div>
        <h1>Error 404 Pagina no encontrada</h1>
        {/*En dado caso que necesitemos hacer un link suelto para poder navegar, que no este directamente en nuestro menu, o sea cuando necesitemos hacer una navegacion necesitamos utilizar el navlink si no solo el Link */}
        <Link to={"/"}>Volver al Inicio</Link>
    </div>
  )
}

export default Error;
