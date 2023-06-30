import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../page/Home";
import About from "../page/About";
import Menu from "../page/Menu";
import Contact from "../page/Contact.js";
import Login from "../page/Login";
import Newproduct from "../page/Newproduct";
import Signup from "../page/Signup";
import Cart from "../page/Cart";
const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/menu/" element={<Menu />} /> */}
        <Route path="/menu/:filterby" element={<Menu />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="newproduct" element={<Newproduct />} />
        <Route path="signup" element={<Signup />} />
        <Route path="cart" element={<Cart />} />
      </Routes>
    </div>
  );
};

export default AllRoutes;
