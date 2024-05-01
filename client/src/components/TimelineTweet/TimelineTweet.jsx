import React, { useEffect, useState } from "react";
import axios from "axios";

import { useSelector } from "react-redux";
import Tweet from "../Tweet/Tweet";
import { Box } from "@mui/material";

const TimelineTweet = () => {
  const [timeLine, setTimeLine] = useState(null);

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const timelineTweets = await axios.get(
          `/tweets/timeline/${currentUser._id}`
        );
        console.log(timelineTweets);
        setTimeLine(timelineTweets.data);
      } catch (err) {
        console.log("error", err);
      }
    };

    fetchData();
  }, [currentUser._id]);

  console.log("Timeline", timeLine);
  return (
    <Box sx={{ mt: 6 }}>
      {timeLine &&
        timeLine.map((tweet) => {
          return (
            <Box key={tweet._id} sx={{ p: 2 }}>
              <Tweet tweet={tweet} setData={setTimeLine} />
            </Box>
          );
        })}
    </Box>
  );
};

export default TimelineTweet;
