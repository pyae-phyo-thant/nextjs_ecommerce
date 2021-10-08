import React from "react";

import { Icon } from "@iconify/react";
import googleFill from "@iconify/icons-eva/google-fill";
import facebookFill from "@iconify/icons-eva/facebook-fill";
// material
import { Stack, Button, Divider, Typography } from "@mui/material";

const AuthSocial = ({ googleLogin, facebookLogin }) => {
  return (
    <>
      <Stack direction="row" spacing={2}>
        <Button
          onClick={googleLogin}
          fullWidth
          size="large"
          color="inherit"
          variant="outlined"
        >
          <Icon icon={googleFill} color="#DF3E30" height={24} />
        </Button>

        <Button
          onClick={facebookLogin}
          fullWidth
          size="large"
          color="inherit"
          variant="outlined"
        >
          <Icon icon={facebookFill} color="#1877F2" height={24} />
        </Button>
      </Stack>

      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          OR
        </Typography>
      </Divider>
    </>
  );
};

export default AuthSocial;
