import React, { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import "./addRestaurant.css";

const imgStorageurl = process.env.REACT_APP_Image_Storage;

export default function RestaurantInfo(props) {
  const { setResData } = props;
  const [resDP, setResDP] = useState(false);
  const [mediaSize, setMediaSize] = useState(false);
  const [itemPicUrl, setItemPicUrl] = useState();
  const [open, setOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState();
  const [severityMsg, setSeverityMsg] = useState();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const handleItemPicdata = (e) => {
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
          if (itemPicData.type === "upload") {
            setResDP(true);
          }

          setItemPicUrl(itemPicData?.secure_url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setOpen(true);
      setSnackMsg("Invalid Format");
      setSeverityMsg("error");
    }

    if (e.target.files[0].size > 10485760) {
      setMediaSize(true);
    }
  };
  const handlePicUpload = (e) => {
    setResData((prev) => ({
      ...prev,
      [e.target.name]: itemPicUrl,
    }));
    setOpen(true);
    setSeverityMsg("success");
    setSnackMsg("Profile Picture Uploaded");
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
            required
            placeholder="Restaurant Name"
            onChange={handleProductFormdata}
          ></input>
        </div>
        <div>
          <label className="reslabel">Address</label>
          <input
            className="res-input-text"
            name="address"
            type="text"
            placeholder="Address"
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
            placeholder="Enter your Password"
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
            className={resDP ? "upload-itempic-btn" : "additembtn-disable"}
            onClick={handlePicUpload}
            disabled={resDP ? false : true}
          >
            upload
          </button>
        </div>
      </div>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert
          severity={severityMsg}
          sx={{ width: "100%" }}
          onClose={handleClose}
          variant="filled"
        >
          {snackMsg}
        </Alert>
      </Snackbar>
    </div>
  );
}
