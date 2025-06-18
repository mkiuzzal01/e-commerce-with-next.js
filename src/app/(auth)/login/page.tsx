"use client";
import React from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Add your login logic here
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
      }}
    >
      <Container maxWidth="xs">
        <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
          <Typography
            variant="h5"
            align="center"
            fontWeight="bold"
            gutterBottom
          >
            Welcome Back 👋
          </Typography>
          <Typography
            variant="body2"
            align="center"
            color="text.secondary"
            mb={3}
          >
            Please login to your account
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              required
              type="email"
              margin="normal"
            />

            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              required
              type={showPassword ? "text" : "password"}
              margin="normal"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2, py: 1.5, fontWeight: "bold" }}
            >
              Login
            </Button>
          </Box>

          <Typography
            variant="body2"
            align="center"
            mt={2}
            color="text.secondary"
          >
            Don't have an account?{" "}
            <Button href="/register" size="small">
              Register
            </Button>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}
