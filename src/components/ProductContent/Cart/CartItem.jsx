import useProduct from "../../../hooks/useProduct";
import { getImgUrl } from "../../../utils/getImgUrl";

const CartItem = ({ item }) => {
  // const { dispatch } = useCart();
  const {  products, removeItemFromCart, updateCartQuantity, } =
    useProduct();
  const product = products.find((p) => p.id === item.id);
  // const availableStock = product ? product.stock : 0;

  // const handleRemoveFromCart = (id) => {
  //   dispatch({
  //     type: "REMOVE_ITEM_FROM_CART",
  //     payload: id,
  //   });
  //   toast.warning(`product has been deleted from the cart`);
  // };
  return (
    <div
     
      className="flex items-start space-x-4 pb-4 border-b border-gray-200 mb-4"
    >
      <div className="w-16 h-16 bg-gray-100 rounded flex-shrink-0 flex items-center justify-center">
        <img
          // src={item?.image} ite wont work
          src={getImgUrl(item?.image)}
          alt={item.title}
          className="h-full w-auto object-cover"
        />
      </div>
      <div className="flex-grow">
        <div className="flex justify-between">
          <h3 className="font-medium">{item?.title}</h3>
          {/* remove cart item from cart  */}
          <span
            className="text-red-500 text-sm cursor-pointer"
            // onClick={() => handleRemoveFromCart(item?.id)}
            onClick={() => removeItemFromCart(item?.cartId)}
          >
            ×
          </span>
        </div>
        <p className="text-sm text-gray-500">
          Size: {item?.size}
        </p>
        <div className="flex gap-2 items-center">
          <p className="text-sm text-gray-500">Color:</p>
        <span>{item.color}</span> 
         <div 
            className="w-4 h-4 rounded-full border border-gray-300" 
            style={{ backgroundColor: item.colorValue }}
            title={item.color}
          ></div>
          </div>
        <div className="flex justify-between items-center mt-2">
          <div>
            <p className="text-sm font-medium">
              ${item?.price.toFixed(2)} each
            </p>
            <p className=" mt-1 font-semibold text-green-600 ">
              Subtotal: ${(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center"
              onClick={() => updateCartQuantity(item.cartId, item.quantity - 1)}
            >
              −
            </button>
            <span className="text-sm">{item?.quantity}</span>
            <button
              onClick={() => updateCartQuantity(item.cartId, item.quantity + 1)}
              // disabled={product.stock <= 0}
              className={`w-6 h-6  rounded flex items-center justify-center ${product.stock <= 0 ?"cursor-not-allowed bg-gray-700 text-gray-400" : "bg-gray-100 hover:bg-gray-400"} `}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
