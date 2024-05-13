import { useState } from "react";
import "./addRestaurant.css";
const imgStorageurl = process.env.REACT_APP_Image_Storage;

export default function RestaurantInfo(props) {
  const { setResData } = props;
  const [resDP, setResDP] = useState(true);
  const [mediaSize, setMediaSize] = useState(false);
  const [itemPicUrl, setItemPicUrl] = useState();

  const handleItemPicdata = (e) => {
    console.log(e.target.files[0].type);
    if (
      e.target.files[0].type === "image/jpeg" ||
      e.target.files[0].type === "image/png"
    ) {
      const itemPicData = new FormData();
      itemPicData.append("file", e.target.files[0]);
      itemPicData.append("upload_preset", "foodkam");
      itemPicData.append("cloud_name", "ak2noteit");
      fetch(`${imgStorageurl}`, {
        method: "post",
        body: itemPicData,
      })
        .then((res) => res.json())
        .then((itemPicData) => {
          console.log(itemPicData);
          if (itemPicData.status === 200) {
            setResDP(true);
          }

          setItemPicUrl(itemPicData?.secure_url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("pic messg");
    }

    if (e.target.files[0].size > 10485760) {
      setMediaSize(true);
    }
  };
  const handlePicUpload = (e) => {
    console.log(itemPicUrl);
    setResData((prev) => ({
      ...prev,
      [e.target.name]: itemPicUrl,
    }));
  };
  const handleProductFormdata = (e) => {
    setResData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="restaurant-form">
      <h3>Restaurant Information</h3>
      <div className="res-form-inputs">
        <div>
          <label className="reslabel"> Restaurant Name</label>
          <input
            className="res-input-text"
            type="text"
            name="resName"
            onChange={handleProductFormdata}
          ></input>
        </div>
        <div>
          <label className="reslabel">Address</label>
          <input
            className="res-input-text"
            name="address"
            type="text"
            onChange={handleProductFormdata}
          ></input>
        </div>
      </div>
      <div className="res-form-inputs">
        <div>
          <label className="reslabel">Owner Name</label>
          <input
            className="res-input-text"
            name="resowner"
            type="text"
            placeholder="Resturant Owner Name"
            onChange={handleProductFormdata}
          ></input>
        </div>
        <div>
          <label className="reslabel">Mobile Number</label>
          <input
            className="res-input-text"
            name="phone"
            type="text"
            placeholder="Mobile Number"
            onChange={handleProductFormdata}
          ></input>
        </div>
      </div>
      <div className="res-form-inputs">
        <div>
          <label className="reslabel">Password</label>
          <input
            className="res-input-text"
            type="password"
            name="password"
            onChange={handleProductFormdata}
          ></input>
        </div>
        <div>
          <label className="reslabel">Profile Picture</label>
          <input
            className="additemcontainer"
            name="resitempic"
            type="file"
            onChange={handleItemPicdata}
          ></input>
          <button
            name="resprofilepic"
            className="upload-itempic-btn"
            onClick={handlePicUpload}
            disabled={resDP ? false : true}
          >
            upload
          </button>
        </div>
      </div>
    </div>
  );
}
