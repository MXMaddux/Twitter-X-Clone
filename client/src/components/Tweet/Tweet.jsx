import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import formatDistance from "date-fns/formatDistance";
import { Link, useLocation, useParams } from "react-router-dom";
import {
  Box,
  Typography,
  IconButton,
  Stack,
  Link as LinkBase,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { theme } from "../../theme";

const Tweet = ({ tweet, setData }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [userData, setUserData] = useState();
  const dateStr = formatDistance(new Date(tweet.createdAt), new Date());
  const location = useLocation().pathname;
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const findUser = await axios.get(`/users/find/${tweet.userId}`);
        setUserData(findUser.data);
      } catch (err) {
        console.error("error", err);
      }
    };

    fetchData();
  }, [tweet.userId, tweet.likes]);

  const handleLike = async (e) => {
    e.preventDefault();

    try {
      const like = await axios.put(`/tweets/${tweet._id}/like`, {
        id: currentUser._id,
      });

      if (location.includes("profile")) {
        const newData = await axios.get(`/tweets/user/all/${id}`);
        setData(newData.data);
      } else if (location.includes("explore")) {
        const newData = await axios.get(`/tweets/explore`);
        setData(newData.data);
      } else {
        const newData = await axios.get(`/tweets/timeline/${currentUser._id}`);
        setData(newData.data);
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  return (
    <Box>
      {userData && (
        <>
          <Box>
            <Stack direction="row" spacing={1} alignItems="center">
              <LinkBase
                component={Link}
                to={`/profile/${userData._id}`}
                sx={{ textDecoration: "none" }}
              >
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    fontWeight: "bold",
                    color: theme.palette.slate.main200,
                    fontSize: "16px",
                  }}
                >
                  {userData.username}
                </Typography>
              </LinkBase>
              <Typography variant="body2" sx={{ fontWeight: "normal" }}>
                @{userData.username} - {dateStr}
              </Typography>
            </Stack>
            <Typography variant="body1">{tweet.description}</Typography>

            <IconButton onClick={handleLike} size="large">
              {tweet.likes.includes(currentUser._id) ? (
                <FavoriteIcon
                  color="error"
                  sx={{ mr: 2, my: 2, "&:hover": { cursor: "pointer" } }}
                />
              ) : (
                <FavoriteBorderIcon
                  sx={{ mr: 2, my: 2, "&:hover": { cursor: "pointer" } }}
                />
              )}
            </IconButton>
            <Typography component="span">{tweet.likes.length}</Typography>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Tweet;
