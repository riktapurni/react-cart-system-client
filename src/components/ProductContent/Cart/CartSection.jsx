import { useMemo } from "react";
import useCart from "../../../hooks/useCart";
import CartItem from "./CartItem";
import useProduct from "../../../hooks/useProduct";

const CartSection = () => {
  // const { state: cart} = useCart();
  const {cartData, discount} = useProduct()

  // calculate cart total amount
  const cartSubTotal = useMemo(() => {
    return cartData?.reduce((total, item) => total + (item.price*item.quantity), 0);
  }, [cartData]);
  // Function to calculate the total price of all items in the cart
  // const cartTotal = () => {
  //   return cartData.reduce((total, item) => total + item.price , 0).toFixed(2);
  // };
  const discountAmount = (cartSubTotal * discount)/100
  const deliveryFee = cartData.length > 0 ? 15 : 0;
   const total = cartSubTotal - discountAmount + deliveryFee;
  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h2 className="text-2xl font-bold mb-6">YOUR CART</h2>
{cartData.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  {/* <ShoppingCart size={48} className="mx-auto mb-2 opacity-50" /> */}
                  <p>Your cart is empty</p>
                </div>
              ) : ( <>
 {/* <!-- Cart Item  --> */}
 
        {cartData?.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
        {/* <!-- Order Summary --> */}
        <div className="mt-6">
          <h3 className="font-bold text-lg mb-4">Order Summary</h3>

          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">${cartSubTotal.toFixed(2)}</span>
            </div>
            {discount > 0 && (<div className="flex justify-between text-red-500">
              <span>Discount ({discount}%)</span>
              <span>-${discountAmount.toFixed(2)}</span>
            </div>)
            }
            {deliveryFee > 0 && (<div className="flex justify-between">
              <span className="text-gray-600">Delivery Fee</span>
              <span className="font-medium">${deliveryFee}</span>
            </div>)
            }
            <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          {/* <!-- Promo Code --> */}
          <div className="flex items-center space-x-2 mb-6">
            <div className="flex-grow relative">
              <input
                type="text"
                placeholder="Add promo code"
                className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm"
              />
              <span className="absolute left-3 top-2.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
              </span>
            </div>
            <button className="bg-black text-white rounded-md px-4 py-2 text-sm">
              Apply
            </button>
          </div>

          {/* <!-- Checkout Button --> */}
          <a
            href="#"
            className="block bg-black text-white text-center py-3 rounded-md hover:bg-gray-800 transition-colors"
          >
            Go to Checkout
            <span className="inline-block ml-2">→</span>
          </a>
        </div>
        </>
              )
              
              }
       
      </div>
    </div>
  );
};

export default CartSection;
