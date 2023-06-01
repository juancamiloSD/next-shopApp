import { FC, useReducer, ReactNode, useEffect } from 'react';
import Cookie from 'js-cookie'

import { ICartProduct } from '@/interfaces/cart';
import { cartReducer } from './cartReducer';
import { CartContext } from './CartContext';
import { OrderSummary } from '../../components/cart/OrderSummary';

export interface CartState{
    cart: ICartProduct[],
    numberOfItems: number,
    subTotal: number,
    taxRate: number,
    total: number
}

const CART_INITIAL_STATE: CartState = {
    cart: [],
    numberOfItems: 0,
    subTotal: 0,
    taxRate: 0,
    total: 0
}

interface Props {
    children: ReactNode
}

export const CartProvider:FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE)

    useEffect(() => {
        try {
            const cookieProducts = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')! ) : []
            dispatch({ type: '[Cart] - LoadCart from cookies | storage', payload: cookieProducts })
        } catch (error) {
            dispatch({ type: '[Cart] - LoadCart from cookies | storage', payload: [] })
        }
    }, [])
    

    useEffect(() => {
      Cookie.set('cart', JSON.stringify(state.cart))
    }, [state.cart])

    useEffect(() => {

        const numberOfItems = state.cart.reduce( ( prev, current ) => current.quantity + prev, 0)
        const subTotal = state.cart.reduce( ( prev, current ) => (current.quantity * current.price) + prev, 0)
        const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0)

        const OrderSummary = {
            numberOfItems,
            subTotal,
            taxRate: subTotal * taxRate,
            total: subTotal * ( taxRate + 1 )
        }

        dispatch({ type: '[Cart] - Update order summary', payload: OrderSummary })
    }, [state.cart])
    

    const updateCartQuantity = ( product: ICartProduct ) => {
        dispatch({ type: '[Cart] - Change cart quantity', payload: product })
    } 

    const addProductToCart = ( product: ICartProduct ) => {

        const productInCart = state.cart.some(item => item._id === product._id)
        if( !productInCart ) return dispatch({ type: '[Cart] - Update products in cart', payload: [...state.cart, product] })

        const productInCartButDifferentSize = state.cart.some( item => item._id === product._id && item.size === product.size )
        if( !productInCartButDifferentSize ) return dispatch({ type: '[Cart] - Update products in cart', payload: [...state.cart, product] })

        const updatedProducts = state.cart.map( item => {
            if( item._id !== product._id ) return item
            if( item.size !== product.size ) return item

            item.quantity += product.quantity
            return item
        })

        dispatch({ type: '[Cart] - Update products in cart', payload: [...updatedProducts] })
    }

    const removeCartProduct = ( product: ICartProduct ) => {
        dispatch({ type: '[Cart] - Remove product in cart', payload: product })        

    }

    return (
        <CartContext.Provider value={{
            ...state,
            addProductToCart,
            updateCartQuantity,
            removeCartProduct
        }}>
            { children }
        </CartContext.Provider>
    )
}
