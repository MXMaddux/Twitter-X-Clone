import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginStart, loginSuccess, loginFailed } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Typography, Container } from "@mui/material";
import { theme } from "../../theme";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post("/auth/signin", { username, password });
      dispatch(loginSuccess(res.data));
      console.log(res.data);
      navigate("/");
    } catch (err) {
      dispatch(loginFailed());
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post("/auth/signup", {
        username,
        email,
        password,
      });
      dispatch(loginSuccess(res.data));
      navigate("/");
    } catch (err) {
      dispatch(loginFailed());
    }
  };

  const commonBorderRadius = 50; // Increased border radius to ensure full rounding

  return (
    <Container
      component="form"
      sx={{
        bgcolor: theme.palette.slate.main900,
        display: "flex",
        flexDirection: "column",
        p: 3,
        borderRadius: "8px",
        width: { xs: "100%", md: "50%" },
        gap: 2,
        mx: "auto",
        mt: 4,
      }}
    >
      <Typography
        variant="h4"
        component="h2"
        sx={{ textAlign: "center", fontWeight: "bold" }}
      >
        Sign in to TwiX
      </Typography>

      {/* Adjust TextField to have full rounded edges */}
      <TextField
        label="Username"
        variant="outlined"
        fullWidth
        InputProps={{
          sx: { borderRadius: commonBorderRadius },
        }}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        InputProps={{
          sx: { borderRadius: commonBorderRadius },
        }}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button
        variant="contained"
        sx={{ borderRadius: commonBorderRadius }}
        onClick={handleLogin}
      >
        Sign in
      </Button>

      <Typography variant="h6" sx={{ textAlign: "center" }}>
        Don't have an account?
      </Typography>

      <TextField
        label="Username"
        variant="outlined"
        fullWidth
        InputProps={{
          sx: { borderRadius: commonBorderRadius },
        }}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="Email"
        type="email"
        variant="outlined"
        fullWidth
        required
        InputProps={{
          sx: { borderRadius: commonBorderRadius },
        }}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        InputProps={{
          sx: { borderRadius: commonBorderRadius },
        }}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button
        type="submit"
        variant="contained"
        sx={{ borderRadius: commonBorderRadius }}
        onClick={handleSignup}
      >
        Sign up
      </Button>
    </Container>
  );
};

export default Signin;
