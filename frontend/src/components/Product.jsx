import { useEffect, useState, useRef, useContext } from 'react'
import Layout from './common/Layout';
import { Link, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Thumbs, FreeMode, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { Rating } from 'react-simple-star-rating';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import { apiUrl } from './common/http';
import { CartContext } from './context/Cart';
import { toast } from 'react-toastify';


const Product = () => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [rating, setRating] = useState(3);
    const [product, setProduct] = useState([]);
    const [productImages, setProductImages] = useState([]);
    const [productSizes, setProductSizes] = useState([]);
    const [sizeSelected, setSizeSelected] = useState(null);
    const params = useParams();
    const { addToCart } = useContext(CartContext);

    const swiperRef = useRef(null);
    const timeoutId = useRef(null);

    const handleUserInteraction = () => {
        const swiper = swiperRef.current;
        if (!swiper || !swiper.autoplay) return;
        swiper.autoplay.stop();
        if (timeoutId.current) clearTimeout(timeoutId.current);
        timeoutId.current = setTimeout(() => {
            if (swiper.autoplay) swiper.autoplay.start();
        }, 5000);
    };

    const fetchProduct = () => {

        fetch(`${apiUrl}/get-product/${params.id}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
            }
        }).then(res => res.json())
            .then(result => {
                if (result.status == 200) {
                    setProduct(result.data);
                    setProductImages(result.data.product_images)
                    setProductSizes(result.data.product_sizes)
                } else {
                    console.log("Algo salio mal");
                }
            })

    }
    const handleAddToCart = () => {
        if (productSizes.length > 0) {
            if (sizeSelected == null) {
                toast.error("Favor de seleccionar una talla")
            } else {
                addToCart(product, sizeSelected)
                toast.success("Se agrego un producto al carrito")

            }
        } else {
            addToCart(product, null)
            toast.success("Se agrego un producto al carrito")
        }

    }
    useEffect(() => {
        fetchProduct();
    }, [])

    if (!productImages.length) return null;

    return (
        <Layout>
            <div className='container product-detail'>
                <div className='row'>
                    <div className='col-md-12'>
                        <nav aria-label="breadcrumb" className='py-4'>
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
                                <li className="breadcrumb-item" aria-current="page"><Link to="/shop">Tienda</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">{product.title}</li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <div className='row mb-5'>
                    <div className='col-md-5'>
                        <div className='row'>
                            <div className='col-2'>
                                <Swiper
                                    onSwiper={setThumbsSwiper}
                                    loop={true}
                                    direction="vertical"
                                    spaceBetween={10}
                                    slidesPerView={6}
                                    freeMode={true}
                                    watchSlidesProgress={true}
                                    modules={[FreeMode, Navigation, Thumbs, Autoplay]}
                                    autoplay={{
                                        delay: 1000,
                                        disableOnInteraction: false,
                                    }}
                                    className="mySwiper mt-2"
                                    onTouchEnd={handleUserInteraction}
                                    onMouseLeave={handleUserInteraction}
                                    onSlideChange={handleUserInteraction}
                                >
                                    {productImages.map(product_image => (
                                        <SwiperSlide key={`thumb-${product_image.id}`}>
                                            <img
                                                src={product_image.image_url}
                                                alt=""
                                                height={100}
                                                className='w-100'
                                            />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                            <div className='col-10'>
                                <Swiper
                                    style={{
                                        '--swiper-navigation-color': '#54e6e3',
                                        '--swiper-pagination-color': '#54e6e3',
                                    }}
                                    onSwiper={(swiper) => {
                                        swiperRef.current = swiper;
                                    }}
                                    loop={true}
                                    spaceBetween={10}
                                    navigation={true}
                                    thumbs={{ swiper: thumbsSwiper }}
                                    modules={[FreeMode, Navigation, Thumbs, Autoplay]}
                                    className="mySwiper2"
                                    autoplay={{
                                        delay: 1000,
                                        disableOnInteraction: false,
                                    }}
                                    onTouchEnd={handleUserInteraction}
                                    onMouseLeave={handleUserInteraction}
                                    onSlideChange={handleUserInteraction}
                                >
                                    {productImages.map(product_image => (
                                        <SwiperSlide key={`image-${product_image.id}`}>
                                            <img
                                                src={product_image.image_url}
                                                alt=""
                                                className='w-100'
                                            />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-7'>
                        <h2>{product.title}</h2>
                        <div className='d-flex'>
                            <Rating
                                size={20}
                                readonly
                                initialValue={rating}
                            />
                            <span className='pt-1 ps-2'> 10 reseñas</span>
                        </div>
                        <div className='price h3 py-3'>
                            ${product.price} <span className='text-decoration-line-through'>${product.compare_price}</span>

                        </div>
                        <div>
                            {product.short_description} <br />
                            Pagas al entregar <br />
                            15 dias de devolucion o cambios
                        </div>

                        <div className='pt-3'>
                            <strong>Seleccionar talla</strong>
                            <div className='sizes pt-2'>
                                {
                                    productSizes && productSizes.map(product_size => {
                                        return (
                                            <button
                                                onClick={() => setSizeSelected(product_size.size.name)}
                                                key={`size-${product_size.size.id}`}
                                                className={`btn btn-size me-2 ${sizeSelected == product_size.size.name ? 'active' : ''}`} > {product_size.size.name}</button>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className='add-to-cart my-4'>
                            <button
                                onClick={() => handleAddToCart()}
                                className='btn btn-primary text-uppercase'>Añadir al carrito</button>
                        </div>
                        <hr />
                        <div>
                            <strong>SKU:</strong>
                            {product.sku}
                        </div>
                    </div>
                </div>
                <div className='row pb-5'>
                    <div className='col-md-12'>
                        <Tabs
                            defaultActiveKey="description"
                            id="uncontrolled-tab-example"
                            className="mb-3"
                        >
                            <Tab eventKey="description" title="Descripcion">
                                <div dangerouslySetInnerHTML={{ __html: product.description }}>
                                </div>                            </Tab>
                            <Tab eventKey="review" title="Reseñas (10)">
                                Tab content for Reseñas
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </div>
        </Layout >
    )
}

export default Product
