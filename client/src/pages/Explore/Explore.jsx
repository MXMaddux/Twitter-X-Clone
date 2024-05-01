import { Box, Grid } from "@mui/material";
import React from "react";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import RightSidebar from "../../components/RightSidebar/RightSidebar";
import ExploreTweets from "../../components/ExploreTweets/ExploreTweets";
import Signin from "../Signin/Signin";
import { useSelector } from "react-redux";

const Explore = () => {
  const { currentUser } = useSelector((state) => state.user);
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
              <ExploreTweets />
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

export default Explore;
