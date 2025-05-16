import React from 'react'
import Layout from '../common/Layout'
import Sidebar from '../common/Sidebar'

const Dashboard = () => {
  return (
    <Layout>
      <div className='container'>
        <div className='row'>
          <div className='d-flex justify-content-between mt-5 pb-3'>
            <h4 className='h4 pb-0 mb-0'>Panel de Control</h4>
          </div>
          <div className='col-md-3'>
            <Sidebar />
          </div>
          <div className='col-md-9'>
            <div className='row'>
              <div className='col-md-4'>
                <div className='card shadow'>
                  <div className='card-body'>
                    <h2>0</h2>
                    <span>Usuarios</span>
                  </div>
                  <div className='card-footer'>
                    <a href="">Mostrar Usuarios</a>
                  </div>
                </div>
              </div>
              <div className='col-md-4'>
                <div className='card shadow'>
                  <div className='card-body'>
                    <h2>0</h2>
                    <span>Ordenes</span>
                  </div>
                  <div className='card-footer'>
                    <a href="">Mostrar Ordenes</a>
                  </div>
                </div>
              </div>
              <div className='col-md-4'>
                <div className='card shadow'>
                  <div className='card-body'>
                    <h2>0</h2>
                    <span>Productos</span>
                  </div>
                  <div className='card-footer'>
                    <a href="">Mostrar Productos</a>
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

export default Dashboard
