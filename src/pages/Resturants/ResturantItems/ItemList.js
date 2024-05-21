import React, { useEffect, useState } from "react";
import "./resItems.css";
import AccordionDetails from "@mui/material/AccordionDetails";
import axios from "axios";
// import "../../../utils/interceptor";
import { useDispatch, useSelector } from "react-redux";
import { DelfromCart, AddToCart } from "../../../redux/Cart/action";
const apiurl = process.env.REACT_APP_API_URL;
export default function ItemList(props) {
  const { item } = props;
  const dispatch = useDispatch();
  const quantity = useSelector((state) => state.cartDetails.addToCart);
  console.log(quantity);
  const [addItem, setaddItem] = useState(quantity);

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
    // setaddItem(addItem + 1);
    // const addItemResult = await axios.post(
    //   "http://ec2-3-110-103-234.ap-south-1.compute.amazonaws.com:8087/cart/addtocart",
    //   { item, addItem }
    // );console.log(addItemResult.data.msg.quantity);
  };

  const getcountitem = async (item) => {
    const resultcount = await axios.post(`${apiurl}/cart/getItemQuant`, item);
    // console.log(resultcount.data?.itemInCart[0]?.quant);
    let itemcountinCart = resultcount.data?.itemInCart[0]?.quant;
    // var itemnewlist = JSON.parse(JSON.stringify(item));
    // itemnewlist.itemcountinCart = itemcountinCart;
    console.log(typeof itemcountinCart);
    if (typeof itemcountinCart == "number") {
      setaddItem(Number(itemcountinCart));
    }
  };

  useEffect(() => {
    setTimeout(() => {
      // console.log(item);
      getcountitem(item);
    }, 100);
  }, [item, addItem]);

  // console.log(typeof addItem);
  const handledelitem = async (item) => {
    // setaddItem((prev) => prev - 1);
    // const delItemResult = await axios.post(
    //   "http://ec2-3-110-103-234.ap-south-1.compute.amazonaws.com:8087/cart/removeCartItem",
    //   { item, addItem }
    // );
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

  // const handleaddtocart = async (item) => {
  //   setaddItem(1);
  //   const addToCartResult = await axios.post(
  //     "http://ec2-3-110-103-234.ap-south-1.compute.amazonaws.com:8087/cart/addtocart",
  //     { item, addItem }
  //   );
  //   // console.log(addToCartResult.data);
  // };

  return (
    <>
      <AccordionDetails className="itembar">
        <div className="itemInfo-container">
          <div className="itemsInfo">
            <p className="itemname">
              <span
                className={
                  item.itemtype.toLowerCase() === "veg"
                    ? "veg-dot"
                    : "nonveg-box"
                }
              ></span>
              {item.itemname}
            </p>
            <span>₹{item.itemprice}</span>
            <p className="itemdetails">
              {item.description}
              Serves 1 | Battered fish simmered in soy sauce with chillies,
              capcicum and onion. 8 pc. Basa/ bombay vetki depending on
              availability.
            </p>
          </div>
          <div className="itemimgBox">
            <img src={item.itempic} className="itemImg" alt="menuitmei" />
            <div className="addtocart">
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
                  {addItem === 0 ? "ADD" : addItem}
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
          </div>
        </div>
      </AccordionDetails>
    </>
  );
}
