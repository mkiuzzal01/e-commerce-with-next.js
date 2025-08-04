"use client";
import { Box, Button, Container, Typography, Paper, Grid } from "@mui/material";
import { TextInput } from "@/components/Shared/input-fields/TextInput";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { useLoginMutation } from "@/redux/features/auth/auth.Api";
import Loader from "@/utils/Loader";
import { useToast } from "@/utils/tost-alert/ToastProvider";
import ReusableForm from "@/components/Shared/ReusableForm";
import { verifyToken } from "@/lib/verifyToken";
import { setUser, TUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";

export default function Login() {
  const { showToast } = useToast();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loginUser, { isLoading }] = useLoginMutation();
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
        router.push("/");
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
