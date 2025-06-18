"use client";
import React, { useState } from "react";
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

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const togglePassword = () => setShowPassword((prev) => !prev);
  const toggleConfirm = () => setShowConfirm((prev) => !prev);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Add registration logic
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
            Create Account 🎉
          </Typography>
          <Typography
            variant="body2"
            align="center"
            color="text.secondary"
            mb={3}
          >
            Sign up to get started with your journey
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              required
              margin="normal"
            />
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

            <TextField
              label="Confirm Password"
              variant="outlined"
              fullWidth
              required
              type={showConfirm ? "text" : "password"}
              margin="normal"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={toggleConfirm} edge="end">
                      {showConfirm ? <VisibilityOff /> : <Visibility />}
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
              Register
            </Button>
          </Box>

          <Typography
            variant="body2"
            align="center"
            mt={2}
            color="text.secondary"
          >
            Already have an account?{" "}
            <Button href="/login" size="small">
              Login
            </Button>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}
