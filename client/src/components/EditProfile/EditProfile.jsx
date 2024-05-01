import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { changeProfile, logout } from "../../redux/userSlice";

import {
  Box,
  Button,
  Modal,
  Typography,
  CircularProgress,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import { theme } from "../../theme";

const Input = styled("input")({
  display: "none",
});

const EditProfile = ({ setOpen }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [img, setImg] = useState(null);
  const [imgUploadProgress, setImgUploadProgress] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const uploadImg = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImgUploadProgress(Math.round(progress));
      },
      (error) => {
        console.error("Upload error", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          try {
            await axios.put(`/users/${currentUser._id}`, {
              profilePicture: downloadURL,
            });
            dispatch(changeProfile(downloadURL));
          } catch (error) {
            console.error("Error updating profile", error);
          }
        });
      }
    );
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/users/${currentUser._id}`);
      dispatch(logout());
      await navigate("/signin");
    } catch (error) {
      console.error("Error deleting account", error);
    }
  };

  useEffect(() => {
    if (img) uploadImg(img);
  }, [img]);

  return (
    <Modal
      open={true}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "100%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "#e8eff5",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          width: 600,
          height: 600,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <IconButton
          aria-label="close"
          onClick={() => setOpen(false)}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Edit Profile
        </Typography>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Choose a new profile picture
        </Typography>
        {imgUploadProgress > 0 ? (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
            }}
          >
            <CircularProgress
              variant="determinate"
              value={imgUploadProgress}
              size={16}
            />
            Uploading
            <Typography>{imgUploadProgress + "%"}</Typography>
          </Box>
        ) : (
          <>
            <Box
              sx={{ width: "80%", border: "1px solid black", display: "flex" }}
            >
              <label htmlFor="contained-button-file">
                <Input
                  accept="image/*"
                  id="contained-button-file"
                  multiple
                  type="file"
                  onChange={(e) => setImg(e.target.files[0])}
                />
                <Button
                  variant="contained"
                  component="span"
                  sx={{
                    borderRadius: "none",
                    margin: 2,
                    backgroundColor: "#e8eff5",
                    textTransform: "none",
                    color: theme.palette.slate.main200,
                    "&:hover": {
                      backgroundColor: "#e8eff5",
                    },
                  }}
                >
                  <Typography variant="body2" sx={{ textDecoration: "none" }}>
                    Choose File
                  </Typography>
                </Button>
                No file chosen
              </label>
            </Box>
          </>
        )}

        <Typography variant="body2" sx={{ mt: 2 }}>
          Delete Account
        </Typography>
        <Button
          variant="contained"
          color="error"
          onClick={handleDelete}
          sx={{ mt: 1, width: "100" }}
        >
          Delete Account
        </Button>
      </Box>
    </Modal>
  );
};

export default EditProfile;
