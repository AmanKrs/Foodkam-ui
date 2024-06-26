import React, { useState, useEffect } from "react";
import AccordionDetails from "@mui/material/AccordionDetails";
import { useDispatch, useSelector } from "react-redux";
import { AddToCart, DelfromCart } from "../../redux/Cart/action";
import axios from "axios";
import Loading from "../Loading/Loading";

const apiurl = process.env.REACT_APP_API_URL;

export default function CartItem(props) {
  const { item, itemQuantInCart, totalCartAmount } = props;
  const dispatch = useDispatch();
  const quantity = useSelector((state) => state.cartDetails.addToCart);
  const loading = useSelector((state) => state.cartDetails.loading);
  const [addItem, setaddItem] = useState(quantity);
  const totalItemPrice = item.itemprice * itemQuantInCart;

  const handleadditem = async (item) => {
    setaddItem((quantity) => quantity + 1);
    const payload = {
      item: item,
      quantity: addItem,
    };
    dispatch(
      AddToCart({
        payload,
        // cb: (result) => {
        //   console.log(result);
        //   if (result.status == 200) {
        //     setOpen(true);
        //   }
        // },
      })
    );
  };

  const getcountitem = async (item) => {
    const resultcount = await axios.post(`${apiurl}/cart/getItemQuant`, item);

    let itemcountinCart = resultcount.data?.itemInCart[0]?.quant;
    if (typeof itemcountinCart == "number") {
      setaddItem(Number(itemcountinCart));
    }
  };

  useEffect(() => {
    setTimeout(() => {
      getcountitem(item);
    }, 100);
  }, [item, addItem]);

  const handledelitem = async (item) => {
    setaddItem((prev) => prev - 1);
    const payload = {
      item: item,
      quantity: addItem,
    };
    dispatch(
      DelfromCart({
        payload,
        // cb: (result) => {
        //   console.log(result);
        //   if (result.status == 200) {
        //     setOpen(true);
        //   }
        // },
      })
    );
  };

  return (
    <AccordionDetails className="cartItem-container">
      <div className="cartInfo">
        <div className="cart-itemsInfo">
          <p className="cart-itemtype">
            <span
              className={
                item.itemtype.toLowerCase() === "veg" ? "veg-dot" : "nonveg-box"
              }
            ></span>
            <span className="cart-itemname">{item.itemname}</span>
          </p>
          <p className="cart-itemdetails">
            {item.description}| ₹ {item.itemprice}
          </p>
        </div>
        <div className="cartamountBox">
          <div className="addedcart">
            {!addItem ? (
              <p
                style={{
                  margin: "0px",
                  padding: "0px 25%",
                }}
                onClick={() => {
                  handleadditem(item);
                }}
              >
                ADD
              </p>
            ) : (
              <>
                <button
                  className="countbtn"
                  onClick={() => {
                    handledelitem(item);
                  }}
                >
                  -
                </button>
                {addItem === 0 ? (
                  "ADD"
                ) : loading ? (
                  <Loading
                    loadtype={"circular"}
                    loading={true}
                    size={15}
                    thickness={4}
                  />
                ) : (
                  addItem
                )}
                <button
                  className="countbtn"
                  onClick={() => {
                    handleadditem(item);
                  }}
                >
                  +
                </button>
              </>
            )}
          </div>
          <div className="totalprice-div">
            <span>₹ </span>
            <span>{totalItemPrice}</span>
          </div>
        </div>
      </div>
    </AccordionDetails>
  );
}
