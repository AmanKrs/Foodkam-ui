import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./cart.css";
import emptyCartImg from "../../assets/emptyCart.png";
import { NavLink } from "react-router-dom";
import CartItem from "./CartItem";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const apiurl = process.env.REACT_APP_API_URL;

export default function Cart() {
  const [emptyCart, setEmptyCart] = useState(true);
  const [itemIncart, setItemInCart] = useState(null);

  const quantity = useSelector((state) => state.cartDetails.addToCart);
  console.log(apiurl);
  const getCartItem = async () => {
    try {
      const responseData = await axios.get(`${apiurl}/cart/getCartItems`);
      console.log(responseData);

      if (responseData?.status === 200) {
        setItemInCart(responseData.data);
        setEmptyCart(false);
      }
      if (responseData?.status === 204) {
        setEmptyCart(true);
      }
    } catch (error) {
      console.log(error);
      setEmptyCart(true);
    }
  };

  useEffect(() => {
    getCartItem();
  }, [quantity, emptyCart]);

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
                <div className="cartdiv">
                  {itemIncart?.cartDetails?.map((elem, index) => {
                    return (
                      <CartItem
                        key={index}
                        item={elem.itemInfo}
                        itemQuantInCart={elem.itemQuantInCart}
                      />
                    );
                  })}
                  <hr className="total-divider"></hr>
                  <div className="cartTotal-container">
                    <div className="itemsInfoCart">
                      <h4>Total Amount</h4>
                    </div>
                    <h5>₹ {itemIncart?.totalCartAmount}.00</h5>
                  </div>

                  <div className="payment-btn">
                    <button className="paymentbutton" data-text="Awesome">
                      <span className="actual-text">
                        &nbsp;Proceed to Pay&nbsp;
                      </span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* <img src="https://mir-s3-cdn-cf.behance.net/projects/404/95974e121862329.Y3JvcCw5MjIsNzIxLDAsMTM5.png" /> */}
        </div>
      </div>
    </>
  );
}
