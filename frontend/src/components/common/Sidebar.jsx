import React, { useContext } from 'react'
import { AdminAuthContext } from '../context/AdminAuth'
import { Link } from 'react-router-dom';

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
                    <Link to="/admin/categories">Categorias</Link>
                  </li>
                  <li>
                    <Link to="/admin/brands">Marcas</Link>
                  </li>
                  <li>
                    <Link to="/admin/products">Productos</Link>
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
