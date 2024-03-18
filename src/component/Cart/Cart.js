import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./cart.css";
import emptyCartImg from "../../assets/emptyCart.png";
import { NavLink } from "react-router-dom";
export default function Cart() {
  const [emptyCart, setEmptyCart] = useState(true);

  
  return (
    <>
      <Navbar />
      <div className="home-container">
        <div className="cart-container">
          <div>
            {emptyCart && (
              <>
                <div className="emptyImgdiv">
                  <img
                    src={emptyCartImg}
                    className="emptyImg"
                    alt="empaty cart"
                  />
                  <div className="emptyInfo">
                    <b>Oopss!! your cart is empty!</b>
                    <p>
                      <em>
                        Look like you have not added anything to your cart. Add
                        items to full your stomach😊
                      </em>
                    </p>
                  </div>
                  <div className="carttohome">
                    <NavLink to="/">Order Now</NavLink>
                  </div>
                </div>
              </>
            )}
            {!emptyCart && (
              <>
                <div>cart item</div>
              </>
            )}
          </div>
          {/* <img src="https://mir-s3-cdn-cf.behance.net/projects/404/95974e121862329.Y3JvcCw5MjIsNzIxLDAsMTM5.png" /> */}
        </div>
      </div>
    </>
  );
}
