import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Tweet from "../Tweet/Tweet";
import { Box } from "@mui/material";

const ExploreTweets = () => {
  const [explore, setExplore] = useState(null);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const exploreTweets = await axios.get("/tweets/explore");
        setExplore(exploreTweets.data);
      } catch (err) {
        console.log("error", err);
      }
    };
    fetchData();
  }, [currentUser._id]);
  return (
    <Box sx={{ mt: 6 }}>
      {explore &&
        explore.map((tweet) => {
          return (
            <Box key={tweet._id} sx={{ p: 2 }}>
              <Tweet tweet={tweet} setData={setExplore} />
            </Box>
          );
        })}
    </Box>
  );
};

export default ExploreTweets;
