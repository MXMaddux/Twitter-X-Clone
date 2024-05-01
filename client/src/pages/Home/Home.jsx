import React from "react";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import MainTweet from "../../components/MainTweet/MainTweet";
import RightSidebar from "../../components/RightSidebar/RightSidebar";
import { Box, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import Signin from "../Signin/Signin";
import Tweet from "../../components/Tweet/Tweet";
import TimelineTweet from "../../components/TimelineTweet/TimelineTweet";

const Home = () => {
  const { currentUser } = useSelector((state) => state.user);
  console.log("user: " + currentUser.username);
  return (
    <>
      {!currentUser ? (
        <Signin />
      ) : (
        <Grid container>
          <Grid item xs={12} md={3}>
            <Box sx={{ padding: "0 32px" }}>
              <LeftSidebar />
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{ borderLeft: 1, borderRight: 1, borderColor: "divider" }}
          >
            <Box sx={{ padding: "0 32px" }}>
              <MainTweet />
              <TimelineTweet />
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={3}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <RightSidebar />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Home;
