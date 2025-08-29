import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ProductContext } from "../context";
import { initialProducts } from "../database/productData";
import useDebounceValue from "../hooks/useDebounce";

const ProductProvider = ({ children }) => {
  // const [sortBy, setSortBy] = useState('')
  const [products, setProducts] = useState(initialProducts);
  const [sortType, setSortType] = useState("most-popular");
  const [searchTerm, setSearchTerm] = useState("");
  const [cartData, setCartData] = useState([]);
const [message, setMessage] = useState("")
//state fpr clean up setTimeout
const [messageTimeout, setMessageTimeout] = useState(null);
  const discount = 20;

   const showMessage = (text, type = 'error') => {
    // Clear any existing timeout
    if (messageTimeout) {
      clearTimeout(messageTimeout);
    }
    setMessage({ text, type });
     // Set new timeout and store its ID
    const timeoutId = setTimeout(() => setMessage(''), 3000);
    setMessageTimeout(timeoutId)
     
  }
  // Function to add a product to the cart
 const addToCart = (product, selectedSize, selectedColor) => {
    if (!selectedSize) {
      showMessage('Please select a size', 'error');
      return;
    }
    if (!selectedColor) {
      showMessage('Please select a color', 'error');
      return;
    }

    if (product.stock <= 0) {
      showMessage('Product is out of stock', 'error');
      return;
    }

    const existingItem = cartData.find(
      item => item.id === product.id && item.size === selectedSize && item.color === selectedColor.name
    );

    if (existingItem) {
      setCartData(cartData.map(item =>
        item.id === product.id && item.size === selectedSize && item.color === selectedColor.name
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartData([...cartData, {
        ...product,
        size: selectedSize,
        color: selectedColor.name,
        colorValue: selectedColor.value,
        quantity: 1,
        cartId: `${product.id}-${selectedSize}-${selectedColor.name}`
      }]);
      showMessage(`${product.title} (Size ${selectedSize}), (Color ${selectedColor.name}) added to cart!`, 'success');
    }

    // Decrease product stock
    setProducts(products.map(p =>
      p.id === product.id
        ? { ...p, stock: p.stock - 1 }
        : p
    ));
  };
    
  // Function to remove an item from the cart  (claude ai) // new code

  const removeItemFromCart = (cartId) => {
    const cartItem = cartData.find((item) => item.cartId === cartId);
    if (!cartItem) return;
     // Restore stock when removing item
    const quantityToRestore = cartItem.quantity;
    setCartData(cartData.filter((item) => item.cartId !== cartId));
   
    setProducts(
      products.map((p) =>
        p.id === cartItem.id ? { ...p, stock: p.stock + quantityToRestore } : p
      )
    );
  };
  // Function to update the quantity of an item in the cart(gemini nai)
  // const updateCartQuantity = (productId, newQuantity) => {
  //   setCartData((prevCart) => {
  //     const oldItem = prevCart.find((item) => item.id === productId);
  //     const oldQuantity = oldItem ? oldItem.quantity : 0;
  //     const stockChange = newQuantity - oldQuantity;

  //     if (newQuantity <= 0) {
  //       // If quantity is 0 or less, remove the item from the cart
  //       setProducts((prevProducts) =>
  //         prevProducts.map((product) =>
  //           product.id === productId
  //             ? { ...product, stock: product.stock + oldQuantity }
  //             : product
  //         )
  //       );
  //       return prevCart.filter((item) => item.id !== productId);
  //     } else {
  //       // Otherwise, update the quantity
  //       setProducts((prevProducts) =>
  //         prevProducts.map((product) =>
  //           product.id === productId
  //             ? { ...product, stock: product.stock - stockChange }
  //             : product
  //         )
  //       );
  //       return prevCart.map((item) =>
  //         item.id === productId ? { ...item, quantity: newQuantity } : item
  //       );
  //     }
  //   });
  // };
  // claud ai
  // const updateCartQuantity = (productId, newQuantity) => {
  //   const cartItem = cartData.find((item) => item.id === productId);
  //   const currentProduct = products.find((p) => p.id === productId);

  //   if (newQuantity <= 0) {
  //     removeItemFromCart(productId);
  //     return;
  //   }

  //   const quantityDifference = newQuantity - cartItem.quantity;

  //   // Check if we have enough stock for increase
  //   if (quantityDifference > 0 && currentProduct.stock < quantityDifference) {
  //     alert(`Sorry, only ${currentProduct.stock} items left in stock`);
  //     return;
  //   }

  //   setCartData((prevCart) =>
  //     prevCart.map((item) =>
  //       item.id === productId ? { ...item, quantity: newQuantity } : item
  //     )
  //   );

  //   // Update stock based on quantity change
  //   setProducts((prevProducts) =>
  //     prevProducts.map((p) =>
  //       p.id === productId ? { ...p, stock: p.stock - quantityDifference } : p
  //     )
  //   );
  // };
  const updateCartQuantity =(cartId, newQuantity) => {
    const cartItem = cartData.find((item) => item.cartId === cartId)
     if (!cartItem) return;
      const product = products.find(p => p.id === cartItem.id);
    if (!product) return;
    if(newQuantity === 0){
      // Remove item and restore stock
      const quantityToRestore = cartItem.quantity;
      setCartData((cartData.filter((item) => item.cartId !== cartId)))
      setProducts(products.map((p) => p.id === cartItem.id ? {...p, stock:p.stock + quantityToRestore} : p))
    }else if (newQuantity > cartItem.quantity) {
      // Increasing quantity - check stock
      if (product.stock > 0) {
        setCartData(cartData.map(item =>
          item.cartId === cartId
            ? { ...item, quantity: newQuantity }
            : item
        ));
        setProducts(products.map(p =>
          p.id === cartItem.id
            ? { ...p, stock: p.stock - 1 }
            : p
        ));
      } else {
        showMessage('Not enough stock available', 'error');
      }
    }else {
      // Decreasing quantity - restore stock
      setCartData(cartData.map(item =>
        item.cartId === cartId
          ? { ...item, quantity: newQuantity }
          : item
      ));
      setProducts(products.map(p =>
        p.id === cartItem.id
          ? { ...p, stock: p.stock + 1 }
          : p
      ));
    }
  }
  // const handleSort = (sortBy) => {
  //     setSortBy(sortBy)
  // }
  const handleSearchInputeChange = (input) => {
    setSearchTerm(input);
  };
  // debounce the search term with a 500ms delay
  const debouncedSearchTerm = useDebounceValue(searchTerm, 500);
  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (messageTimeout) {
        clearTimeout(messageTimeout);
      }
    };
  }, [messageTimeout]);
  const productInfo = {
    products,
    addToCart,
    removeItemFromCart,
    sortType,
    setSortType,
    searchTerm,
    handleSearchInputeChange,
    debouncedSearchTerm,
    cartData,
    discount,
    updateCartQuantity,
    message,
     setMessage,
     showMessage
  };
  return (
    <ProductContext.Provider value={productInfo}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
