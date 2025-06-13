import Layout from './common/Layout'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { apiUrl } from './common/http';
import { useContext } from 'react';
import { AuthContext } from '../components/context/Auth';


const Login = () => {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm();
    const {login}=useContext(AuthContext);
    const navigate = useNavigate();
     const onSubmit = async (data) => {
            const res = await fetch(`${apiUrl}/login`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(res => res.json())
                .then(result => {
                    if (result.status == 200) {
                        const userInfo = {
                            token: result.token,
                            id: result.id,
                            name: result.name
                        }
                        localStorage.setItem('userInfo', JSON.stringify(userInfo))
                        login(userInfo)
                        navigate('/account')
                    } else {
                        toast.error(result.message);
                    }
                })
        }
    return (
        <Layout>
            <div className='container d-flex justify-content-center py-5'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='card shadow border-0 login'>
                        <div className='card-body p-4'>
                            <h3 className='border-bottom pb-2 mb-3' style={{ textAlign: 'center' }}>Iniciar Sesion</h3>
                            <div className='mb-3'>
                                <label className='form-label'>Email</label>
                                <input
                                    {...register('email', {
                                        required: "El correo es requerido",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Correo inválido"
                                        }
                                    })}
                                    type="text"
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`} placeholder='Email' />
                                {errors.email && <p className='invalid-feedback'>{errors.email.message}</p>}
                            </div>
                            <div className='mb-3'>
                                <label className='form-label'>Contraseña</label>
                                <input
                                    {...register("password", {
                                        required: "La contraseña es un campo requerido"
                                    })}
                                    type="password"
                                    className={`form-control ${errors.password ? 'is-invalid' : ''}`} placeholder='Contraseña' />
                                {errors.password && <p className='invalid-feedback'>{errors.password.message}</p>}
                            </div>
                            <button className='btn btn-secondary w-100'>Iniciar Sesion</button>
                            <div className='d-flex justify-content-center pt-4 pb-2'>
                                ¿No tienes una cuenta? &nbsp; <Link to="/account/register">Registrarse</Link>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </Layout>
    )
}

export default Login
