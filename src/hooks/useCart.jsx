import React, { useContext } from 'react'
import { CartContext } from '../context'

const useCart = () => {
  return useContext(CartContext)
}

export default useCart