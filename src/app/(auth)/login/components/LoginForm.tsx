"use client";
import { Box, Button, Container, Typography, Paper, Grid } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { useLoginMutation } from "@/redux/features/auth/auth.Api";
import Loader from "@/utils/Loader";
import { useToast } from "@/utils/tost-alert/ToastProvider";
import ReusableForm from "@/components/shared/ReusableForm";
import { setUser, TUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { verifyToken } from "@/lib/verifyToken";
import TextInput from "@/components/shared/input-fields/TextInput";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { showToast } = useToast();
  const dispatch = useAppDispatch();
  const [loginUser, { isLoading }] = useLoginMutation();

  const redirectPath = searchParams.get("redirect") || "/";

  const handleSubmit = async (values: FieldValues) => {
    try {
      const { data } = await loginUser(values);
      const user = verifyToken(data?.data?.accessToken) as TUser;
      dispatch(setUser({ user: user, token: data?.data?.accessToken }));
      if (data?.success) {
        showToast({
          message: "User login successfully",
          type: "success",
        });
        router.push(redirectPath);
      }
    } catch {
      showToast({
        message: "Something went wrong",
        type: "error",
      });
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

          <ReusableForm onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12 }}>
                <TextInput
                  name="emailOrPhone"
                  label="Email or phone"
                  required
                />
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
            Do not have an account?{" "}
            <Button href="/register" size="small">
              Register
            </Button>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}
