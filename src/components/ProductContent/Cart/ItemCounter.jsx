import React from 'react'
import useProduct from '../../../hooks/useProduct'

const ItemCounter = ({item}) => {
  const {updateCartQuantity} = useProduct()
  return (
    <div className="flex items-center space-x-2">
                  <button className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center" onClick={() => updateCartQuantity(item.id, item.quantity - 1)} >
                    −
                  </button>
                  <span className="text-sm">{item?.quantity}</span>
                  <button onClick={() => updateCartQuantity(item.id, item.quantity + 1)} className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">
                    +
                  </button>
                </div>
  )
}

export default ItemCounter