import React, { useReducer, useState } from 'react'
import { CartContext } from '../context'
import { cartReducer} from '../reducers/cartreducer'

const CartProvider = ({children}) => {
    // const [cartData, setCartData] = useState([])
    const [state, dispatch] = useReducer(cartReducer, [])
  return (
    <CartContext.Provider value={{state, dispatch}}>
        {children}
    </CartContext.Provider>
  )
}

export default CartProvider