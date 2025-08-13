import UserIcon from "../../../svgIcons/UserIcon";
import CartIcon from "./CartIcon";
import Navbar from "./Navbar";
import Search from "./Search";

const Header = () => {
  return (
    <header className="border-b border-gray-200 py-4 px-4 md:px-8">
      <div className="container mx-auto flex items-center justify-between">
        <a href="#" className="text-2xl font-bold">
          LWS.SHOP
        </a>

        <Navbar />

        <div className="flex items-center space-x-4">
          <Search />

          <CartIcon />

          <a href="#" className="hover:text-gray-500 transition-colors">
            <UserIcon />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
