import useProduct from "../../../hooks/useProduct";
import ShoppingBag from "../../../svgIcons/ShoppingBag";

const CartIcon = () => {
  // const { state } = useCart();
  const { cartData } = useProduct();
   const getTotalItems = () => cartData.reduce((sum, item) => sum + item.quantity, 0);
  return (
    
      <a href="#" className="hover:text-gray-500 transition-colors flex">
        <ShoppingBag />
      { cartData.length > 0 && ( <span>{getTotalItems()}</span>)}
      </a>
    
  );
};

export default CartIcon;
