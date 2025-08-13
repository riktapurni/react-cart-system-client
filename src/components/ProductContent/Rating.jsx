import React from 'react'
import Star from "../../assets/star.svg"
const Rating = ({ value }) => {
    const stars = Array(value).fill(Star)
  return (
    <>
     {stars?.map((star, index) => (
                    <div class="flex text-yellow-400">
                    <span>★</span><span class="text-gray-300">★</span><span class="text-gray-300">★</span><span class="text-gray-300">★</span><span class="text-gray-300">★</span>
                  </div>
                   )) }

                  </>
  )
}

export default Rating