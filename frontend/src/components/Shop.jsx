import React from 'react'
import Layout from './common/Layout'
import ProductImg from '../assets/images/Mens/eight.jpg';
import Hero from './common/Hero'
import { Link } from 'react-router-dom';

const Shop = () => {
    return (
        <Layout>
            <div className='container'>
                <nav aria-label="breadcrumb" className='py-4'>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="#">Inicio</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Tienda</li>
                    </ol>
                </nav>
                <div className='row'>
                    <div className='col-md-3'>
                        <div className='card shadow border-0 mb-3'>
                            <div className='card-body p-4'>
                                <h3 className='mb-3'>Categorias</h3>
                                <ul>
                                    <li className='mb-2'>
                                        <input type="checkbox" />
                                        <label htmlFor="" className='ps-2'>Niños</label>
                                    </li>
                                    <li className='mb-2'>
                                        <input type="checkbox" />
                                        <label htmlFor="" className='ps-2'>Hombres</label>
                                    </li>
                                    <li className='mb-2'>
                                        <input type="checkbox" />
                                        <label htmlFor="" className='ps-2'>Mujeres</label>
                                    </li>
                                </ul>

                            </div>


                        </div>
                        <div className='card shadow border-0 mb-3'>
                            <div className='card-body p-4'>
                                <h3 className='mb-3'>Marcas</h3>
                                <ul>
                                    <li className='mb-2'>
                                        <input type="checkbox" />
                                        <label htmlFor="" className='ps-2'>American Eagle</label>
                                    </li>
                                    <li className='mb-2'>
                                        <input type="checkbox" />
                                        <label htmlFor="" className='ps-2'>Levis</label>
                                    </li>
                                    <li className='mb-2'>
                                        <input type="checkbox" />
                                        <label htmlFor="" className='ps-2'>Nike</label>
                                    </li>
                                    <li className='mb-2'>
                                        <input type="checkbox" />
                                        <label htmlFor="" className='ps-2'>Columbia</label>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-9'>
                        <div className='row pb-5'>
                        <div className='col-md-4 col-6' >
                            <div className='product card border-0'>
                                <div className='card-img'>
                                    <Link to="/product">
                                    <img src={ProductImg} alt="" className='w-100'/>
                                    </Link>
                                </div>
                                <div className='card-body pt-3'>
                                    <Link to="/product">Camisa de cuadros roja para Hombre</Link>
                                    <div className='price'>
                                        $350 <span className='text-decoration-line-through'>$500</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-4 col-6' >
                            <div className='product card border-0'>
                                <div className='card-img'>
                                    <img src={ProductImg} alt="" className='w-100' />
                                </div>
                                <div className='card-body pt-3'>
                                    <a href="">Camisa de cuadros roja para Hombre</a>
                                    <div className='price'>
                                        $350 <span className='text-decoration-line-through'>$500</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-4 col-6' >
                            <div className='product card border-0'>
                                <div className='card-img'>
                                    <img src={ProductImg} alt="" className='w-100' />
                                </div>
                                <div className='card-body pt-3'>
                                    <a href="">Camisa de cuadros roja para Hombre</a>
                                    <div className='price'>
                                        $350 <span className='text-decoration-line-through'>$500</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-4 col-6' >
                            <div className='product card border-0'>
                                <div className='card-img'>
                                    <img src={ProductImg} alt="" className='w-100' />
                                </div>
                                <div className='card-body pt-3'>
                                    <a href="">Camisa de cuadros roja para Hombre</a>
                                    <div className='price'>
                                        $350 <span className='text-decoration-line-through'>$500</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-4 col-6' >
                            <div className='product card border-0'>
                                <div className='card-img'>
                                    <img src={ProductImg} alt="" className='w-100' />
                                </div>
                                <div className='card-body pt-3'>
                                    <a href="">Camisa de cuadros roja para Hombre</a>
                                    <div className='price'>
                                        $350 <span className='text-decoration-line-through'>$500</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-4 col-6' >
                            <div className='product card border-0'>
                                <div className='card-img'>
                                    <img src={ProductImg} alt="" className='w-100' />
                                </div>
                                <div className='card-body pt-3'>
                                    <a href="">Camisa de cuadros roja para Hombre</a>
                                    <div className='price'>
                                        $350 <span className='text-decoration-line-through'>$500</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Shop
