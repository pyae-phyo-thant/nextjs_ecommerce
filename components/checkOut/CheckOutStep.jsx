import { StepLabel, Stepper, Step } from "@mui/material";
import React from "react";

const CheckOutStep = ({ activeStep = 0 }) => {
  return (
    <Stepper activeStep={activeStep} alternativeLabel>
      {["Shipping Address", "Payment Methond", "Place Order"].map((step) => (
        <Step key={step}>
          <StepLabel>{step}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default CheckOutStep;
