import React, { useEffect, useState } from "react";
import "./resItems.css";
import AccordionDetails from "@mui/material/AccordionDetails";
import axios from "axios";
import "../../../utils/interceptor";

export default function ItemList(props) {
  const { item, itemIndex } = props;
  const [addItem, setaddItem] = useState(0);

  const handleadditem = async (item) => {
    setaddItem(addItem + 1);
    const addItemResult = await axios.post(
      "http://localhost:8087/cart/addtocart",
      { item, addItem }
    );
  };
  const handledelitem = async (item) => {
    setaddItem((prev) => prev - 1);
    const delItemResult = await axios.post(
      "http://localhost:8087/cart/removeCartItem",
      { item, addItem }
    );
  };

  const handleaddtocart = async (item) => {
    setaddItem(1);
    const addToCartResult = await axios.post(
      "http://localhost:8087/cart/addtocart",
      { item, addItem }
    );
  };

  return (
    <>
      <AccordionDetails key={itemIndex}>
        <div className="resInfo">
          <div className="itemsInfo">
            <p className="itemtype">{item.itemtype}</p>
            <p className="itemname">{item.itemname}</p>
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
              {addItem === 0 ? (
                <p
                  style={{
                    margin: "0px",
                    padding: "0px 25%",
                  }}
                  onClick={() => {
                    handleaddtocart(item);
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
                  {addItem}
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
