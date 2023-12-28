import React from "react";
import Footer from "../Footer/Footer";
import { Route, Routes } from "react-router-dom";
import ProtectedLayout from "../ProtectedLayout/ProtectedLayout";
import Home from "../../pages/Home/Home";
import AddResturant from "../../pages/Resturants/AddResturant/AddResturant";
import ProtectedLayoutRes from "../ProtectedLayout/ProtectedLayoutRes";
import EditResturantDetails from "../../pages/Resturants/EditResturantDetails/EditResturantDetails";
import ResturantItems from "../../pages/Resturants/ResturantItems/ResturantItems";
export default function Content() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ProtectedLayout />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/resturants/:id" element={<ResturantItems />}></Route>
        </Route>
        <Route path="/partner" element={<ProtectedLayoutRes />}>
          <Route path="/partner-with-us" element={<AddResturant />}></Route>
          <Route
            path="/partner/your-resturant"
            element={<EditResturantDetails />}
          ></Route>
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}
