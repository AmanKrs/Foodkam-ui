import React from "react";
import Footer from "../Footer/Footer";
import { Route, Routes } from "react-router-dom";
import ProtectedLayout from "../ProtectedLayout/ProtectedLayout";
import Home from "../../pages/Home/Home";
import AddResturant from "../../pages/Resturants/RegisterResturant/AddResturant";
import ProtectedLayoutRes from "../ProtectedLayout/ProtectedLayoutRes";
import ResturantItems from "../../pages/Resturants/ResturantItems/ResturantItems";
import RestaurantProfile from "../../pages/Resturants/RestaurantProfile/RestaurantProfile";
import EditResturantDetails from "../../pages/Resturants/EditResturantDetails/EditResturantDetails";
import AddMenu from "../../pages/Resturants/RestaurantMenu/AddMenu";
import MenuList from "../../pages/Resturants/RestaurantMenu/MenuList";
import UserProfile from "../../pages/UserProfile/UserProfile";
import Cart from "../Cart/Cart";

export default function Content() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ProtectedLayout />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/resturants/:id" element={<ResturantItems />}></Route>
          <Route path="/user-profile" element={<UserProfile />}></Route>
          <Route path="/orderlist" element={<Cart />}></Route>
        </Route>
        {/* </Routes>
        <Routes> */}
        <Route path="/partner" element={<ProtectedLayoutRes />}>
          <Route path="/partner" element={<AddResturant />}></Route>
          <Route path="/partner/profile" element={<RestaurantProfile />}>
            <Route path="/partner/profile" element={<AddMenu />}></Route>
            <Route
              path="/partner/profile/menulist"
              element={<MenuList />}
            ></Route>
            <Route
              path="/partner/profile/edit-menu"
              element={<EditResturantDetails />}
            ></Route>
            <Route
              path="/partner/profile/:id"
              element={<EditResturantDetails />}
            ></Route>
          </Route>
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}
