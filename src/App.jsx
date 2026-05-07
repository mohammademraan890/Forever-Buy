import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Orders from "./pages/Orders"
import PlaceOrders from "./pages/PlaceOrders"
import Cart from "./pages/Cart"
import Contact from "./pages/Contact"
import Product from "./pages/Product"
import Collection from "./pages/Collection"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
const App = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/place-orders" element={<PlaceOrders />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/collection" element={<Collection />} />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
