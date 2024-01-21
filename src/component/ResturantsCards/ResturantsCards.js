import React, { useEffect, useState } from "react";
import "./rescards.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ResturantsCards() {
  const [restDetails, setRestDetails] = useState();

  const navigate = useNavigate();

  const handleresDetails = (id) => {
    navigate("resturants/" + id);
  };
  const getresturantDetails = async () => {
    const result = await axios.post(
      "http://localhost:8087/partner/getresturantDetails"
    );
    console.log(result.data);
    setRestDetails(result.data);
  };

  useEffect(() => {
    getresturantDetails();
  }, []);

  return (
    <>
      <h2>Restaurants with online food delivery in Patna</h2>
      <div className="rescard">
        {restDetails?.map((elem, index) => {
          return (
            <>
              <div
                key={index}
                className="card"
                onClick={() => {
                  handleresDetails(elem._id);
                }}
              >
                <div className="cardimage">
                  <img
                    src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/bxpeobnfjekqmhyz0jp0"
                    className="resdp"
                  />
                </div>
                <div className="carddetail">
                  <div className="restitle">
                    <h3 className="resname">{elem.resName}</h3>
                  </div>
                  <div className="">
                    <div className="resdetails">
                      <p className="restyp">{elem.cuisine}</p>
                      <p className="restyp">{elem.restype}</p>
                    </div>
                    <div className="resdetails">
                      <p className="resloc">{elem.address}</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}
