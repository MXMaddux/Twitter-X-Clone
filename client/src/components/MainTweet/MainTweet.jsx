import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  Box,
  Button,
  TextareaAutosize,
  Typography,
  useTheme,
} from "@mui/material";
import Tweet from "../Tweet/Tweet";

const MainTweet = () => {
  const [tweetText, setTweetText] = useState("");
  const theme = useTheme(); // Use MUI theme
  const { currentUser } = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/tweets", {
        userId: currentUser._id,
        description: tweetText,
      });
      window.location.reload(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      {currentUser && (
        <Typography
          variant="subtitle1"
          component="p"
          sx={{ fontWeight: "bold", mt: 1, mb: 2 }}
        >
          {currentUser.username}
        </Typography>
      )}
      <form onSubmit={handleSubmit}>
        <Box>
          <TextareaAutosize
            minRows={3}
            style={{
              backgroundColor: "#e8eff5",
              borderRadius: "5px",
              padding: theme.spacing(1),
              width: "100%",
              border: "none",
            }}
            placeholder="What's happening?"
            maxLength={280}
            value={tweetText}
            onChange={(e) => setTweetText(e.target.value)}
          />
        </Box>
        <Button
          onClick={handleSubmit}
          type="submit"
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
            py: 0.75,
            px: 2,
            mt: 2,
            borderRadius: "25px",
            "&:hover": {
              backgroundColor: theme.palette.primary.dark,
            },
            display: "block", // Make button a block to fill the form width and sit on a new line
            width: "88px",
          }}
        >
          Tweet
        </Button>
      </form>
    </Box>
  );
};

export default MainTweet;
