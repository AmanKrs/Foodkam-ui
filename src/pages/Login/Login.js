import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import "./login.css";
export default function Login() {
  const [custLogin, setCustLogin] = useState(true);
  const [resLogin, setResLogin] = useState(false);
  const [verifyOtp, setVerifyOtp] = useState(false);
  const [loginFormData, setLoginFormData] = useState();
  const navigate = useNavigate();

  const handleCustLogin = async () => {
    try{
      const result = await axios.post(
        "http://localhost:8087/user/login",
        loginFormData
      );
      if(result.status ===200){
        localStorage.setItem("token", result.data.token);
        navigate("/");
        // window.location.reload();
      }
    }catch(e){
      console.log(e)
    }
    
  };
  const handleVerifyOtp = async() => {
    setVerifyOtp(!verifyOtp);
    // try{
    //   const result = await axios.post(
    //     "http://localhost:8087/user/sendotp",
    //     loginFormData
    //   );
    //   console.log(result)
    // }catch(e){
    //   console.log(e)
    // }
  };

  const handleResLogin = () => {
    localStorage.setItem("restoken", "restoken");
    navigate("/partner/your-resturant");
    window.location.reload();
  };
  const handleCustButton = () => {
    setCustLogin(true);
    setResLogin(false);
    setVerifyOtp(false);
    console.log(custLogin);
  };
  const handleResButton = () => {
    setCustLogin(false);
    setResLogin(true);
    setVerifyOtp(false);
    console.log(resLogin);
  };

  const handleLoginForm = (event) => {
    setLoginFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const sendToken = (credentialResponse) => {
    console.log(credentialResponse);
  };
  return (
    <div className="authdiv">
      <div className="authcontainer">
        <div className="loginbox">
          <div className="authbtn-container">
            <div
              className={custLogin ? "authbtn authbtntrue" : "authbtn"}
              onClick={handleCustButton}
            >
              <span>customer login</span>
            </div>

            <div
              className={resLogin ? "authbtn authbtntrue" : "authbtn"}
              onClick={handleResButton}
            >
              <span>resturant login</span>
            </div>
          </div>

          <div className="logindiv">
            <input
              type="tel"
              className="loginid"
              placeholder="Phone Number"
              name="mobileNo"
              onChange={handleLoginForm}
            />
            {verifyOtp && (
              <>
                <label className="otplabel">OTP Verification</label>
                <input
                  type="text"
                  className="otpvalue"
                  placeholder="Enter OTP"
                  name="password"
                  onChange={handleLoginForm}
                />
                <span className="otplabel">OTP send to above phone number</span>
              </>
            )}
            {custLogin && !verifyOtp && (
              <button onClick={handleVerifyOtp} className="loginidbtn">
                Send One Time Password
              </button>
            )}
            {custLogin && verifyOtp && (
              <button onClick={handleCustLogin} className="loginidbtn">
                Login
              </button>
            )}
            {resLogin && !verifyOtp && (
              <button onClick={handleVerifyOtp} className="loginidbtn">
                Send One Time Password
              </button>
            )}
            {resLogin && verifyOtp && (
              <button onClick={handleResLogin} className="loginidbtn">
                Login
              </button>
            )}

            <p className="logindivider">
              <span>OR</span>
            </p>
            <GoogleLogin
              onSuccess={(credentialResponse) => sendToken(credentialResponse)}
              onError={() => {
                console.log("Login Failed");
              }}
            />
            <div>
              {custLogin && (
                <NavLink
                  to="/register"
                  style={({ isActive, isPending }) => {
                    return {
                      fontWeight: isActive ? "bold" : "",
                      color: isActive ? "blue" : "white",
                    };
                  }}
                >
                  <p className="item">
                    Don't have Account? Register yourself now
                  </p>
                </NavLink>
              )}
              {resLogin && (
                <NavLink
                  to="/partner"
                  style={({ isActive, isPending }) => {
                    return {
                      fontWeight: isActive ? "bold" : "",
                      color: isActive ? "blue" : "white",
                    };
                  }}
                >
                  <p className="item">
                    Don't have Account? Register yourself now
                  </p>
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
