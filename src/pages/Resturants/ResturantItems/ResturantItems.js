import React, { useState } from "react";
import "./resItems.css";
import Navbar from "../../../component/Navbar/Navbar";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import item1 from "../../../assets/northIN.avif";
import { useParams } from "react-router-dom";

export default function ResturantItems() {
  let { id } = useParams();
  console.log("idparam", id);
  const [addItem, setaddItem] = useState(0);
  
  const handleadditem = () => {
    setaddItem(addItem + 1);
  };
  const handledelitem = () => {
    setaddItem(addItem - 1);
  };
  return (
    <div>
      <Navbar />
      <div className="details-container">
        <div className="resInfo">
          <div>
            <h1>ResturantItems</h1>
            <p>location</p>
          </div>
          <div className="ratingBox">
            <p>4.1</p>
            <hr className="ratesep" />
            <p>5k rating</p>
          </div>
        </div>
        <div>
          <Accordion>
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
                  <img src={item1} className="itemImg" />
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
