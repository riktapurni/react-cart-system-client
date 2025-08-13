import React from 'react'
import useProduct from '../../hooks/useProduct'

const SortFilter = ({sortOption, setSortOption}) => {
  const {sortBy, handleSort, sortType, setSortType,} = useProduct()
  return (
    <select className="border rounded-md px-2 py-1 text-sm" value={sortType} name="sortBy" onChange={(e) => setSortType(e.target.value)}>
              <option value="most-popular">Most Popular</option>
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
  )
}

export default SortFilter