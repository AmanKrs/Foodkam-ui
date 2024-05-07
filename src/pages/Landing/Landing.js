import React from "react";
import Navbar from "../../component/Navbar/Navbar";
import "./landing.css";
import abt1 from "../../assets/abt1.png";
import track from "../../assets/track.png";
import delivery from "../../assets/delivery.png";

export default function Landing(props) {
  return (
    <>
      <div className="landinghome">
        <div className="banner">
          <Navbar />
          <div className="banner-details">
            <div className="app-title">
              <h1 className="title-name">FoodKaM</h1>
              <p className="title-details">Discover the best food & drinks </p>
            </div>
            <div className="searchfood-container">
              <select className="bannerlocation">
                <option>patna</option>
                <option>get location</option>
                <option>delhi</option>
              </select>
              <input className="searchfood" />
            </div>
          </div>
        </div>
        <div className="about">
          <div className="aboutblock">
            <img src={abt1} alt="logo for app" className="about1img" />
            <div>
              <h4 className="abouthead">No Minimum Order</h4>
              <p className="aboutdetail">
                Order in for yourself or for the group, with no restrictions on
                order value
              </p>
            </div>
          </div>
          <div className="aboutblock">
            <img src={track} alt="logo for app" className="about2img" />
            <div>
              <h4 className="abouthead">Live Order Tracking</h4>
              <p className="aboutdetail">
                Know where your order is at all times, from the restaurant to
                your doorstep
              </p>
            </div>
          </div>
          <div className="aboutblock">
            <img src={delivery} alt="logo for app" className="about3img" />
            <div>
 <h4 className="abouthead">Lightning-Fast Delivery</h4>
            <p className="aboutdetail">
              Experience superfast delivery for food delivered fresh & on time
            </p>
            </div>
           
          </div>
        </div>
      </div>
    </>
  );
}
