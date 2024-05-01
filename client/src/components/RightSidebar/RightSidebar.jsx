import React from "react";
import { theme } from "../../theme";
import { Box, Grid, Stack, Typography } from "@mui/material";

const RightSidebar = () => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Stack
        spacing={2}
        sx={{
          padding: 6,
          backgroundColor: theme.palette.slate.main900,
          width: "8rem",
        }}
      >
        <Typography
          variant="h2"
          sx={{ fontSize: "medium", alignSelf: "flex-start" }}
        >
          Trending
        </Typography>
        <Typography
          component="p"
          sx={{ fontWeight: "bold", alignSelf: "flex-start" }}
        >
          #ScottTheDog
        </Typography>
        <Typography
          component="p"
          sx={{ fontWeight: "bold", alignSelf: "flex-start" }}
        >
          #MarkTheCat
        </Typography>
        <Typography
          component="p"
          sx={{ fontWeight: "bold", alignSelf: "flex-start" }}
        >
          #ChrisTheCat
        </Typography>
        <Typography
          component="p"
          sx={{ fontWeight: "bold", alignSelf: "flex-start" }}
        >
          #FreePalestine
        </Typography>
      </Stack>
    </Box>
  );
};

export default RightSidebar;
