import React, { useState } from 'react'
import Layout from '../../common/Layout'
import { Link, useNavigate } from 'react-router-dom'
import Sidebar from '../../common/Sidebar'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { adminToken, apiUrl } from '../../common/http'

const Create = () => {
    const [disable, setDisable] = useState(false);
    const navigate=useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const saveCategory = async (data) => {
        setDisable(true);
        const res = await fetch(`${apiUrl}/categories`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${adminToken()}`
            },
            body: JSON.stringify(data)
        }).then(res => res.json(data))
            .then(result => {
                setDisable(false);
                if (result.status == 200) {
                    toast.success(result.message);
                    navigate('/admin/categories');

                } else {
                    console.log("Algo salio mal...")
                }
            })
    }

    return (
        <Layout>
            <div className='container'>
                <div className='row'>
                    <div className='d-flex justify-content-between mt-5 pb-3'>
                        <h4 className='h4 pb-0 mb-0'>Categorias / Crear</h4>
                        <Link to="/admin/categories" className="btn btn-primary">Regresar</Link>
                    </div>
                    <div className='col-md-3'>
                        <Sidebar />
                    </div>
                    <div className='col-md-9'>
                        <form onSubmit={handleSubmit(saveCategory)}>
                            <div className='card shadow'>
                                <div className='card-body p-4'>
                                    <div className='mb-3'>
                                        <label htmlFor="" className='form-label'>
                                            Nombre
                                        </label>
                                        <input
                                            {
                                            ...register('name', {
                                                required: 'El nombre es requerido'
                                            })
                                            }
                                            type="text" className={`form-control ${errors.name && 'is-invalid'}`} placeholder='Nombre' />
                                        {
                                            errors.name && <p className='invalid-feedback'>{errors.name?.message}</p>

                                        }
                                        <label htmlFor="" className='form-label'>
                                            Estado
                                        </label>
                                        <select
                                            {
                                            ...register('status', {
                                                required: 'Favor de seleccionar un estado'
                                            })
                                            }
                                            className={`form-control ${errors.status && 'is-invalid'}`}>
                                            <option value="">Selecciona el Estado</option>
                                            <option value="1">Activo</option>
                                            <option value="0">Inactivo</option>
                                        </select>
                                        {
                                            errors.status && <p className='invalid-feedback'>{errors.status?.message}</p>

                                        }
                                    </div>
                                </div>
                            </div>
                            <button
                                disabled={disable}
                                type='submit' className='btn btn-primary mt-3'>Crear</button>
                        </form>
                    </div>
                </div>
            </div>

        </Layout>
    )
}

export default Create
