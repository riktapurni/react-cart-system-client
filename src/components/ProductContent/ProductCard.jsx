import useProduct from "../../hooks/useProduct";
import { getImgUrl } from "../../utils/getImgUrl";
import Rating from "./Rating";

const ProductCard = ({ product }) => {
  // const { title, price, stock, rating } = product;
  // const { state, dispatch } = useCart();
  const { cartData, handleAddToCart, removeItemFromCart } = useProduct();
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

  return (
    <div className="bg-gray-100 rounded-lg overflow-hidden transition-transform hover:scale-[1.02] duration-300">
      <div className="h-48 bg-gray-200 flex items-center justify-center">
        {/* {image && (
          <img
            src={getImgUrl(image)}
            alt={title}
            className="h-full w-auto object-cover"
          />
        )} */}
        <img
          src={getImgUrl(product?.image)}
          alt={product.title}
          className="h-full w-auto object-cover"
        />
      </div>
      <div className="p-4">
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
           {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </p>
        </div>
        <p className="font-bold">${product.price} </p>
        {/* {cartData?.find((item) => item.id === product.id) ? (
          <button
            className="w-full mt-2 bg-red-800 py-1 text-gray-100 rounded flex items-center justify-center"
            onClick={() => removeItemFromCart(product?.id)}
          >
            Remove from Cart
          </button> */}
        {/* // ) : */}
        {/* ( */}
        <button
          onClick={() => handleAddToCart(product)}
          // disabled={product?.stock <= 0}
          disabled={product.stock === 0}
          className="disabled:bg-gray-700 disabled:text-gray-400 disabled:cursor-not-allowed w-full mt-2 bg-gray-800 py-1 text-gray-100 rounded flex items-center justify-center active:translate-y-1 transition-all active:bg-gray-900"
        >
          {product?.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
        </button>
        {/* )} */}
      </div>
    </div>
  );
};

export default ProductCard;
