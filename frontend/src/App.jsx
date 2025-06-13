import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Shop from './components/Shop'
import Product from './components/Product'
import Cart from './components/Cart'
import Pago from './components/Pago'
import Login from './components/admin/Login'

import { ToastContainer, toast } from 'react-toastify';

import Dashboard from './components/admin/Dashboard'

import { AdminRequireAuth } from './components/admin/AdminRequireAuth'

import { default as ShowCategories } from './components/admin/category/Show'
import { default as CreateCategory } from './components/admin/category/Create'
import { default as EditCategory } from './components/admin/category/Edit'

import { default as ShowBrands } from './components/admin/brand/Show'
import { default as CreateBrand } from './components/admin/brand/Create'
import { default as EditBrand } from './components/admin/brand/Edit'

import { default as ShowProducts } from './components/admin/product/Show'
import { default as CreateProduct } from './components/admin/product/Create'
import { default as EditProduct } from './components/admin/product/Edit'
import Register from './components/Register'
import { default as LoginUsers } from './components/Login'
import Profile from './components/Profile'
import { RequireAuth } from './components/RequireAuth'



function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>

          {/* Rutas para Visitantes */}
          <Route path='/' element={<Home />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/product/:id' element={<Product />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout' element={<Pago />} />
          <Route path='/account/register' element={<Register />} />
          <Route path='/account/login' element={<LoginUsers />} />

          <Route path='/account' element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          } />

          {/* Rutas para iniciar sesion como administrador */}
          <Route path='/admin/login' element={<Login />} />

          {/* Ruta para el panel de control de administrador */}
          <Route path='/admin/dashboard' element={
            <AdminRequireAuth>
              <Dashboard />
            </AdminRequireAuth>
          } />

          {/* Rutas para las categorias */}
          <Route path='/admin/categories' element={
            <AdminRequireAuth>
              <ShowCategories />
            </AdminRequireAuth>
          } />
          <Route path='/admin/categories/create' element={
            <AdminRequireAuth>
              <CreateCategory />
            </AdminRequireAuth>
          } />
          <Route path='/admin/categories/edit/:id' element={
            <AdminRequireAuth>
              <EditCategory />
            </AdminRequireAuth>
          } />

          {/* Rutas para las marcas */}
          <Route path='/admin/brands' element={
            <AdminRequireAuth>
              <ShowBrands />
            </AdminRequireAuth>
          } />
          <Route path='/admin/brands/create' element={
            <AdminRequireAuth>
              <CreateBrand />
            </AdminRequireAuth>
          } />
          <Route path='/admin/brands/edit/:id' element={
            <AdminRequireAuth>
              <EditBrand />
            </AdminRequireAuth>
          } />

          {/* Rutas para los productos */}
          <Route path='/admin/products' element={
            <AdminRequireAuth>
              <ShowProducts />
            </AdminRequireAuth>
          } />
          <Route path='/admin/products/create/' element={
            <AdminRequireAuth>
              <CreateProduct />
            </AdminRequireAuth>
          } />
          <Route path='/admin/products/edit/:id' element={
            <AdminRequireAuth>
              <EditProduct />
            </AdminRequireAuth>
          } />


        </Routes>
      </BrowserRouter>
      <ToastContainer />

    </>
  )
}

export default App
