import React, { useEffect } from "react";
import "./resItems.css";
import Navbar from "../../../component/Navbar/Navbar";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useParams } from "react-router-dom";

import ItemList from "./ItemList";
import { useDispatch, useSelector } from "react-redux";
import {
  ResturantInfo,
  ResturantsMenu,
} from "../../../redux/RestaurantsMenu/action";

let category_name;
let itemList;

export default function ResturantItems() {
  let { id } = useParams();
  const dispatch = useDispatch();
  const restaurantData = useSelector((state) => state.restInfo.restaurantData);
  const menuData = useSelector((state) => state.restInfo.menuData);
  console.log(menuData);
  useEffect(() => {
    dispatch(ResturantInfo(id));
    dispatch(ResturantsMenu(id));
  }, [id]);

  return (
    <div>
      <Navbar />
      <div className="details-container">
        <div className="resInfo">
          <div>
            <h1>{restaurantData?.resName}</h1>
            <p>📍{restaurantData?.address}</p>
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
                  return <ItemList item={item} key={itemIndex} />;
                })}
              </Accordion>
            );
          })}
        </div>
      </div>
    </div>
  );
}
