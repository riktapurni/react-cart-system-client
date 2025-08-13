import { useState } from "react";
import { ProductContext } from "../context";
import { initialProducts } from "../database/productData";
import useDebounceValue from "../hooks/useDebounce";

const ProductProvider = ({ children }) => {
  // const [sortBy, setSortBy] = useState('')
  const [products, setProducts] = useState(initialProducts);
  const [sortType, setSortType] = useState("most-popular");
  const [searchTerm, setSearchTerm] = useState("");
  const [cartData, setCartData] = useState([]);
  const discount = 20;
  // Function to add a product to the cart
 const handleAddToCart = (productToAdd) => {
    // Check if the item is in stock before adding
    if (productToAdd.stock > 0) {
    //  const currentProduct = products.find(p => p.id === productToAdd.id);
    // if (currentProduct?.stock <= 0) return;

      setCartData((prevCart) => {
        const existingItem = prevCart.find((item) => item.id === productToAdd.id);
        if (existingItem) {
          // If item already exists, increase the quantity
          return prevCart.map((item) =>
            item.id === productToAdd.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          // Otherwise, add new item with quantity 1
          return [...prevCart, { ...productToAdd, quantity: 1 }];
        }
      });

      // Decrease the stock for the added product
      setProducts(prevProducts =>
      prevProducts.map(p =>
        p.id === productToAdd.id && p.stock > 0
          ? { ...p, stock: p.stock - 1 }
          : p
      )
    );
    }
  };
  // Function to remove an item from the cart
    const removeItemFromCart = (productId) => {
    const cartItem = cartData.find(item => item.id === productId);
    if (cartItem) {
      // Restore stock
      setProducts(prevProducts =>
        prevProducts.map(p =>
          p.id === productId
            ? { ...p, stock: p.stock + cartItem.quantity }
            : p
        )
      );
    }
    setCartData(prevCart => prevCart.filter(item => item.id !== productId));
  };
 
  // Function to update the quantity of an item in the cart(gemini nai)
// const updateCartQuantity = (productId, newQuantity) => {
//     setCartData((prevCart) => {
//       const oldItem = prevCart.find((item) => item.id === productId);
//       const oldQuantity = oldItem ? oldItem.quantity : 0;
//       const stockChange = newQuantity - oldQuantity;

//       if (newQuantity <= 0) {
//         // If quantity is 0 or less, remove the item from the cart
//         setProducts((prevProducts) =>
//           prevProducts.map((product) =>
//             product.id === productId
//               ? { ...product, stock: product.stock + oldQuantity }
//               : product
//           )
//         );
//         return prevCart.filter((item) => item.id !== productId);
//       } else {
//         // Otherwise, update the quantity
//         setProducts((prevProducts) =>
//           prevProducts.map((product) =>
//             product.id === productId
//               ? { ...product, stock: product.stock - stockChange }
//               : product
//           )
//         );
//         return prevCart.map((item) =>
//           item.id === productId ? { ...item, quantity: newQuantity } : item
//         );
//       }
//     });
//   };
const updateCartQuantity = (productId, newQuantity) => {
    const cartItem = cartData.find(item => item.id === productId);
    const currentProduct = products.find(p => p.id === productId);
    
    if (newQuantity <= 0) {
      removeItemFromCart(productId);
      return;
    }

    const quantityDifference = newQuantity - cartItem.quantity;
    
    // Check if we have enough stock for increase
    if (quantityDifference > 0 && currentProduct.stock < quantityDifference) {
      alert(`Sorry, only ${currentProduct.stock} items left in stock`);
      return;
    }

    setCartData(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );

    // Update stock based on quantity change
    setProducts(prevProducts =>
      prevProducts.map(p =>
        p.id === productId
          ? { ...p, stock: p.stock - quantityDifference }
          : p
      )
    );
  };

  // const handleSort = (sortBy) => {
  //     setSortBy(sortBy)
  // }
  const handleSearchInputeChange = (input) => {
    setSearchTerm(input);
  };
  // debounce the search term with a 500ms delay
  const debouncedSearchTerm = useDebounceValue(searchTerm, 500);
  const productInfo = {
    products,
    handleAddToCart,
    removeItemFromCart,
    sortType,
    setSortType,
    searchTerm,
    handleSearchInputeChange,
    debouncedSearchTerm,
    cartData,
    discount,
    updateCartQuantity,
  };
  return (
    <ProductContext.Provider value={productInfo}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
