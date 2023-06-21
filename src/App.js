import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadUser } from "./slices/authSlice";
import React from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import Shop from "./components/shop/Shop";


import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";

import NotFound from "./components/notfound/NotFound"
import Cart from "./components/cart/Cart"


function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser(null));
  }, [dispatch]);


  return (
    <>
   
      <BrowserRouter>
      <ToastContainer />
        <Navbar />

        <div className="container ">
        <Routes>
          <Route exact path="/" element={<Home />} ></Route>
          <Route exact path="/shop" element={<Shop />} ></Route>
          <Route exact path="/login" element={<Login />} ></Route>
          <Route exact path="/signup" element={<Signup  />} ></Route>
          <Route exact path="/cart" element={<Cart  />} ></Route>
          <Route path="*" element={<NotFound />} />
         
        </Routes>

        </div>
      </BrowserRouter>
   
    </>
  );
}

export default App;
