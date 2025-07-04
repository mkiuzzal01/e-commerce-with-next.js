/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { Box, Button, Container, Typography, Paper, Grid } from "@mui/material";
import ReusableForm from "@/components/Shared/ReusableTable"; // or rename to ReusableForm
import { TextInput } from "@/components/Shared/input-fields/TextInput";
import { useRouter } from "next/navigation";
import { FieldValue } from "react-hook-form";

export default function Register() {
  const router = useRouter();

  const handleSubmit = (data: FieldValue<any>) => {
    console.log("Register form submitted:", data);
    // Example: You can send `data` to your API here
    router.push("/login");
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
            Create Account
          </Typography>
          <Typography
            variant="body2"
            align="center"
            color="text.secondary"
            mb={3}
          >
            Sign up to get started with your journey
          </Typography>

          <ReusableForm onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12 }}>
                <TextInput name="name" label="Name" required />
              </Grid>
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
                <TextInput
                  type="password"
                  name="confirmPassword"
                  label="Confirm Password"
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
                  Register
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
