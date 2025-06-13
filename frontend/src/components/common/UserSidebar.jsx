import { useContext } from 'react';
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/Auth';

const UserSidebar = () => {
    const { logout } = useContext(AuthContext);

    return (
        <div className='card shadow mb-5 sidebar'>
            <div className='card-body p-4'>
                <ul>
                    <li>
                        <Link to="/account">Cuenta</Link>
                    </li>
                    <li>
                        <Link to="#">Ordenes</Link>
                    </li>
                    <li>
                        <Link to="#">Cambiar Contraseña</Link>
                    </li>
                    <li>
                        <a href="" onClick={logout}>Cerrar Sesión</a>
                    </li>
                </ul>

            </div>
        </div>
    )
}

export default UserSidebar
