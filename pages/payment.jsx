import React, { useEffect, useContext, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Head from "next/head";
import {
  Button,
  FormControl,
  FormControlLabel,
  List,
  ListItem,
  Radio,
  RadioGroup,
} from "@mui/material";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";

import { Store } from "../utils/Store";
import CheckOutStep from "../components/checkOut/CheckOutStep";

const payment = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const { state, dispatch } = useContext(Store);
  const [loading, setLoading] = useState(false);

  const {
    cart: { shippingAddress },
  } = state;
  const router = useRouter();

  useEffect(() => {
    if (!shippingAddress.address) {
      router.push("/shipping");
    } else {
      setPaymentMethod(Cookies.get("paymentMethod" || ""));
    }
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    if (!paymentMethod) {
      toast.warning("Payment Method is Required");
      setLoading(false);
    } else {
      dispatch({ type: "SAVE_PAYMENT_METHOD", payload: paymentMethod });
      Cookies.set("paymentMethod", paymentMethod);
      setLoading(false);

      router.push("/placeorder");
    }
  };

  return (
    <>
      <Head>
        <title> Payment | Ecommerce Myanmar </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-white shadow-md mx-auto px-5 py-5 mt-6 rounded-lg w-4/6">
        <h3 className="text-center text-4xl font-semiBold mt-5 mb-5">
          Checkout
        </h3>
        <CheckOutStep activeStep={1} />
        <p className="mt-2 text-xl">Payment Method</p>
        <form onSubmit={submitHandler}>
          <List>
            <ListItem>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="Payment Method"
                  name="paymentMethod"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <FormControlLabel
                    label="PayPal"
                    value="PayPal"
                    control={<Radio />}
                  />
                  <FormControlLabel
                    label="Stripe"
                    value="Stripe"
                    control={<Radio />}
                  />
                  <FormControlLabel
                    label="Cash"
                    value="Cash"
                    control={<Radio />}
                  />
                </RadioGroup>
              </FormControl>
            </ListItem>
            <ListItem>
              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                loading={loading}
              >
                Continue
              </LoadingButton>
            </ListItem>
            <ListItem>
              <Button
                fullWidth
                type="button"
                onClick={() => router.push("/shipping")}
              >
                Back
              </Button>
            </ListItem>
          </List>
        </form>
      </div>
    </>
  );
};

export default payment;
