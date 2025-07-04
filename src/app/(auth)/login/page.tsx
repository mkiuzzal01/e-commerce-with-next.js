/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { Box, Button, Container, Typography, Paper, Grid } from "@mui/material";
import ReusableForm from "@/components/Shared/ReusableTable"; // your form wrapper
import { TextInput } from "@/components/Shared/input-fields/TextInput";
import { useRouter } from "next/navigation";

type LoginFormValues = {
  email: string;
  password: string;
};

export default function Login() {
  const router = useRouter();

  const handleSubmit = (data: LoginFormValues) => {
    console.log("Login data submitted:", data);
    if (data.email === "demo@gmail.com" && data.password === "12345") {
      router.push("/");
    }
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
            Welcome Back
          </Typography>
          <Typography
            variant="body2"
            align="center"
            color="text.secondary"
            mb={3}
          >
            Please login to your account
          </Typography>

          <ReusableForm
            onSubmit={handleSubmit}
            defaultValues={{
              email: "demo@gmail.com",
              password: "12345",
            }}
          >
            <Grid container spacing={2}>
              <Grid size={{ xs: 12 }}>
                <TextInput name="email" label="Email" required />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextInput
                  type="password"
                  name="password"
                  label="Password"
                  required
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2, py: 1.5, fontWeight: "bold" }}
                >
                  Login
                </Button>
              </Grid>
            </Grid>
          </ReusableForm>

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
