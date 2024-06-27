import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import "./login.css";
import { useDispatch, useSelector } from "react-redux";
import { LoginCustomer, LoginRestaurant } from "../../redux/Login/action";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function Login() {
  const [custLogin, setCustLogin] = useState(true);
  const [verifyOtp, setVerifyOtp] = useState(false);
  const [loginFormData, setLoginFormData] = useState();
  const [open, setOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState();
  const [severityMsg, setSeverityMsg] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const handleCustLogin = async () => {
    let payload = loginFormData;
    dispatch(
      LoginCustomer({
        payload,
        cb: (result) => {
          if (result.status === 200) {
            localStorage.setItem("token", result.data.token);
            navigate("/");
          } else {
            console.log("first", result);
            setOpen(true);
            setSeverityMsg("error");
            setSnackMsg(result.response.data.msg);
          }
        },
      })
    );
  };
  const handleVerifyOtp = async () => {
    setVerifyOtp(!verifyOtp);
    // try{
    //   const result = await axios.post(
    //     "http://ec2-3-110-103-234.ap-south-1.compute.amazonaws.com:8087/user/sendotp",
    //     loginFormData
    //   );
    //   console.log(result)
    // }catch(e){
    //   console.log(e)
    // }
  };

  const handleResLogin = async () => {
    let payload = loginFormData;
    dispatch(
      LoginRestaurant({
        payload,
        cb: (result) => {
          if (result.status === 200) {
            localStorage.setItem("restoken", result.data.token);
            navigate("/partner/profile");
          } else {
            setOpen(true);
            setSeverityMsg("error");
            setSnackMsg(result.response.data.msg);
          }
        },
      })
    );
  };
  const handleCustButton = () => {
    setCustLogin(!custLogin);
    setVerifyOtp(false);
    console.log(custLogin);
  };
  const handleResButton = () => {
    setCustLogin(!custLogin);
    setVerifyOtp(false);
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
            <div
              className={custLogin ? "authbtn authbtntrue" : "authbtn"}
              onClick={handleCustButton}
            >
              <span>customer login</span>
            </div>

            <div
              className={!custLogin ? "authbtn authbtntrue" : "authbtn"}
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
              name="phone"
              onChange={handleLoginForm}
            />
            {verifyOtp && (
              <>
                <label className="otplabel">Enter your Password</label>
                <input
                  type="password"
                  className="otpvalue"
                  placeholder="Enter OTP"
                  name="password"
                  onChange={handleLoginForm}
                />
                {/* <span className="otplabel">OTP send to above phone number</span> */}
              </>
            )}
            {custLogin && !verifyOtp && (
              <button onClick={handleVerifyOtp} className="loginidbtn">
                {/* Send One Time Password */}Next
              </button>
            )}
            {custLogin && verifyOtp && (
              <button onClick={handleCustLogin} className="loginidbtn">
                Login
              </button>
            )}
            {!custLogin && !verifyOtp && (
              <button onClick={handleVerifyOtp} className="loginidbtn">
                {/* Send One Time Password */}Next
              </button>
            )}
            {!custLogin && verifyOtp && (
              <button onClick={handleResLogin} className="loginidbtn">
                Login
              </button>
            )}

            <p className="logindivider">
              <span>OR</span>
            </p>
            {/* <GoogleLogin
              onSuccess={(credentialResponse) => sendToken(credentialResponse)}
              onError={() => {
                console.log("Login Failed");
              }}
            /> */}
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
              {!custLogin && (
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
