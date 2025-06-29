import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartData, setCartData] = useState(JSON.parse(localStorage.getItem('cart')) || []);

    const addToCart = (product, size = null) => {
        let updatedCart = [...cartData];

        const generateItemId = () => `${product.id}-${Math.floor(Math.random() * 10000000)}`;

        const createCartItem = () => ({
            id: generateItemId(),
            product_id: product.id,
            size: size,
            title: product.title,
            price: product.price,
            qty: 1,
            image_url: product.image_url
        });

        // Si el carrito está vacío
        if (updatedCart.length === 0) {
            updatedCart.push(createCartItem());
        } else {
            if (size != null) {
                const isProductExist = updatedCart.find(item =>
                    item.product_id === product.id && item.size === size
                );

                if (isProductExist) {
                    updatedCart = updatedCart.map(item =>
                        item.product_id === product.id && item.size === size
                            ? { ...item, qty: item.qty + 1 }
                            : item
                    );
                } else {
                    updatedCart.push(createCartItem());
                }
            } else {
                const isProductExist = updatedCart.find(item =>
                    item.product_id === product.id && item.size === null
                );

                if (isProductExist) {
                    updatedCart = updatedCart.map(item =>
                        item.product_id === product.id && item.size === null
                            ? { ...item, qty: item.qty + 1 }
                            : item
                    );
                } else {
                    updatedCart.push(createCartItem());
                }
            }
        }
        setCartData(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };
    const shipping = () => {
        return 0;
    }
    const subTotal = () => {
        let subtotal = 0;
        cartData.map(item => {
            subtotal += item.qty * item.price;
        })
        return subtotal;
    }
    const total = () => {
        return subTotal() + shipping();
    }

    const updatedCartItem = (itemId, newQty)=>{
        let updatedCart = [...cartData];
        updatedCart = updatedCart.map(item => (item.id == itemId) ? { ...item, qty: newQty } : item)
        setCartData(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));

    }
    const deleteCartItem=(itemId)=>{
        const newCartData=cartData.filter(item=>item.id!=itemId)
        setCartData(newCartData)
        localStorage.setItem('cart',JSON.stringify(newCartData))
    }
    const getQty=()=>{
        let qty=0;
        cartData.map(item=>{
            qty+=parseInt(item.qty)
        })
        return qty;
    }
    return (
        <CartContext.Provider value={{ addToCart, cartData, total, subTotal, shipping, updatedCartItem,deleteCartItem,getQty}}>
            {children}
        </CartContext.Provider>
    );
};
