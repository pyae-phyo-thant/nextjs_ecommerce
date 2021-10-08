import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useForm, Controller } from "react-hook-form";

// material
import { styled } from "@mui/styles";
import { Card, Stack, Container, Typography } from "@mui/material";
// components
import LoginForm from "../components/auth/LoginForm";
import AuthSocial from "../components/auth/AuthSocial";
import { Store } from "../utils/Store";

const SectionStyle = styled(Card)(() => ({
  width: "100%",
  maxWidth: 464,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  margin: "2 0 2 2",
}));

const ContentStyle = styled("div")(() => ({
  maxWidth: 480,
  margin: "auto",
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
  justifyContent: "center",
  padding: "10 0",
}));

const login = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const router = useRouter();
  const { redirect } = router.query;
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userInfo) {
      router.push("/");
    }
  }, []);

  const submitHandler = async ({ email, password }) => {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/auth/login", { email, password });
      dispatch({ type: "USER_LOGIN", payload: data });

      Cookies.set("userInfo", JSON.stringify(data));

      router.push(redirect || "/");

      toast.success("successfully login");
      setLoading(false);
    } catch (error) {
      toast.error("Invalid email or password");
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Ecommerce Myanmar | Login</title>
        <meta name="description" content="Login to our app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        style={{ display: "flex" }}
        className="mt-10 ml-6 mr-6 md:ml-10 md:mr-10"
      >
        {/* <MHidden width="mdDown"> */}
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            Hi, Welcome Back
          </Typography>
          <Image
            src="/images/illustrations/illustration_login.png"
            width="400"
            height="300"
            alt="login"
          />
        </SectionStyle>
        {/* </MHidden> */}

        <Container maxWidth="sm">
          <ContentStyle>
            <Stack sx={{ mb: 5 }}>
              <Typography variant="h4" gutterBottom>
                Sign in to Minimal
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                Enter your details below.
              </Typography>
            </Stack>
            <AuthSocial />

            <LoginForm
              submitHandler={submitHandler}
              Controller={Controller}
              handleSubmit={handleSubmit}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              loading={loading}
              control={control}
              errors={errors}
            />

            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
              Don’t have an account?&nbsp;
              <span className="text-blue-500">
                <Link href="/register">Get started</Link>
              </span>
            </Typography>
          </ContentStyle>
        </Container>
      </div>
    </>
  );
};

export default login;
