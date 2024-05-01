import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";

const Error = () => {
  return (
    <Box
      sx={{
        textAlign: "center",
        my: 8,
        "& > *": {
          mb: 2, // create space between elements
        },
      }}
    >
      <Typography
        variant="h2"
        component="h2"
        sx={{ fontWeight: "bold", fontSize: "2.25rem", mb: 2 }}
      >
        Error, page not found
      </Typography>
      <Typography sx={{ mb: 2 }}>
        Please go back to login <br />
      </Typography>

      <Button
        component={RouterLink}
        to="/signin"
        variant="contained"
        sx={{
          bgcolor: "primary.main",
          py: 1,
          px: 3,
          borderRadius: "50px", // Rounded corners
          color: "common.white",
        }}
      >
        Login
      </Button>
    </Box>
  );
};

export default Error;
