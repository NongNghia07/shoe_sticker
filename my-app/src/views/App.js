import './App.css';
import { Routes, Route } from "react-router-dom";

import Product from '../components/layout/staff/product/Product';
import HomeLayout from '../components/layout/HomeLayout';
import AdminLayout from '../components/layout/AdminLayout';
import ProductDetail from '../components/layout/staff/product/ProductDetail';
import SizeOrColor from '../components/layout/staff/sizeAndColor/SizeOrColor';
import LayoutSign_In_Up from '../components/layout/signIn_signUp/LayoutSign_In_Up';
import Category from '../components/layout/staff/category/Category';

import "../css/Custom.css"
import "../css/Carousel.css"
import { ToastContainer, toast } from 'react-toastify';

function App() {

  return (
    <div className="App">
      {/* <header className="App-header"> */}
      <ToastContainer />
      <Routes>
        <Route path="admin" >
          <Route path="product" element={<Product />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="sizeOrColor/:param" element={<SizeOrColor />} />
          <Route path="category" element={<Category />} />
        </Route>
        <Route path="/" element={<HomeLayout />}>
          <Route path="product/:id" element={<ProductDetail />} />
        </Route>
        <Route path="login" element={<LayoutSign_In_Up />} />
      </Routes>
      {/* </header> */}
    </div>
  );
}

export default App;
