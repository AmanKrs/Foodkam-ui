import React, { useEffect, useState } from "react";
import "./resItems.css";
import Navbar from "../../../component/Navbar/Navbar";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../../utils/interceptor";
import ItemList from "./ItemList";

let category_name;
let itemList;

export default function ResturantItems() {
  let { id } = useParams();
  // console.log("idparam", id);
  const [restaurantData, setRestaurantData] = useState();
  const [menuData, setMenuData] = useState();

  const getResturantItem = async () => {
    try {
      const restaurantInfoResult = await axios.post(
        "http://localhost:8087/restaurant/getRestaurantInfo",
        { id: id }
      );
      console.log(restaurantInfoResult);
      setRestaurantData(restaurantInfoResult.data.resinfo);
      if (restaurantInfoResult.status === 200) {
        const result = await axios.post(
          "http://localhost:8087/restaurant/getItems",
          { id: id }
        );
        setMenuData(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(menuData);

  useEffect(() => {
    getResturantItem();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="details-container">
        <div className="resInfo">
          <div>
            <h1>{restaurantData?.resName}</h1>
            <p>{restaurantData?.address}</p>
          </div>
          <div className="ratingBox">
            <p>4.1</p>
            <hr className="ratesep" />
            <p>5k rating</p>
          </div>
        </div>
        <div>
          {menuData?.map((categoryData, index) => {
            category_name = Object.keys(categoryData)[0];
            itemList = categoryData[category_name];
            console.log(itemList.length);
            return (
              <>
                <Accordion
                  key={index}
                  disabled={itemList.length === 0 ? true : false}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>{category_name}</Typography>
                  </AccordionSummary>
                  {itemList?.map((item, itemIndex) => {
                    return (
                      // <>
                      //   <AccordionDetails key={itemIndex}>
                      //     <div className="resInfo">
                      //       <div className="itemsInfo">
                      //         <p className="itemtype">{item.itemtype}</p>
                      //         <p className="itemname">{item.itemname}</p>
                      //         <span>₹{item.itemprice}</span>
                      //         <p className="itemdetails">
                      //           {item.description}
                      //           Serves 1 | Battered fish simmered in soy sauce
                      //           with chillies, capcicum and onion. 8 pc. Basa/
                      //           bombay vetki depending on availability.
                      //         </p>
                      //       </div>
                      //       <div className="itemimgBox">
                      //         <img
                      //           src={item.itempic}
                      //           className="itemImg"
                      //           alt="menuitmei"
                      //         />
                      //         <div className="addtocart">
                      //           {addItem === 0 ? (
                      //             <p
                      //               style={{
                      //                 margin: "0px",
                      //                 padding: "0px 25%",
                      //               }}
                      //               onClick={() => {
                      //                 handleaddtocart(item);
                      //               }}
                      //             >
                      //               ADD
                      //             </p>
                      //           ) : (
                      //             <>
                      //               <button
                      //                 className="countbtn"
                      //                 onClick={() => {
                      //                   handledelitem(item);
                      //                 }}
                      //               >
                      //                 -
                      //               </button>
                      //               {addItem}
                      //               <button
                      //                 className="countbtn"
                      //                 onClick={() => {
                      //                   handleadditem(item);
                      //                 }}
                      //               >
                      //                 +
                      //               </button>
                      //             </>
                      //           )}
                      //         </div>
                      //       </div>
                      //     </div>
                      //   </AccordionDetails>
                      // </>
                      <>
                        <ItemList item={item} itemIndex={itemIndex} />
                      </>
                    );
                  })}
                </Accordion>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}
