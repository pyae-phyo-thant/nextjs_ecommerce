import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import Head from "next/head";
import { useForm, Controller } from "react-hook-form";

import { Store } from "../utils/Store";
import ShippingAddress from "../components/checkOut/ShippingAddress";

const shipping = () => {
  const router = useRouter();

  const { state, dispatch } = useContext(Store);

  const {
    userInfo,
    cart: { shippingAddress },
  } = state;

  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    if (!userInfo) {
      router.push("/login?redirect=/shipping");
    }
    setValue("fullName", shippingAddress.fullName);
    setValue("address", shippingAddress.address);
    setValue("city", shippingAddress.city);
    setValue("postalCode", shippingAddress.postalCode);
    setValue("country", shippingAddress.country);
    setValue("email", shippingAddress.email);
    setValue("phoneNumber", shippingAddress.phoneNumber);
  }, []);

  const submitHandler = ({
    fullName,
    address,
    city,
    postalCode,
    country,
    email,
    phoneNumber,
  }) => {
    setLoading(true);

    dispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: {
        fullName,
        address,
        city,
        postalCode,
        email,
        country,
        phoneNumber,
      },
    });

    const data = {
      fullName,
      address,
      city,
      postalCode,
      country,
      email,
      phoneNumber,
    };

    Cookies.set("shippingAddress", JSON.stringify(data));

    router.push("/payment");

    setLoading(false);
  };

  return (
    <>
      <Head>
        <title> Shipping | Ecommerce Myanmar </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-white shadow-md mx-auto px-5 py-5 mt-6 rounded-lg w-4/6">
        <h3 className="text-center text-4xl font-semiBold mt-5 mb-5">
          Checkout
        </h3>
        <ShippingAddress
          handleSubmit={handleSubmit}
          submitHandler={submitHandler}
          control={control}
          errors={errors}
          Controller={Controller}
          loading={loading}
        />
      </div>
    </>
  );
};

export default shipping;
