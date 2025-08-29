import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/layout/Layout";
import HomePage from "./Pages/HomePage";
import CartProvider from "./providers/CartProvider";
import ProductProvider from "./providers/ProductProvider";
import MessageDisplay from "./components/MessageDisplay";

function App() {
  return (
    <>
      <ProductProvider>
        <MessageDisplay />
        <ToastContainer position="top-center" autoClose={2000} />
        <CartProvider>
          <Layout>
            <HomePage />
          </Layout>
        </CartProvider>
      </ProductProvider>
    </>
  );
}

export default App;
