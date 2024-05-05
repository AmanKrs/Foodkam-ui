import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
const apiurl = process.env.REACT_APP_API_URL;

export default function Register() {
  const [userRegFormData, setUserRegFormData] = useState();

  const navigate = useNavigate();

  const handleRegForm = (event) => {
    setUserRegFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleCustLogin = async () => {
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
    }
  };

  return (
    <div className="authdiv">
      <div className="authcontainer">
        <div className="loginbox">
          <div className="authbtn-container">
            <div className="authbtntrue authbtn">
              <span>user registration </span>
            </div>
          </div>

          <div className="logindiv">
            <input
              type="text"
              className="loginid"
              placeholder="FirstName"
              name="firstName"
              onChange={handleRegForm}
            />
            <input
              type="text"
              className="loginid"
              placeholder="LastName"
              name="lastName"
              onChange={handleRegForm}
            />
            <input
              type="email"
              className="loginid"
              placeholder="Enter your email"
              name="email"
              onChange={handleRegForm}
            />
            <input
              type="tel"
              className="loginid"
              placeholder="Phone Number"
              name="phone"
              onChange={handleRegForm}
            />
            <input
              type="password"
              className="loginid"
              placeholder="Password"
              name="password"
              onChange={handleRegForm}
            />
            <button onClick={handleCustLogin} className="loginidbtn">
              sign-up
            </button>

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
