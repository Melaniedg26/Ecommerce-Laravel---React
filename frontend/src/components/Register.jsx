import Layout from './common/Layout'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { apiUrl } from './common/http';

const Register = () => {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();
    const onSubmit = async (data) => {
        const res = await fetch(`${apiUrl}/register`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const result = await res.json();

        if (result.status === 200) {
            toast.success(result.message)
            navigate('/account/login')
        } else {
            const formErrors = result.errors;
            Object.keys(formErrors).forEach((field) => {
                setError(field, { message: formErrors[field][0] });
            })
        }
    }

    return (
        <Layout>
            <div className='container d-flex justify-content-center py-5'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='card shadow border-0 login'>
                        <div className='card-body p-4'>
                            <h3 className='border-bottom pb-2 mb-3' style={{ textAlign: 'center' }}>Registrarse</h3>
                            <div className='mb-3'>
                                <label className='form-label'>Nombre</label>
                                <input
                                    {...register('name', {
                                        required: "El nombre es requerido",
                                    })}
                                    type="text"
                                    className={`form-control ${errors.name ? 'is-invalid' : ''}`} placeholder='Nombre' />
                                {errors.name && <p className='invalid-feedback'>{errors.name.message}</p>}
                            </div>
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
                            <button className='btn btn-secondary w-100'>Registrarse</button>
                            <div className='d-flex justify-content-center pt-4 pb-2'>
                                ¿Ya tienes una cuenta? &nbsp; <Link to="/account/login">Iniciar Sesión</Link>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </Layout>
    )
}

export default Register;
