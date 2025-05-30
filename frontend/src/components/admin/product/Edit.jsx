import React, { useEffect, useState, useRef, useMemo } from 'react'
import Layout from '../../common/Layout'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Sidebar from '../../common/Sidebar'
import { useForm } from 'react-hook-form'
import { adminToken, apiUrl } from '../../common/http'
import { toast } from 'react-toastify'
import JoditEditor from 'jodit-react'


const Edit = ({ placeholder }) => {
  const [disable, setDisable] = useState(false);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [sizesChecked, setSizesChecked] = useState([]);
  const [productImages, setProductImages] = useState([]);
  const params = useParams();
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
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: async () => {
      const res = await fetch(`${apiUrl}/products/${params.id}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${adminToken()}`
        }
      }).then(res => res.json())
        .then(result => {
          setProductImages(result.data.product_images)
          setSizesChecked(result.productSizes)
          reset({
            title: result.data.title,
            barcode: result.data.barcode,
            description: result.data.description,
            category: result.data.category_id,
            brand: result.data.brand_id,
            short_description: result.data.description,
            sku: result.data.sku,
            quantity: result.data.quantity,
            price: result.data.price,
            compare_price: result.data.compare_price,
            status: result.data.status,
            is_featured: result.data.is_featured

          })
        })
    }
  });
  const saveProduct = async (data) => {
    const formData = { ...data, "description": content }
    setDisable(true);
    const res = await fetch(`${apiUrl}/products/${params.id}`, {
      method: 'PUT',
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

  const fetchSizes = async () => {
    const res = await fetch(`${apiUrl}/sizes`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${adminToken()}`
      }
    }).then(res => res.json())
      .then(result => {
        setSizes(result.data);
      })
  }

  const handleFile = async (e) => {
    const formData = new FormData();
    const file = e.target.files[0];
    formData.append("image", file);
    formData.append("product_id", params.id);
    setDisable(true)

    const res = await fetch(`${apiUrl}/save-product-image`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${adminToken()}`
      },
      body: formData
    })
      .then(res => res.json())
      .then(result => {
        if (result.status == 200) {
          productImages.push(result.image);
          setProductImages(productImages);
        } else {
          toast.error(result.errors.image[0]);
        }
        setDisable(false)
        e.target.value = "";
      })

  }


  const deleteImage = async (id) => {
    if(confirm("¿Estas seguro que deseas eliminar la imagen?"))
    try {
      const res = await fetch(`${apiUrl}/delete-product-image/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${adminToken()}`
        }
      });

      const result = await res.json();

      if (result.status == 200) {
        const newProductImages = productImages.filter(productImage => productImage.id != id);
        setProductImages(newProductImages);
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Error al eliminar la imagen.");
      console.error(error);
    }
  };


  const changeImage = async (image) => {
    try {
      const res = await fetch(`${apiUrl}/change-product-default-image?product_id=${params.id}&image=${image}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${adminToken()}`
        }
      });

      const result = await res.json();

      if (result.status === 200) {
        toast.success(result.message);
      } else {
        toast.error("Algo salió mal: " + JSON.stringify(result));
        console.log("Respuesta:", result);
      }

    } catch (error) {
      console.error("ERROR en fetch:", error);
      toast.error("Error al conectar con el servidor");
    }
  }

  useEffect(() => {
    fetchCategories();
    fetchBrands();
    fetchSizes();
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
                      value={content ?? ""}
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
                  <div className='mb-3'>
                    <label htmlFor="" className='form-label'>
                      Tallas
                    </label>
                    {
                      sizes && sizes.map(size => {
                        return (
                          <div className="form-check-inline ps-2" key={`psize${size.id}`}>
                            <input
                              {
                              ...register("sizes")
                              }
                              checked={sizesChecked.includes(size.id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSizesChecked([...sizesChecked, size.id])
                                } else {
                                  setSizesChecked(sizesChecked.filter(sid => size.id != sid))
                                }
                              }}
                              className="form-check-input" type="checkbox" value={size.id} id={`size-${size.id}`} />
                            <label className="form-check-label ps-2" htmlFor={`size-${size.id}`}>
                              {size.name}
                            </label>
                          </div>
                        )
                      })
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
                        productImages && productImages.map((productImage, index) => {
                          return (
                            <div className='col-md-3' key={index}>
                              <div className='card shadow'>
                                <img src={productImage.image_url} alt="" className='w-100' />
                              </div>
                              <button type='button' className='btn btn-danger mt-3 w-100' onClick={() => deleteImage(productImage.id)}>Eliminar</button>
                              <button type='button' className='btn btn-secondary mt-3 mb-3 w-100' onClick={() => changeImage(productImage.image)}>Establecer como Principal</button>
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
                type='submit' className='btn btn-primary mt-3 mb-5'>Actualizar</button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )

}
export default Edit

