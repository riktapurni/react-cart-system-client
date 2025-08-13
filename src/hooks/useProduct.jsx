import React, { useContext } from 'react'
import { ProductContext } from '../context'

const useProduct = () => {
  return useContext(ProductContext)
}

export default useProduct