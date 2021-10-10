import React from "react";

import { Stack, TextField, IconButton, InputAdornment } from "@mui/material";

import { LoadingButton } from "@mui/lab";
import { Icon } from "@iconify/react";
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";

const RegisterForm = ({
  submitHandler,
  handleSubmit,
  loading,
  confirmedPassword,
  showPassword,
  setShowPassword,
  Controller,
  control,
  errors,
}) => {
  return (
    <>
      <form onSubmit={handleSubmit(submitHandler)}>
        <Stack spacing={3}>
          <Controller
            name="name"
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
                label="Name"
                placeholder="enter your name"
                autoFocus
                variant="outlined"
                style={{ border: "none!important" }}
                error={Boolean(errors.name)}
                helperText={
                  errors.name
                    ? errors.name.type === "minLength"
                      ? "Name is must be 2 character"
                      : "Name is required"
                    : ""
                }
                {...field}
              />
            )}
          />

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
                label="Email address"
                placeholder="enter your email"
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

          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{
              required: true,
              minLength: 6,
            }}
            render={({ field }) => (
              <TextField
                fullWidth
                autoComplete="current-password"
                type={showPassword ? "text" : "password"}
                label="Password "
                variant="outlined"
                style={{ border: "none!important" }}
                error={Boolean(errors.password)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                helperText={
                  errors.password
                    ? errors.password.type === "minLength"
                      ? "Password length is must be more than 5"
                      : "Password is required"
                    : ""
                }
                {...field}
              />
            )}
          />

          <Controller
            name="confirmedPassword"
            control={control}
            defaultValue=""
            rules={{
              required: true,
              minLength: 6,
            }}
            render={({ field }) => (
              <TextField
                fullWidth
                type={showPassword ? "text" : "password"}
                label="confirmed Password"
                variant="outlined"
                value={confirmedPassword}
                style={{ border: "none!important" }}
                error={Boolean(errors.confirmedPassword)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                helperText={
                  errors.confirmedPassword
                    ? errors.confirmedPassword.type === "minLength"
                      ? "Password length is must be more than 5"
                      : "Password Confirm is required"
                    : ""
                }
                {...field}
              />
            )}
          />
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
          Register
        </LoadingButton>
      </form>
    </>
  );
};

export default RegisterForm;
