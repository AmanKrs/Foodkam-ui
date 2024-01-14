import { useState } from "react";
import "./addRestaurant.css";

export default function RestaurantInfo(props) {
  const { setResData } = props;

  const [mediaSize, setMediaSize] = useState(false);
  const [itemPicUrl, setItemPicUrl] = useState();

  const handleItemPicdata = (e) => {
    
    if (
      e.target.files[0].type === "image/jpeg" ||
      e.target.files[0].type === "image/png"
    ) {
      const itemPicData = new FormData();
      itemPicData.append("file", e.target.files[0]);
      itemPicData.append("upload_preset", "foodkam");
      itemPicData.append("cloud_name", "ak2noteit");
      fetch("https://api.cloudinary.com/v1_1/ak2noteit/image/upload", {
        method: "post",
        body: itemPicData,
      })
        .then((res) => res.json())
        .then((itemPicData) => {
          setItemPicUrl(itemPicData.url.toString());
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
    <div className="product-form">
      <h3>Restaurant Information</h3>
      <div className="p-form-inputs">
        <div>
          <label className="p-form-label"> Restaurant Name</label>
          <input
            className="p-input-text"
            type="text"
            name="resName"
            onChange={handleProductFormdata}
          ></input>
        </div>
        <div>
          <label className="p-form-label">Address</label>
          <input
            className="p-input-text"
            name="address"
            type="text"
            onChange={handleProductFormdata}
          ></input>
        </div>
      </div>
      <div className="p-form-inputs">
        <div>
          <label className="p-form-label">Owner Name</label>
          <input
            className="p-input-text"
            name="resowner"
            type="text"
            placeholder="Resturant Owner Name"
            onChange={handleProductFormdata}
          ></input>
        </div>
        <div>
          <label className="p-form-label">Mobile Number</label>
          <input
            className="p-input-text"
            name="phone"
            type="text"
            placeholder="Mobile Number"
            onChange={handleProductFormdata}
          ></input>
        </div>
      </div>
      <div className="p-form-inputs">
        <div>
          <label className="p-form-label">Password</label>
          <input
            className="p-input-text"
            type="password"
            name="password"
            onChange={handleProductFormdata}
          ></input>
        </div>
        <div>
          <label className="p-form-label">Profile Picture</label>
          <input
            className="p-input-text"
            name="resitempic"
            type="file"
            onChange={handleItemPicdata}
          ></input>
          <button name="resprofilepic" onClick={handlePicUpload}>
            upload
          </button>
        </div>
      </div>
    </div>
  );
}
