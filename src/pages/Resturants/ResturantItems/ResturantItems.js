import React, { useEffect, useState } from "react";
import "./resItems.css";
import Navbar from "../../../component/Navbar/Navbar";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import item1 from "../../../assets/northIN.avif";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../../utils/interceptor";

export default function ResturantItems() {
  let { id } = useParams();
  // console.log("idparam", id);
  const [addItem, setaddItem] = useState(0);
  const [restaurantData, setRestaurantData] = useState();
  const [menuData, setMenuData] = useState();

  const handleadditem = () => {
    setaddItem(addItem + 1);
  };
  const handledelitem = () => {
    setaddItem(addItem - 1);
  };
  const getResturantItem = async () => {
    const result = await axios.post(
      "http://localhost:8087/restaurant/getItems",
      { id: id }
    );
    setRestaurantData(result.data.resinfo);
    setMenuData(result.data.menuList);
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
        {menuData?.map((item, index)=>{
          return(<>
            <Accordion >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>chinese</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className="resInfo">
                <div className="itemsInfo">
                  <p className="itemtype"> non-veg</p>
                  <p className="itemname">Chilly Fish</p> <span>295</span>
                  <p className="itemdetails">
                    Serves 1 | Battered fish simmered in soy sauce with
                    chillies, capcicum and onion. 8 pc. Basa/ bombay vetki
                    depending on availability.
                  </p>
                </div>
                <div className="itemimgBox">
                  <img src={item1} className="itemImg" alt="menuitmei" />
                  <div className="addtocart">
                    {addItem === 0 ? (
                      <p
                        style={{ margin: "0px", padding: "0px 25%" }}
                        onClick={() => {
                          setaddItem(1);
                        }}
                      >
                        ADD
                      </p>
                    ) : (
                      <>
                        <button className="countbtn" onClick={handledelitem}>
                          -
                        </button>
                        {addItem}
                        <button className="countbtn" onClick={handleadditem}>
                          +
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </AccordionDetails>
            <AccordionDetails disabled>
              <div className="resInfo">
                <div className="itemsInfo">
                  <p className="itemtype"> non-veg</p>
                  <p className="itemname">Chilly Fish</p> <span>295</span>
                  <p className="itemdetails">
                    Serves 1 | Battered fish simmered in soy sauce with
                    chillies, capcicum and onion. 8 pc. Basa/ bombay vetki
                    depending on availability.
                  </p>
                </div>
                <div className="itemimgBox">
                  <img src={item1} className="itemImg" alt="itemmenu" />
                  <div className="addtocart">
                    {addItem === 0 ? (
                      <p
                        style={{ margin: "0px", padding: "0px 25%" }}
                        onClick={() => {
                          setaddItem(1);
                        }}
                      >
                        ADD
                      </p>
                    ) : (
                      <>
                        <button className="countbtn" onClick={handledelitem}>
                          -
                        </button>
                        {addItem}
                        <button className="countbtn" onClick={handleadditem}>
                          +
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
          </>)
          
        })}
          
          <Accordion disabled>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Disabled Accordion</Typography>
            </AccordionSummary>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
