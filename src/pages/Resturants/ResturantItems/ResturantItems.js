import React, { useEffect, useState } from "react";
import "./resItems.css";
import Navbar from "../../../component/Navbar/Navbar";
import Accordion from "@mui/material/Accordion";
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
            console.log(itemList);
            return (
              <Accordion
                key={index}
                disabled={itemList.length === 0 ? true : false}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>{category_name}</Typography>
                </AccordionSummary>
                {itemList?.map((item, itemIndex) => {
                  return (
                    <ItemList
                      item={item}
                      itemIndex={itemIndex}
                      key={itemIndex}
                    />
                  );
                })}
              </Accordion>
            );
          })}
        </div>
      </div>
    </div>
  );
}
