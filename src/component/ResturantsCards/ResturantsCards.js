import React from "react";
import "./rescards.css";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
export default function ResturantsCards() {
 
  const navigate = useNavigate();

  const handleresDetails = (id) => {
    navigate("resturants/" +id);
  };
  return (
    <>
      <h2>Restaurants with online food delivery in Patna</h2>
      <div className="rescard">
        <div className="card" onClick={()=>{handleresDetails(123)}}>
          <div className="cardimage">image</div>
          <div className="carddetail">details</div>
        </div>
        <div className="card">
          <div className="cardimage">image</div>
          <div className="carddetail">details</div>
        </div>
        <div className="card">
          <div className="cardimage">image</div>
          <div className="carddetail">details</div>
        </div>
        <div className="card">
          <div className="cardimage">image</div>
          <div className="carddetail">details</div>
        </div>
        <div className="card">
          <div className="cardimage">image</div>
          <div className="carddetail">details</div>
        </div>
        <div className="card">
          <div className="cardimage">image</div>
          <div className="carddetail">details</div>
        </div>
        <div className="card">
          <div className="cardimage">image</div>
          <div className="carddetail">details</div>
        </div>
        <div className="card">
          <div className="cardimage">image</div>
          <div className="carddetail">details</div>
        </div>
      </div>
    </>
  );
}
