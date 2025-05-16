import React, { useContext } from 'react'
import { AdminAuthContext } from '../context/AdminAuth'

const Sidebar = () => {
    const {logout} = useContext(AdminAuthContext);
  return (
  <div className='card shadow mb-5 sidebar'>
              <div className='card-body p-4'>
                <ul>
                  <li>
                    <a href="">Panel de Control</a>
                  </li>
                  <li>
                    <a href="">Categorias</a>
                  </li>
                  <li>
                    <a href="">Marcas</a>
                  </li>
                  <li>
                    <a href="">Productos</a>
                  </li>
                  <li>
                    <a href="">Usuarios</a>
                  </li>
                  <li>
                    <a href="">En Camino</a>
                  </li>
                  <li>
                    <a href="">Cambiar contraseña</a>
                  </li>
                  <li>
                    <a href="" onClick={logout}>Cerrar Sesión</a>
                  </li>
                </ul>

              </div>
            </div>
  )
}

export default Sidebar
