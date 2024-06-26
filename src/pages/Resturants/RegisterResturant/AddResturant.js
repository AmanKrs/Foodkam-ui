import React from "react";
import { useState, Fragment } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import RestaurantInfo from "./RestaurantInfo";
import RestaurantTime from "./RestaurantTime";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import RegisteredRestaurant from "./RegisteredRestaurant";

const apiurl = process.env.REACT_APP_API_URL;

const steps = ["Restaurant Information", "Restaurant Time and Type"];

export default function AddResturant() {
  const [activeStep, setActiveStep] = useState(0);
  const [resData, setResData] = useState({
    resName: "",
    address: "",
    resowner: "",
    phone: "",
    password: "",
    resopentime: "",
    resclosetime: "",
    restype: "",
    cuisine: "",
  });

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

  const handleNext = () => {
    console.log(resData);
    if (activeStep === 0) {
      if (
        resData.resName == "" ||
        resData.address == "" ||
        resData.password == "" ||
        resData.resowner == "" ||
        resData.phone == ""
      ) {
        alert("Please enter the required Details");
      } else {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    }
    if (activeStep === 1) {
      if (
        resData.resopentime == "" ||
        resData.resclosetime == "" ||
        resData.restype == "" ||
        resData.cuisine == ""
      ) {
        alert("Please enter the required Details");
      } else {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    }
  };
  const handleBack = () => {
    setResData({
      resName: "",
      address: "",
      resowner: "",
      phone: "",
      password: "",
      resopentime: "",
      resclosetime: "",
      restype: "",
      cuisine: "",
    });
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setResData({
      resName: "",
      address: "",
      resowner: "",
      phone: "",
      password: "",
      resopentime: "",
      resclosetime: "",
      restype: "",
      cuisine: "",
    });
    setActiveStep(0);
  };

  const handleFinish = async () => {
    try {
      const result = await axios.post(`${apiurl}/partner/register`, resData);
      console.log(result);
      setOpen(true);
      setSeverityMsg("success");

      if (result.status === 200) {
        setSnackMsg(result.data.msg);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (e) {
      console.log("error", e);
      setOpen(true);
      setSeverityMsg("error");
      setSnackMsg(e.response.data.msg);

      if (e.response?.status === 403) {
        setSnackMsg(e.response.data.msg);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    }
  };

  const handleResSignIn = () => {
    navigate("/login");
  };

  return (
    <div className="res-pro-container">
      <div className="res-register-nav">
        <div className="res-nav-head">
          <h1 className="res-nav-h1">Partner With Us</h1>
          <hr className="res-nav-hr"></hr>
          <p className="res-nav-p">Register your Restaurant</p>
        </div>
        <h1 className="res-signIn-btn" onClick={handleResSignIn}>
          Sign-In
        </h1>
      </div>

      <div className="ResAdd-container">
        <Box sx={{ width: "100%", margin: "auto" }}>
          <Stepper activeStep={activeStep} className="Stepperlabelcolor">
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};

              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === 0 && (
            <RestaurantInfo setResData={setResData} resData={resData} />
          )}
          {activeStep === 1 && (
            <RestaurantTime setResData={setResData} resData={resData} />
          )}

          {activeStep === steps.length ? (
            <Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                <RegisteredRestaurant formData={resData} />
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleReset}>Reset</Button>
                <Button onClick={handleFinish}>Submit</Button>
              </Box>

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
            </Fragment>
          ) : (
            <Fragment>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                {activeStep === steps.length - 1 && (
                  <Button onClick={handleReset}>Reset</Button>
                )}
                <Button onClick={handleNext}>
                  {activeStep === steps.length - 1 ? "Confrim" : "Next"}
                </Button>
              </Box>
            </Fragment>
          )}
        </Box>
      </div>
    </div>
  );
}
