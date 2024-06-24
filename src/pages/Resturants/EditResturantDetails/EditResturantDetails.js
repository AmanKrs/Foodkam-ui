import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import "../../../utils/resInterceptor";

const apiurl = process.env.REACT_APP_API_URL;

export default function EditResturantDetails() {
  const data = useLocation();
  const navigate = useNavigate();
  const item = data.state;
  const [editFormData, setEditFormData] = useState(item);
  const [open, setOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState();
  const [resDP, setResDP] = useState(false);
  const [severityMsg, setSeverityMsg] = useState();

  const undoEditProduct = () => {
    navigate("/partner/profile/menulist");
  };

  const handleEditFormdata = (e) => {
    setEditFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleEditProduct = async (e) => {
    e.preventDefault();
    try {
      const editedResult = await axios.put(`${apiurl}/restaurant/editproduct`, {
        editFormData,
      });
      if (editedResult.status == 200) {
        setOpen(true);
        setSeverityMsg("success");
        setSnackMsg("Item Added");
        setResDP(false);
        navigate("/partner/profile/menulist");
      }
    } catch (e) {
      alert(e.response.msg);
    }
  };

  const deleteProduct = async () => {
    try {
      const result = await axios.delete(
        `${apiurl}/restaurant/deleteitem`,

        { data: editFormData }
      );
      if (result.status == 200) {
        setOpen(true);
        setSeverityMsg("success");
        setSnackMsg("Item Deleted");
        navigate("/partner/profile/menulist");
      }
    } catch (e) {
      if (e.response.status == 403) {
        setOpen(true);
        setSeverityMsg("error");
        setSnackMsg("Error deleting item value");
      } else {
        setOpen(true);
        setSeverityMsg("error");
        setSnackMsg("Error deleting item value");
      }
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      <h3 style={{ color: "#eba148" }}>Edit Menu Item</h3>
      <form className="input-container" onSubmit={handleEditProduct}>
        <div className="p-form-inputs">
          <div>
            <label className="p-form-label">Item Name</label>
            <input
              className="p-input-text"
              type="text"
              name="itemname"
              defaultValue={item.itemname}
              required
              onChange={handleEditFormdata}
            ></input>
          </div>
          <div>
            <label className="p-form-label">Quantity</label>
            <input
              className="p-select-text"
              type="number"
              name="quantity"
              defaultValue={item.quantity}
              onChange={handleEditFormdata}
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
              defaultValue={item.category}
              required
              onChange={handleEditFormdata}
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
              defaultValue={item.description}
              required
              onChange={handleEditFormdata}
            ></input>
          </div>
        </div>
        <div className="p-form-inputs">
          <div>
            <label className="p-form-label">Item type</label>
            <select
              className="p-select-text"
              name="itemtype"
              defaultValue={item.itemtype}
              required
              onChange={handleEditFormdata}
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
              defaultValue={item.itemprice}
              required
              onChange={handleEditFormdata}
            ></input>
          </div>
        </div>
        <div className="additemcontainer">
          <input
            type="submit"
            value="Save"
            style={{
              fontSize: "0.85rem",
            }}
            className="paymentbutton"
          />
        </div>
      </form>
      <div className="additemcontainer">
        <button
          className="paymentbutton"
          style={{
            backgroundColor: "orange",
            marginLeft: "1rem",
            fontSize: "0.85rem",
          }}
          onClick={undoEditProduct}
        >
          Discard
        </button>
        <button
          style={{
            backgroundColor: "red",
            marginLeft: "1rem",
            marginRight: "1rem",
            fontSize: "0.85rem",
          }}
          className="paymentbutton"
          onClick={deleteProduct}
        >
          Delete
        </button>
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
