import React, { useState } from "react";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import "../../../utils/resInterceptor";
import "./addResMenu.css";

const imgStorageurl = process.env.REACT_APP_Image_Storage;
const apiurl = process.env.REACT_APP_API_URL;

export default function AddMenu() {
  const [menuData, setMenuData] = useState({
    itemname: "",
    quantity: "",
    category: "",
    description: "",
    itemtype: "",
    itemprice: "",
    itempic: "",
  });
  const [mediaSize, setMediaSize] = useState(false);
  const [itemPicUrl, setItemPicUrl] = useState();
  const [resDP, setResDP] = useState(false);
  const [open, setOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState();
  const [severityMsg, setSeverityMsg] = useState();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleMenuFormdata = (e) => {
    setMenuData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
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
          setItemPicUrl(itemPicData.secure_url.toString());
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
    e.preventDefault();
    setMenuData((prev) => ({
      ...prev,
      [e.target.name]: itemPicUrl,
    }));

    setOpen(true);
    setSeverityMsg("success");
    setSnackMsg("Item Picture Uploaded");
    if(menuData.itempic==""){
      setResDP(false);
    }
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    const menuItemData = await axios.post(
      `${apiurl}/restaurant/addmenu`,
      menuData
    );

    setOpen(true);
    setSeverityMsg("success");
    setSnackMsg("Item Added");
    setMenuData({
      itemname: "",
      quantity: "",
      category: "",
      description: "",
      itemtype: "",
      itemprice: "",
      itempic: "",
    });
    setResDP(false);
  };
  return (
    <div>
      <h3 style={{ color: "#eba148" }}>Restaurant Menu</h3>
      <form className="input-container" onSubmit={handleAddItem}>
        <div className="p-form-inputs">
          <div>
            <label className="p-form-label">Item Name</label>
            <input
              className="p-input-text"
              type="text"
              name="itemname"
              value={menuData.itemname}
              required
              onChange={handleMenuFormdata}
            ></input>
          </div>
          <div>
            <label className="p-form-label">Quantity</label>
            <input
              className="p-select-text"
              type="number"
              name="quantity"
              value={menuData.quantity}
              onChange={handleMenuFormdata}
              required
            ></input>
          </div>
        </div>
        <div className="p-form-inputs">
          <div>
            <label className="p-form-label">Category</label>
            <select
              className="p-select-text"
              name="category"
              value={menuData.category}
              required
              onChange={handleMenuFormdata}
            >
              <option></option>
              <option>starter</option>
              <option>chinese</option>
              <option>Main Course</option>
              <option>breads</option>
              <option>rice</option>
              <option>biryani</option>
              <option>dessert</option>
              <option>beverages</option>
            </select>
          </div>
          <div>
            <label className="p-form-label">Description</label>
            <input
              className="p-input-text"
              type="text"
              name="description"
              value={menuData.description}
              required
              onChange={handleMenuFormdata}
            ></input>
          </div>
        </div>
        <div className="p-form-inputs">
          <div>
            <label className="p-form-label">Item type</label>
            <select
              className="p-select-text"
              name="itemtype"
              value={menuData.itemtype}
              required
              onChange={handleMenuFormdata}
            >
              <option></option>
              <option>Veg</option>
              <option>Non-veg</option>
              <option>Eggiterian</option>
            </select>
          </div>
          <div>
            <label className="p-form-label">Item Price</label>
            <input
              className="p-input-text"
              type="number"
              name="itemprice"
              value={menuData.itemprice}
              required
              onChange={handleMenuFormdata}
            ></input>
          </div>
        </div>
        <div className="additempic">
          <label className="p-form-label">Item Picture</label>
          <input
            style={{ width: "auto" }}
            className="p-input-file"
            name="resitempic"
            type="file"
            required
            onChange={handleItemPicdata}
          ></input>
          <button
            name="itempic"
            className="upload-itempic-btn"
            onClick={handlePicUpload}
            disabled={resDP ? false : true}
          >
            upload
          </button>
        </div>

        <div className="additemcontainer">
          <input
            type="submit"
            value="Add item"
            className={resDP ? "paymentbutton" : "additembtn-disable"}
            disabled={resDP ? false : true}
          />
          {/* Add Item onClick={handleAddItem}
          </input> */}
        </div>
      </form>
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
