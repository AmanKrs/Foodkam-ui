import React, { useState } from "react";
import axios from "axios";
import "../../../utils/resInterceptor";
const imgStorageurl = process.env.REACT_APP_Image_Storage;
const apiurl = process.env.REACT_APP_API_URL;

export default function AddMenu() {
  const [menuData, setMenuData] = useState();
  const [mediaSize, setMediaSize] = useState(false);
  const [itemPicUrl, setItemPicUrl] = useState();

  const handleMenuFormdata = (e) => {
    setMenuData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
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
    setMenuData((prev) => ({
      ...prev,
      [e.target.name]: itemPicUrl,
    }));
  };

  const handleAddItem = async () => {
    const menuItemData = await axios.post(
      `${apiurl}/restaurant/addmenu`,
      menuData
    );
    console.log(menuItemData);
  };
  return (
    <div>
      <h3>Restaurant Menu</h3>
      <div className="p-form-inputs">
        <div>
          <label className="p-form-label">Item Name</label>
          <input
            className="p-input-text"
            type="text"
            name="itemname"
            onChange={handleMenuFormdata}
          ></input>
        </div>
        <div>
          <label className="p-form-label">Quantity</label>
          <input
            className="p-select-text"
            name="quantity"
            onChange={handleMenuFormdata}
          ></input>
        </div>
      </div>
      <div className="p-form-inputs">
        <div>
          <label className="p-form-label">Category</label>
          <select
            className="p-select-text"
            name="category"
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
            type="text"
            name="itemprice"
            onChange={handleMenuFormdata}
          ></input>
        </div>
      </div>
      <div>
        <div>
          <label className="p-form-label">Item Picture</label>
          <input
            className="p-input-text"
            name="resitempic"
            type="file"
            onChange={handleItemPicdata}
          ></input>
          <button name="itempic" onClick={handlePicUpload}>
            upload
          </button>
        </div>
      </div>
      <button onClick={handleAddItem}>Add Item</button>
    </div>
  );
}
