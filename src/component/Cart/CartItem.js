import React, { useState, useEffect } from "react";
import AccordionDetails from "@mui/material/AccordionDetails";
import { useDispatch, useSelector } from "react-redux";
import { AddToCart, DelfromCart } from "../../redux/Cart/action";
import axios from "axios";

export default function CartItem(props) {
  const { item, itemQuantInCart, totalCartAmount } = props;
  const dispatch = useDispatch();
  const quantity = useSelector((state) => state.cartDetails.addToCart);
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
    const resultcount = await axios.post(
      "http://localhost:8087/cart/getItemQuant",
      item
    );

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
    <>
      <div>
        <AccordionDetails>
          <div className="cartInfo">
            <div className="itemsInfo">
              <p className="itemtype">
                {item.itemtype.toLowerCase() === "veg" ? "🟩" : "🔴"}
                <span className="itemname">{item.itemname}</span>
              </p>
              <p className="itemdetails">
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
              <div>₹ {totalItemPrice}</div>
            </div>
          </div>
        </AccordionDetails>
      </div>
    </>
  );
}
