import React from "react";
import { Link as RouterLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import TagIcon from "@mui/icons-material/Tag";
import PersonIcon from "@mui/icons-material/Person";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/userSlice";
import { Box, Button, Stack, Typography, Link } from "@mui/material";
import { theme } from "../../theme";

const LeftSidebar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh", // Adjust to 90vh for md breakpoint if needed
        justifyContent: "space-between",
        marginRight: 6,
      }}
    >
      <Stack spacing={2} sx={{ mt: 6, flexGrow: 1, height: "100vh" }}>
        {" "}
        <Link component={RouterLink} to="/" sx={linkStyle}>
          <HomeIcon fontSize="large" />
          <Typography component="p">Home</Typography>
        </Link>
        <Link component={RouterLink} to="/explore" sx={linkStyle}>
          <TagIcon fontSize="large" />
          <Typography component="p">Explore</Typography>
        </Link>
        <Link
          component={RouterLink}
          to={`/profile/${currentUser._id}`}
          sx={linkStyle}
        >
          <PersonIcon fontSize="large" />
          <Typography component="p">Profile</Typography>
        </Link>
      </Stack>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Typography variant="body2" fontWeight="bold">
            {currentUser.username}
          </Typography>
          <Typography variant="body2" fontWeight="bold">
            @{currentUser.username}
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="error"
          onClick={handleLogout}
          sx={{ borderRadius: "50px", textTransform: "none", height: "32px" }} // Rounded button with no underline
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
};

const linkStyle = {
  display: "flex",
  alignItems: "center",
  color: theme.palette.slate.main200,
  px: 2,
  py: 2,
  borderRadius: "50px",
  textDecoration: "none",
  "&:hover": {
    bgcolor: "action.hover",
  },
  gap: 2, // Space between icon and text
};

export default LeftSidebar;
