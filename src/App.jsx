import { ToastContainer } from "react-toastify";
import Header from "./components/layout/Header/Header"
import Layout from "./components/layout/Layout"
import HomePage from "./Pages/HomePage"
import CartProvider from "./providers/CartProvider"
import ProductProvider from "./providers/ProductProvider"
import "react-toastify/dist/ReactToastify.css";

function App() {
 

  return (
    <>
    <ProductProvider>
    <CartProvider>
     <Layout>
      <HomePage />
      <ToastContainer autoClose={2000} />
     </Layout>
     </CartProvider>
     </ProductProvider>
    </>
  )
}

export default App
