"use client";
import React from "react";
import { Box, Button, Container, Typography, Paper, Grid } from "@mui/material";
import { TextInput } from "@/components/shared/input-fields/TextInput";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { useToast } from "@/utils/tost-alert/ToastProvider";
import { useRegisterMutation } from "@/redux/features/auth/auth.Api";
import Loader from "@/utils/Loader";
import { zodResolver } from "@hookform/resolvers/zod";
import ReusableForm from "@/components/shared/ReusableForm";
import { RegisterFormValidation } from "./RegisterFormValidation";

export default function RegisterForm() {
  const router = useRouter();
  const { showToast } = useToast();
  const [register, { isLoading }] = useRegisterMutation();

  const handleSubmit = async (values: FieldValues) => {
    if (values?.password !== values?.confirmPassword) {
      return showToast({
        message: "Password not match!",
        type: "error",
      });
    }
    try {
      const { data } = await register(values);

      if (data?.success) {
        showToast({ message: "User registered successfully", type: "success" });
        router.push("/login");
      }
    } catch (error) {
      console.error(error);
      showToast({ message: "Failed to register user", type: "error" });
    }
  };

  if (isLoading) return <Loader />;
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
        background: "linear-gradient(135deg, #fefce8 0%, #ffe4e6 100%)",
      }}
    >
      <Container maxWidth="md">
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

          <ReusableForm
            onSubmit={handleSubmit}
            resolver={zodResolver(RegisterFormValidation)}
          >
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextInput name="name.firstName" label="First Name" required />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextInput name="name.middleName" label="Middle Name" />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextInput name="name.lastName" label="Last Name" required />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextInput name="email" label="Email" required />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextInput name="phone" type="tel" label="Phone" required />
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
                  fullWidth
                  sx={{
                    textTransform: "none",
                    fontWeight: 600,
                    bgcolor: "var(--color-brand-primary)",
                    color: "white",
                    boxShadow: "0 2px 12px rgb(255 107 107 / 0.4)",
                    "&:hover": {
                      bgcolor: "var(--color-brand-secondary)",
                      boxShadow: "0 4px 20px rgb(255 107 107 / 0.6)",
                    },
                  }}
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
