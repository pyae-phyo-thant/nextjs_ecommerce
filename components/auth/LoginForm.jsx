import React from "react";
import Link from "next/link";

// material
import {
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { Icon } from "@iconify/react";
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";

const LoginForm = ({
  submitHandler,
  handleSubmit,
  showPassword,
  setShowPassword,
  loading,
  Controller,
  control,
  errors,
}) => {
  return (
    <>
      <form onSubmit={handleSubmit(submitHandler)}>
        <Stack spacing={3}>
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
                name="email"
                label="Email address"
                placeholder="enter your email"
                autoFocus
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
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 2 }}
        >
          <FormControlLabel control={<Checkbox />} label="Remember me" />

          <Link href="forgotpassword">Forgot password?</Link>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={loading}
        >
          Login
        </LoadingButton>
      </form>
    </>
  );
};

export default LoginForm;
