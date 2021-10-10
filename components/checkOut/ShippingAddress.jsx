import React from "react";

import { Stack, TextField, Grid } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CheckOutStep from "./CheckOutStep";

const ShippingAddress = ({
  handleSubmit,
  submitHandler,
  control,
  errors,
  Controller,
  loading,
}) => {
  return (
    <>
      <CheckOutStep activeStep={0} />
      <p className="mb-4 text-xl">Shipping Address</p>
      <form onSubmit={handleSubmit(submitHandler)}>
        <Stack spacing={3} md={6}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="fullName"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  minLength: 1,
                }}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    type="text"
                    label="Full Name"
                    placeholder="enter your name"
                    autoFocus
                    variant="outlined"
                    style={{ border: "none!important" }}
                    error={Boolean(errors.fullName)}
                    helperText={
                      errors.fullName
                        ? errors.fullName.type === "minLength"
                          ? "fullName is must be 2 character"
                          : "fullName is required"
                        : ""
                    }
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                }}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    type="email"
                    label="Email"
                    placeholder="enter your Email"
                    variant="outlined"
                    style={{ border: "none!important" }}
                    error={Boolean(errors.email)}
                    helperText={
                      errors.email
                        ? errors.email.type === "pattern"
                          ? "Email is not valid"
                          : "Email is required"
                        : ""
                    }
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="city"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  minLength: 1,
                }}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    type="text"
                    label="city"
                    placeholder="enter your city"
                    variant="outlined"
                    style={{ border: "none!important" }}
                    error={Boolean(errors.city)}
                    helperText={
                      errors.city
                        ? errors.city.type === "minLength"
                          ? "city is must be 2 character"
                          : "city is required"
                        : ""
                    }
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="postalCode"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  minLength: 1,
                }}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    type="number"
                    label="postalCode"
                    placeholder="enter your postalCode"
                    variant="outlined"
                    style={{ border: "none!important" }}
                    error={Boolean(errors.postalCode)}
                    helperText={
                      errors.postalCode
                        ? errors.postalCode.type === "minLength"
                          ? "postalCode is must be 2 character"
                          : "postalCode is required"
                        : ""
                    }
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="country"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  minLength: 1,
                }}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    type="text"
                    label="country"
                    placeholder="enter your country"
                    variant="outlined"
                    style={{ border: "none!important" }}
                    error={Boolean(errors.country)}
                    helperText={
                      errors.country
                        ? errors.country.type === "minLength"
                          ? "country is must be 2 character"
                          : "country is required"
                        : ""
                    }
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="phoneNumber"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  minLength: 1,
                }}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    type="number"
                    label="phoneNumber"
                    placeholder="enter your phoneNumber"
                    autoFocus
                    variant="outlined"
                    style={{ border: "none!important" }}
                    error={Boolean(errors.phoneNumber)}
                    helperText={
                      errors.phoneNumber
                        ? errors.phoneNumber.type === "minLength"
                          ? "phoneNumber is must be 2 character"
                          : "phoneNumber is required"
                        : ""
                    }
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Controller
                name="address"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  minLength: 1,
                }}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    type="text"
                    label="address"
                    multiline
                    variant="filled"
                    maxRows={4}
                    placeholder="enter your address"
                    autoFocus
                    variant="outlined"
                    style={{ border: "none!important" }}
                    error={Boolean(errors.address)}
                    helperText={
                      errors.address
                        ? errors.address.type === "minLength"
                          ? "address is must be 2 character"
                          : "address is required"
                        : ""
                    }
                    {...field}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 2 }}
        ></Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={loading}
        >
          Continue
        </LoadingButton>
      </form>
    </>
  );
};

export default ShippingAddress;
