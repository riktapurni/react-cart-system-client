import { useEffect, useState } from "react";
import dropdownImg from "../../assets/img/dropdown_icon.png";
import SortFilter from "./SortFilter";
// import { products } from "../../database/productData";
import useProduct from "../../hooks/useProduct";
import CartSection from "./Cart/CartSection";
import CategoryFilter from "./CategoryFilter";
import ProductList from "./ProductList";

const ProductContent = () => {
  // const [sortType, setSortType] = useState("Most Popular");
  const [showFilter, setShowFilter] = useState(false);
  const [category, setCategory] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const { products, debouncedSearchTerm, sortType, setSortType, searchTerm, message } = useProduct();
   {/* Message Display */}

      
  const toggleCategory = (e) => {
    // if select the same which was already StylePropertyMapReadOnly, then remove and render all products
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();
    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }
    if(searchTerm){
      productsCopy = productsCopy.filter((product) =>
      product?.title
        .toLowerCase()
        .includes(debouncedSearchTerm.trim().toLowerCase())
    )
    }
    setFilterProducts(productsCopy);
  };
  
  
// const sortProducts = (a, b) => {
//     switch (sortType) {
//       case "price-asc":
//         return a.price - b.price;
//       case "price-desc":
//         return b.price - a.price;
//       case "newest":
//         return b.id - a.id;
//       case "most-popular":
//       default:
//         return b.rating.rate - a.rating.rate;
//     }
//   };
  const sortProducts = () => {
    let fpCopy = filterProducts.slice();
    switch (sortType) {
      case "price-asc":
       setFilterProducts(fpCopy.sort((a, b) => a.price - b.price))
       break;
      case "price-desc":
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price))
        break;
      case "newest":
       setFilterProducts(fpCopy.sort((a, b) => b.id - a.id))
       break
    //   case "most-popular":
    //      setFilterProducts(fpCopy.sort((a, b) => b.rating.rate - a.rating.rate))
    //  break
       default:
        setFilterProducts(fpCopy.sort((a, b) => b.rating.rate - a.rating.rate))
        // applyFilter()
        break
    }
  };
   useEffect(() => {
    sortProducts();
  }, [sortType]);

  useEffect(() => {
    applyFilter();
  }, [category, searchTerm]);
  //  const sortProducts = (option, data) => {
  //   switch (option) {
  //     case "Price: Low to High":
  //       return [...data].sort((a, b) => a.price - b.price);
  //     case "Price: High to Low":
  //       return [...data].sort((a, b) => b.price - a.price);
  //     case "Newest":
  //       return [...data].sort((a, b) => b.id - a.id); // Assuming higher ID = newer
  //     case "Most Popular":
  //     default:
  //       return [...data].sort((a, b) => b.rating?.count - a.rating?.count);
  //   }
  // };
  // const sortedProducts = sortProducts(sortOption, products);
  // let filteredProducts = products;
  // filteredProducts = [...filteredProducts]
  //   ?.filter((product) =>
  //     product?.title
  //       .toLowerCase()
  //       .includes(debouncedSearchTerm.trim().toLowerCase())
  //   )
    // ?.sort(sortProducts);
  return (
    
    <main className="container mx-auto px-4 md:px-8 py-8">
      {/* {message && (
        <div className={`fixed top-20 right-4 z-50 p-4 rounded-md shadow-lg ${
          message.type === 'success' 
            ? 'bg-green-100 text-green-800 border border-green-200' 
            : 'bg-red-100 text-red-800 border border-red-200'
        }`}>
          {message.text}
        </div>
      )} */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* <!-- Products Section (2/3 width on large screens) --> */}
        <div className="lg:col-span-2">
          <div className=" flex items-center justify-between mb-10">
            <h2 className="text-2xl font-bold">Your Products</h2>
            {/* category filter  */}
            <div className="relative flex flex-col items-center space-x-2">
              <span
                className=" text-sm flex gap-2 items-center cursor-pointer"
                onClick={() => setShowFilter(!showFilter)}
              >
                Filter{" "}
                <img
                  className={`h-3 ${showFilter ? "rotate-90" : ""}`}
                  src={dropdownImg}
                  alt=""
                />
              </span>
              {showFilter && <CategoryFilter toggleCategory={toggleCategory} />}
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm">Sort by:</span>
              {/* sort filter  */}
              <SortFilter />
            </div>
          </div>

          {/* <!-- Products Grid --> */}
          <ProductList products={products} />
        </div>

        {/* <!-- Cart Section (1/3 width on large screens) --> */}
        <CartSection />
      </div>
    </main>
  );
};

export default ProductContent;
