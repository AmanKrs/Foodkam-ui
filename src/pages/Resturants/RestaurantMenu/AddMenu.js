import React, { useState } from "react";

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
    setMenuData((prev) => ({
      ...prev,
      [e.target.name]: itemPicUrl,
    }));
  };

  const handleAddItem = () => {
    console.log(menuData);
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
          <select
            className="p-select-text"
            name="quantity"
            onChange={handleMenuFormdata}
          >
            <option></option>
            <option>Electronics</option>
            <option>Home Appliances </option>
            <option>Men's clothing</option>
            <option>Women's clothing</option>
            <option>Kids Wear</option>
            <option>Jewelery</option>
            <option>Mobiles</option>
          </select>
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
            <option>Electronics</option>
            <option>Home Appliances </option>
            <option>Men's clothing</option>
            <option>Women's clothing</option>
            <option>Kids Wear</option>
            <option>Jewelery</option>
            <option>Mobiles</option>
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
          <label className="p-form-label">cuisine type</label>
          <input
            className="p-input-text"
            type="text"
            name="itemcuisine"
            onChange={handleMenuFormdata}
          ></input>
        </div>
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
