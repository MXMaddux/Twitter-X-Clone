import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Box, Button, Avatar, Grid, Typography } from "@mui/material";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import RightSidebar from "../../components/RightSidebar/RightSidebar";
import EditProfile from "../../components/EditProfile/EditProfile";
import { useNavigate } from "react-router-dom";
import Tweet from "../../components/Tweet/Tweet";
import { following } from "../../redux/userSlice";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [userTweets, setUserTweets] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const { id } = useParams();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userTweets = await axios.get(`/tweets/user/all/${id}`);
        const userProfile = await axios.get(`/users/find/${id}`);
        setUserTweets(userTweets.data);
        setUserProfile(userProfile.data);
      } catch (err) {
        console.error("error", err);
      }
    };
    fetchData();
  }, [id, currentUser]);

  // useEffect(() => {
  //   if (!currentUser) {
  //     navigate("/signin");
  //   }
  // }, [currentUser]);

  const handleFollow = async () => {
    try {
      if (!currentUser.following.includes(id)) {
        await axios.put(`/users/follow/${id}`, { id: currentUser._id });
      } else {
        await axios.put(`/users/unfollow/${id}`, { id: currentUser._id });
      }
      dispatch(following(id));
    } catch (err) {
      console.error("error", err);
    }
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Box sx={{ px: 2 }}>
            <LeftSidebar />
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ borderLeft: 1, borderRight: 1, borderColor: "divider", px: 2 }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Avatar
              src={userProfile?.profilePicture}
              sx={{ width: 48, height: 48 }}
            />
            {currentUser._id === id ? (
              <Button
                variant="contained"
                color="primary"
                onClick={() => setOpen(true)}
              >
                Edit Profile
              </Button>
            ) : currentUser.following.includes(id) ? (
              <Button
                variant="contained"
                color="primary"
                onClick={handleFollow}
              >
                Following
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={handleFollow}
              >
                Follow
              </Button>
            )}
          </Box>
          <Box sx={{ mt: 3 }}>
            {userTweets &&
              userTweets.map((tweet) => (
                <Box key={tweet._id} sx={{ p: 1 }}>
                  <Tweet tweet={tweet} setData={setUserTweets} />
                </Box>
              ))}
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Box sx={{ px: 2 }}>
            <RightSidebar />
          </Box>
        </Grid>
      </Grid>
      {open && <EditProfile setOpen={setOpen} />}
    </>
  );
};

export default Profile;
