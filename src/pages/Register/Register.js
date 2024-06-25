import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
const apiurl = process.env.REACT_APP_API_URL;

export default function Register() {
  const [userRegFormData, setUserRegFormData] = useState();
  const [open, setOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState();
  const [severityMsg, setSeverityMsg] = useState();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const navigate = useNavigate();

  const handleRegForm = (event) => {
    setUserRegFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleCustLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${apiurl}/user/signup`, userRegFormData);
      console.log(userRegFormData);
      console.log(res.status);
      if (res.status === 200) {
        // localStorage.setItem("token", res.data.token);
        navigate("/login");
        window.location.reload();
      }
    } catch (e) {
      console.log(e);
      setOpen(true);
      setSeverityMsg("error");
      setSnackMsg(e.response.data.msg);
    }
  };

  return (
    <div className="authdiv">
      <div className="authcontainer">
        <div className="loginbox">
          <Snackbar
            open={open}
            autoHideDuration={5000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            // key={vertical + horizontal}
          >
            <Alert
              severity={severityMsg}
              sx={{ width: "100%" }}
              onClose={handleClose}
              variant="filled"
            >
              {snackMsg}
            </Alert>
          </Snackbar>
          <div className="authbtn-container">
            <div className="authbtntrue authbtn">
              <span>user registration </span>
            </div>
          </div>

          <div className="logindiv">
            <form className="logindivform" onSubmit={handleCustLogin}>
              <input
                type="text"
                className="loginid"
                placeholder="FirstName"
                name="firstName"
                required
                onChange={handleRegForm}
              />
              <input
                type="text"
                className="loginid"
                placeholder="LastName"
                name="lastName"
                required
                onChange={handleRegForm}
              />
              <input
                type="email"
                className="loginid"
                placeholder="Enter your email"
                name="email"
                required
                onChange={handleRegForm}
              />
              <input
                type="tel"
                className="loginid"
                placeholder="Phone Number"
                name="phone"
                required
                onChange={handleRegForm}
              />
              <input
                type="password"
                className="loginid"
                placeholder="Password"
                name="password"
                required
                onChange={handleRegForm}
              />
              <input type="submit" value="Sign-up" className="loginidbtn" />
            </form>
            <NavLink
              to="/login"
              style={({ isActive, isPending }) => {
                return {
                  fontWeight: isActive ? "bold" : "",
                  color: isActive ? "blue" : "white",
                };
              }}
            >
              <p className="item">Already have Account? Login yourself</p>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
