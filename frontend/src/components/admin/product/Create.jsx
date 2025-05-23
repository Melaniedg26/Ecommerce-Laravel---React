import React, { useEffect, useState, useRef, useMemo } from 'react'
import Layout from '../../common/Layout'
import { Link, useNavigate } from 'react-router-dom'
import Sidebar from '../../common/Sidebar'
import { useForm } from 'react-hook-form'
import { adminToken, apiUrl } from '../../common/http'
import { toast } from 'react-toastify'
import JoditEditor from 'jodit-react'

const Create = ({ placeholder }) => {
  const [disable, setDisable] = useState(false);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);

  const editor = useRef(null);
  const [content, setContent] = useState('');

  const config = useMemo(() => ({
    readonly: false, // all options from https://xdsoft.net/jodit/docs/,
    placeholder: placeholder || ''
  }),
    [placeholder]
  );

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm();

  const saveProduct = async (data) => {
    const formData = { ...data, "description": content, "gallery": gallery }
    setDisable(true);
    const res = await fetch(`${apiUrl}/products`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${adminToken()}`
      },
      body: JSON.stringify(formData)
    }).then(res => res.json(data))
      .then(result => {
        setDisable(false);
        if (result.status == 200) {
          toast.success(result.message);
          navigate('/admin/products');

        } else {
          const formErrors = result.errors;
          Object.keys(formErrors).forEach((field) => {
            setError(field, { message: formErrors[field][0] });
          })
        }
      })
  }

  const fetchCategories = async () => {
    const res = await fetch(`${apiUrl}/categories`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${adminToken()}`
      }
    }).then(res => res.json())
      .then(result => {
        setCategories(result.data);
      })
  }

  const fetchBrands = async () => {
    const res = await fetch(`${apiUrl}/brands`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${adminToken()}`
      }
    }).then(res => res.json())
      .then(result => {
        setBrands(result.data);
      })
  }

  const handleFile = async (e) => {
    const formData = new FormData();
    const file = e.target.files[0];
    formData.append("image", file);
    setDisable(true);
    const res = await fetch(`${apiUrl}/temp-images`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${adminToken()}`
      },
      body: formData
    }).then(res => res.json())
      .then(result => {
        setGallery(prev => [...prev, result.image.id]);
        setGalleryImages(prev => [...prev, `${apiUrl}/uploads/temp/${result.image.name}`]);
        setDisable(false);
        e.target.value = ""
      })
  }

  const deleteImage = (image) => {
    const newGallery = galleryImages.filter(gallery => gallery != image);
    setGalleryImages(newGallery);
  }
  useEffect(() => {
    fetchCategories();
    fetchBrands();
  }, [])

  return (
    <Layout>
      <div className='container'>
        <div className='row'>
          <div className='d-flex justify-content-between mt-5 pb-3'>
            <h4 className='h4 pb-0 mb-0'>Productos / Crear</h4>
            <Link to="/admin/products" className="btn btn-primary">Regresar</Link>
          </div>
          <div className='col-md-3'>
            <Sidebar />
          </div>
          <div className='col-md-9'>
            <form onSubmit={handleSubmit(saveProduct)}>
              <div className='card shadow'>
                <div className='card-body p-4'>
                  <div className='mb-3'>
                    <label htmlFor="" className='form-label'>
                      Titulo
                    </label>
                    <input
                      {
                      ...register('title', {
                        required: 'El titulo es requerido'
                      })
                      }
                      type="text" className={`form-control ${errors.title && 'is-invalid'}`} placeholder='Titulo' />
                    {
                      errors.title && <p className='invalid-feedback'>{errors.title?.message}</p>
                    }
                  </div>
                  <div className='row'>
                    <div className='col-md-6'>
                      <div className='mb-3'>
                        <label className='form-label' htmlFor="">Categoria</label>
                        <select
                          {
                          ...register('category', {
                            required: 'Favor de seleccionar una categoria'
                          })
                          }
                          className={`form-control ${errors.category && 'is-invalid'}`}>
                          <option value="">Selecciona la categoria</option>
                          {
                            categories && categories.map((category) => {
                              return (
                                <option key={`category-${category.id}`} value={category.id}>{category.name}</option>
                              )
                            })
                          }
                        </select>
                        {
                          errors.category && <p className='invalid-feedback'>{errors.category?.message}</p>
                        }
                      </div>
                    </div>
                    <div className='col-md-6'>
                      <div className='mb-3'>
                        <label className='form-label' htmlFor="">Marca</label>
                        <select
                          {
                          ...register('brand', {
                          })
                          }
                          className={`form-control ${errors.brand && 'is-invalid'}`}>                          <option
                            value="">Selecciona la marca</option>
                          {
                            brands && brands.map((brand) => {
                              return (
                                <option key={`brand-${brand.id}`} value={brand.id}>{brand.name}</option>
                              )
                            })
                          }
                        </select>
                        {
                          errors.brand && <p className='invalid-feedback'>{errors.brand?.message}</p>
                        }
                      </div>
                    </div>
                  </div>
                  <div className='mb-3'>
                    <label htmlFor="" className='form-label'>Descripcion resumida</label>
                    <textarea
                      {
                      ...register('short_description', {
                      })
                      }
                      className='form-control' placeholder='Descripcion resumida' rows={3}></textarea>
                  </div>
                  <div className='mb-3'>
                    <label htmlFor="" className='form-label'>Descripcion detallada</label>
                    <JoditEditor
                      ref={editor}
                      value={content}
                      config={config}
                      tabIndex={1} // tabIndex of textarea
                      onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                    />
                  </div>
                  <h3 className='py-3 border-bottom mb-3'>Precios</h3>
                  <div className='row'>
                    <div className='col-md-6'>
                      <div className='mb-3'>
                        <label htmlFor="" className='form-label'>Precio</label>
                        <input
                          {
                          ...register('price', {
                            required: 'Favor de agregar un precio'
                          })
                          }
                          type="text" placeholder='Precio' className={`form-control ${errors.price && 'is-invalid'}`} />
                        {
                          errors.price && <p className='invalid-feedback'>{errors.price?.message}</p>
                        }
                      </div>
                    </div>
                    <div className='col-md-6'>
                      <div className='mb-3'>
                        <label htmlFor="" className='form-label'>Precio con descuento</label>
                        <input
                          {
                          ...register('compare_price', {
                          })
                          }
                          type="text" placeholder='Precio con descuento' className='form-control' />
                      </div>
                    </div>
                  </div>
                  <h3 className='py-3 border-bottom mb-3'>Inventario</h3>
                  <div className='row'>
                    <div className='col-md-6'>
                      <div className='mb-3'>
                        <label htmlFor="" className='form-label'>SKU</label>
                        <input
                          {
                          ...register('sku', {
                            required: 'Favor de añadir el sku'
                          })
                          }
                          type="text" placeholder='Sku' className={`form-control ${errors.sku && 'is-invalid'}`} />
                        {
                          errors.sku && <p className='invalid-feedback'>{errors.sku?.message}</p>

                        }
                      </div>
                    </div>
                    <div className='col-md-6'>
                      <div className='mb-3'>
                        <label htmlFor="" className='form-label'>Barcode</label>
                        <input
                          {
                          ...register('barcode', {
                          })
                          }
                          type="text" placeholder='Barcode' className='form-control' />
                      </div>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-md-6'>
                      <div className='mb-3'>
                        <label htmlFor="" className='form-label'>Cantidad</label>
                        <input
                          {
                          ...register('quantity', {
                          })
                          }
                          type="text" placeholder='Cantidad' className='form-control' />
                      </div>
                    </div>
                    <div className='col-md-6'>
                      <div className='mb-3'>
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
                  <div className='mb-3'>
                    <label htmlFor="" className='form-label'>
                      Destacado
                    </label>
                    <select
                      {
                      ...register('is_featured', {
                        required: 'Favor de seleccionar si el producto sera destacado'
                      })
                      }
                      className={`form-control ${errors.is_featured && 'is-invalid'}`}>
                      <option value="">Elige destacado</option>
                      <option value="1">Destacado</option>
                      <option value="0">No destacado</option>
                    </select>
                    {
                      errors.is_featured && <p className='invalid-feedback'>{errors.is_featured?.message}</p>
                    }
                  </div>
                  <h3 className='py-3 border-bottom mb-3'>Galeria</h3>
                  <div className='mb-3'>
                    <label htmlFor="" className='form-label'>Imagen</label>
                    <input
                      onChange={handleFile}
                      type="file" className='form-control' />
                  </div>
                  <div className='mb-3'>
                    <div className='row'>
                      {
                        galleryImages && galleryImages.map((image, index) => {
                          return (
                            <div className='col-md-3' key={`image-${index}`}>
                              <div className='card shadow'>
                                <img src={image} alt="" className='w-100' />
                                <button className='btn btn-danger' onClick={() => deleteImage(image)}>Eliminar</button>
                              </div>
                            </div>
                          )
                        })
                      }
                    </div>
                  </div>
                </div>
              </div>
              <button
                disabled={disable}
                type='submit' className='btn btn-primary mt-3 mb-5'>Crear</button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Create
