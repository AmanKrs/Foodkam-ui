import React, { useState } from "react";
import AccordionDetails from "@mui/material/AccordionDetails";
import { useDispatch, useSelector } from "react-redux";
export default function CartItem() {
  const dispatch = useDispatch();
  const quantity = useSelector((state) => state.cartDetails.addToCart);
  const [addItem, setaddItem] = useState(true);
  return (
    <>
      <div>
        <AccordionDetails>
          <div className="cartInfo">
            <div className="itemsInfo">
              <span className="itemtype">veg</span>
              <p className="itemname">name</p>

              <p className="itemdetails">descrription</p>
            </div>
            <div className="cartamountBox">
              <div className="addedcart">
                {!addItem ? (
                  <p
                    style={{
                      margin: "0px",
                      padding: "0px",
                    }}
                    // onClick={() => {
                    //   handleadditem(item);
                    // }}
                  >
                    ADD
                  </p>
                ) : (
                  <>
                    <button
                      className="countbtn"
                      //   onClick={() => {
                      //     handledelitem(item);
                      //   }}
                    >
                      -
                    </button>
                    {addItem === 0 ? "ADD" : "del"}
                    <button
                      className="countbtn"
                      //   onClick={() => {
                      //     handleadditem(item);
                      //   }}
                    >
                      +
                    </button>
                  </>
                )}
              </div>
              <div>amount</div>
            </div>
          </div>
        </AccordionDetails>
        <hr></hr>
        <div className="cartInfo">
          <div className="itemsInfo">
            <h4>Total Amount</h4>
          </div>
          <h5>₹ded</h5>
        </div>
      </div>
    </>
  );
}
