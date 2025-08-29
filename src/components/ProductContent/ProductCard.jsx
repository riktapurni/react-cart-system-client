import { useState } from "react";
import useProduct from "../../hooks/useProduct";
import { getImgUrl } from "../../utils/getImgUrl";
import Rating from "./Rating";

const ProductCard = ({ product }) => {
  // const { title, price, stock, rating } = product;
  // const { state, dispatch } = useCart();
  const {
    cartData,
    addToCart,
    removeItemFromCart,
    message,
    setMessage,
    showMessage,
  } = useProduct();
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");

  // console.log("product.image:", product.image);
  // const product = products.find((p) => p.id === item.id);
  // const availableStock = product ? product.stock : 0;
  // const handleAddTocart = () => {
  //   dispatch({
  //     type: "ADD_TO_CART",
  //     payload: product,
  //   });
  //   toast.success(`Added ${product.title} has been added to the cart`);
  // };

  // const handleRemoveFromCart = () => {
  //   dispatch({
  //     type: "REMOVE_ITEM_FROM_CART",
  //     payload: product?.id,
  //   });
  //   toast.warning(`Deleted ${product.title} from the cart`);
  // };
  const handleAddToCart = () => {
    if (product.stock <= 0) {
      showMessage('This product is out of stock.');
      return;
    }

    addToCart(product, selectedSize, selectedColor);
    if (selectedSize && selectedColor) {
      setSelectedSize(null); // Reset selection after adding to cart
      setSelectedColor("");
    }
    
  };
  return (
    <div className="bg-gray-100 rounded-lg overflow-hidden transition-transform hover:scale-[1.02] duration-300">
      <div className="h-48 bg-gray-200 flex items-center justify-center">
        {product.image && (
          <img
            src={getImgUrl(product.image)}
            alt={product.title}
            className="h-full w-auto object-cover"
          />
        )}
        {/* <img
          src={getImgUrl(product?.image)}
          alt={product.title}
          className="h-full w-auto object-cover"
        /> */}
      </div>
      <div className="p-4 flex flex-col">
        <h3 className="font-medium">{product.title} </h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center my-1">
            <Rating />
            <span className="text-xs text-gray-500 ml-1">
              {product.rating.rate}
            </span>
          </div>
          {/* <span className={`text-sm font-semibold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>( {product.stock > 0 ? `In Stock: ${product.stock}` : 'Sold Out'} pcs left)</span> */}
          <p
            className={`text-sm font-semibold ${
              product.stock > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
          </p>
        </div>
        <div className="flex justify-between ">
          <p className="font-bold">${product.price} </p>
          {/* size  */}
          <div className="flex flex-col">
            <p className="text-sm">Select size</p>
            <div className="flex gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`text-xs border bg-gray-100 py-1 px-2 ${
                    selectedSize === size ? "bg-orange-300 border-red-500" : ""
                  } ${
                    product.stock <= 0
                      ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                      : ""
                  }`}
                  disabled={product.stock <= 0}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>
        {/* select colors  */}
        <div className="flex flex-col">
          <p className="text-sm">Select colors</p>
          <div className="flex gap-2">
            {product?.colors?.map((color) => (
              <button
                key={color.name}
                onClick={() => setSelectedColor(color)}
                className={`w-8 h-8 rounded-full border-2 transition-all relative ${
                  selectedColor.name === color.name
                    ? "border-orange-600 scale-110"
                    : "border-gray-300 hover:border-gray-400"
                } ${product.stock <= 0 ? "cursor-not-allowed" : ""}`}
                style={{ backgroundColor: color.value }}
                title={color.name}
                disabled={product.stock <= 0}
              >
                {selectedColor.name === color.name && (
                  <div className="absolute inset-0 rounded-full border-2 border-blue-600  bg-opacity-20 flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
                {color.name === "White" && (
                  <div className="absolute inset-0 rounded-full border border-gray-300 ">
                  </div>
                )}
              </button>
            ))}
          </div>
          {selectedColor && (
            <p className="text-sm text-gray-600 mt-1">
              Selected: {selectedColor.name}
            </p>
          )}
        </div>
        {/* <MessageDisplay /> */}
        {/* Message Display */}
        {/* {message && (
          <div className="text-sm text-red-600 text-center mt-2 p-2 bg-red-100 rounded-lg">
            {message}
          </div>
        )} */}

        {/* {cartData?.find((item) => item.id === product.id) ? (
          <button
            className="w-full mt-2 bg-red-800 py-1 text-gray-100 rounded flex items-center justify-center disabled:bg-gray-700 disabled:text-gray-400 disabled:cursor-not-allowed"
            onClick={() => removeItemFromCart(product?.id)}
            disabled={product.stock === 0}
          >
            {product?.stock > 0 ? "Remove From Cart" : "Out of Stock"}
          </button>
        ) : ( */}
        <button
          onClick={handleAddToCart}
          // disabled={product?.stock <= 0}
          // disabled={product.stock === 0}
          className={` w-full mt-2 bg-gray-800 py-1 text-gray-100 rounded flex items-center justify-center active:translate-y-1 transition-all ${
            product.stock <= 0
              ? "bg-gray-400 text-gray-700 cursor-not-allowed"
              : "cursor-pointer"
          }`}
        >
          {product?.stock > 0 ? "Add to Cart" : "Out of Stock"}
        </button>
        {/* )} */}
      </div>
    </div>
  );
};

export default ProductCard;
