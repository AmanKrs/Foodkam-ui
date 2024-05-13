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
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const apiurl = process.env.REACT_APP_API_URL;

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const steps = ["Restaurant Information", "Restaurant Time and Type"];

export default function AddResturant() {
  const [activeStep, setActiveStep] = useState(0);
  const [resData, setResData] = useState();

  const navigate = useNavigate();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleFinish = async () => {
    try {
      const result = await axios.post(`${apiurl}/partner/register`, resData);
      console.log(result);
      navigate("/login");
    } catch (error) {
      console.log("error");
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
  };
  const handleResSignIn = () => {
    navigate("/login");
  };

  return (
    <>
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
                  All steps completed - We&apos;re good to go...😍
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Box sx={{ flex: "1 1 auto" }} />

                  <Button onClick={handleFinish}>Submit</Button>
                </Box>

                <Snackbar
                  open={true}
                  autoHideDuration={6000}
                  onClose={handleClose}
                >
                  <Alert
                    onClose={handleClose}
                    severity={"success"}
                    sx={{ width: "100%" }}
                  >
                    Hello
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
    </>
  );
}
