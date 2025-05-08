import React, { useState } from 'react'
import Layout from './common/Layout'
import { Link } from 'react-router-dom'

import ProductImgOne from '../assets/images/mens/five.jpg';


const Pago = () => {
    const [paymentMethod, setPaymentMethod] = useState('transferencia');
    const handlePaymentMethod = (e) => {
        setPaymentMethod(e.target.value)
    }
    return (
        <Layout>
            <div className='container pb-5'>
                <div className='row'>
                    <div className='col-md-12'>
                        <nav aria-label="breadcrumb" className='py-4'>
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">Pago</li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-7'>
                        <h3 className='border-bottom pb-3'>
                            <strong>Detalle de pago</strong>
                        </h3>
                        <form action="">
                            <div className='row pt-3'>
                                <div className='col-md-6'>
                                    <div className='mb-3'>
                                        <input type="text" name="form-control" placeholder='Nombre' />
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className='mb-3'>
                                        <input type="text" name="form-control" placeholder='Email' />
                                    </div>
                                </div>
                                <div className='mb-3'>
                                    <textarea className='form-control' id="" placeholder='Direccion'>
                                    </textarea>
                                </div>
                                <div className='col-md-6'>
                                    <div className='mb-3'>
                                        <input type="text" name="form-control" placeholder='Ciudad' />
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className='mb-3'>
                                        <input type="text" name="form-control" placeholder='Estado' />
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className='mb-3'>
                                        <input type="text" name="form-control" placeholder='Codigo Postal' />
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className='mb-3'>
                                        <input type="text" name="form-control" placeholder='Contacto' />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className='col-md-5'>
                        <h3 className='border-bottom pb-3'>
                            <strong>Articulos</strong>
                        </h3>
                        <table className='table'>
                            <tbody>
                                <tr>
                                    <td width={100}>
                                        <img src={ProductImgOne} width={80} alt="" />
                                    </td>
                                    <td width={600}>
                                        <h4>Nombre del producto</h4>
                                        <div className='d-flex align-items-center pt-3'>
                                            <span>$250</span>
                                            <div className='ps-3'>
                                                <button className='btn btn-size'>C</button>
                                            </div>
                                            <div className='ps-5'> X 1</div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td width={100}>
                                        <img src={ProductImgOne} width={80} alt="" />
                                    </td>
                                    <td width={600}>
                                        <h4>Nombre del producto</h4>
                                        <div className='d-flex align-items-center pt-3'>
                                            <span>$250</span>
                                            <div className='ps-3'>
                                                <button className='btn btn-size'>C</button>
                                            </div>
                                            <div className='ps-5'> X 1</div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className='row'>
                            <div className='col-md-12'>
                                <div className='d-flex justify-content-between border-bottom pb-2'>
                                    <div>
                                        Subtotal
                                    </div>
                                    <div>$250</div>
                                </div>
                                <div className='d-flex justify-content-between border-bottom py-2'>
                                    <div>
                                        Envio
                                    </div>
                                    <div>$50</div>
                                </div>
                                <div className='d-flex justify-content-between border-bottom py-2'>
                                    <div>
                                        <strong>Total</strong>
                                    </div>
                                    <div>$300</div>
                                </div>

                            </div>
                        </div>
                        <h3 className='border-bottom pt-4 pb-3'>
                            <strong>Metodo de pago</strong>
                        </h3>
                        <div>
                            <label className='form-label'>
                                <input className='pt-2'
                                    type="radio"
                                    name="paymentMethod"
                                    checked={paymentMethod === 'paypal'}
                                    value="paypal"
                                    onChange={handlePaymentMethod}
                                />
                                Paypal
                            </label>
                            <label className='form-label ms-3'>
                                <input className='pt-2'
                                    type="radio"
                                    name="paymentMethod"
                                    checked={paymentMethod === 'transferencia'}
                                    value="transferencia"
                                    onChange={handlePaymentMethod}
                                />
                                Transferencia
                            </label>
                        </div>
                        <div className='d-flex py-3'>
                            <button className='btn btn-primary'>Pagar Ahora</button>
                        </div>
                    </div>
                </div>
            </div>

        </Layout>
    )
}

export default Pago
