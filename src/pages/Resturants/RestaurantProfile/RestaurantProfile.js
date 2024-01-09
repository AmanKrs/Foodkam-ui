import React, { useState } from "react";
import "./resprofile.css";
import { NavLink, Outlet } from "react-router-dom";
export default function RestaurantProfile() {
  return (
    <>
      <div className="res-profile-container">
        <div className="product-form sidenav-resprofile">
          <h3>Restaurant Details</h3>
          <div className="">
            <NavLink to="/partner/profile">
              <p className="item">AddMenu</p>
            </NavLink>

            <NavLink to="/partner/profile/menulist">
              <p className="item">Menu List</p>
            </NavLink>
          </div>
        </div>
        <div className="product-form ">
          <Outlet />
        </div>
      </div>
    </>
  );
}
