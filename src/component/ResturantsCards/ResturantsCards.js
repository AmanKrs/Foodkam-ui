import React, { useEffect } from "react";
import "./rescards.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RestaurantDetails } from "../../redux/Restaurants/action";
import "react-loading-skeleton/dist/skeleton.css";
import Loading from "../Loading/Loading";
import LoadingCube from "../Loading/LoadingCube";

export default function ResturantsCards() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const restDetails = useSelector((state) => state.data.restDetails);
  const loading = useSelector((state) => state.data.loading);
  useEffect(() => {
    if (restDetails?.length == 0) {
      dispatch(RestaurantDetails());
    }
  }, []);

  const handleresDetails = (id) => {
    navigate("resturants/" + id);
  };

  return (
    <>
      <h2>Restaurants with online food delivery in Patna</h2>
      {loading ? (
        <div className="loadingcards">
          {/* <Loading loading={true} loadtype={"circular"} /> */}
          <LoadingCube />
        </div>
      ) : (
        <div className="rescard">
          {restDetails?.map((elem, index) => {
            return (
              <div
                key={index}
                className="card"
                onClick={() => {
                  handleresDetails(elem._id);
                }}
              >
                <div className="cardimage">
                  <img src={elem.resprofilepic} className="resdp" />
                </div>
                <div className="carddetail">
                  <div className="restitle">
                    <h3 className="resname">{elem.resName}</h3>
                  </div>
                  <div className="resdetails-container">
                    <div className="resdetails">
                      <p className="restyp">{elem.cuisine}</p>
                      <p className="restyp">{elem.restype}</p>
                    </div>
                    <p className="resloc">{elem.address}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
