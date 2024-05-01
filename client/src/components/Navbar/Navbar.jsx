import React, { useState } from "react";
import xLogo from "../../assets/img/x.jpg";
import { Box, Grid, Typography, Input } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import StarBorderPurple500Icon from "@mui/icons-material/StarBorderPurple500";
import { theme } from "../../theme";

import { useLocation } from "react-router-dom";
import UserPlaceholder from "../UserPlaceholder/UserPlaceholder";

const Navbar = () => {
  const [userData, setUserData] = useState(null);
  const location = useLocation().pathname;

  return (
    <Box sx={{ width: "100%", my: 5 }}>
      <Grid container alignItems="center" justifyContent="space-between">
        {/* X Logo on the left */}
        <Grid
          item
          xs={3}
          md={3}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <img src={xLogo} alt="TwiX Logo" width="40px" />
        </Grid>

        {/* Center items with borders and home icon */}
        <Grid
          item
          xs={6}
          md={6}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderLeft: 1,
            borderRight: 1,
            borderColor: "divider",
            px: 2,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {location.includes("profile") ? (
              <UserPlaceholder setUserData={setUserData} userData={userData} />
            ) : location.includes("explore") ? (
              "Explore"
            ) : (
              "Home"
            )}
          </Typography>
          <StarBorderPurple500Icon />
        </Grid>

        {/* Search bar on the right */}
        <Grid
          item
          xs={3}
          md={3}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Box sx={{ position: "relative" }}>
            <SearchIcon
              sx={{
                position: "absolute",
                left: 0,
                top: "50%",
                transform: "translateY(-50%)",
                ml: 1,
              }}
            />
            <Input
              disableUnderline
              placeholder="Search"
              sx={{
                pl: 4, // Adjusted padding to not overlap the icon
                backgroundColor: theme.palette.primary.main100,
                borderRadius: 50,
                py: 1,
                px: 2,
                width: "100%",
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Navbar;
