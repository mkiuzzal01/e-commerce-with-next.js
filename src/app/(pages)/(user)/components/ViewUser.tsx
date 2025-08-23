"use client";

import React from "react";
import {
  Box,
  Container,
  Typography,
  Avatar,
  Grid,
  Stack,
  Chip,
  Divider,
  Button,
} from "@mui/material";
import { useUser } from "@/lib/hooks/useUser";
import Loader from "@/utils/Loader";
import AppLink from "@/utils/AppLink";

// type mappings
const genderLabels: Record<"male" | "female" | "other", string> = {
  male: "Male",
  female: "Female",
  other: "Other",
};

const roleColors: Record<
  "super-admin" | "admin" | "user",
  "default" | "primary" | "success" | "warning"
> = {
  "super-admin": "success",
  admin: "primary",
  user: "default",
};

const statusColors: Record<
  "in-progress" | "blocked",
  "default" | "error" | "warning"
> = {
  "in-progress": "warning",
  blocked: "error",
};

export default function ViewUser() {
  const { userInfo, userComing } = useUser();
  console.log(userInfo);
  const fullName = `${userInfo?.name?.firstName ?? ""} ${
    userInfo?.name?.middleName ?? ""
  } ${userInfo?.name?.lastName ?? ""}`.replace(/\s+/g, " ");

  const email = userInfo?.email;
  const phone = userInfo?.phone;
  const gender = userInfo?.gender;
  const role = userInfo?.role;
  const status = userInfo?.status;
  const address = userInfo?.address;

  if (userComing) return <Loader />;

  return (
    <Box sx={{ py: 6, bgcolor: "background.default" }}>
      <Container maxWidth="sm">
        <Stack spacing={4} alignItems="center">
          <Avatar
            src={userInfo?.profileImage}
            alt={fullName}
            sx={{ width: 120, height: 120, fontSize: 40 }}
          >
            {userInfo?.name?.firstName?.[0]?.toUpperCase()}
          </Avatar>

          <Typography variant="h4" fontWeight="bold">
            {fullName}
          </Typography>

          <Stack direction="row" spacing={1}>
            {role && <Chip label={`Role: ${role}`} color={roleColors[role]} />}
            {status && (
              <Chip label={`Status: ${status}`} color={statusColors[status]} />
            )}
          </Stack>

          <Divider flexItem />

          <Grid container spacing={10}>
            {email && (
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Email
                </Typography>
                <Typography variant="body1">{email}</Typography>
              </Grid>
            )}

            {phone && (
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Phone
                </Typography>
                <Typography variant="body1">{phone}</Typography>
              </Grid>
            )}

            {gender && (
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Gender
                </Typography>
                <Typography variant="body1">{genderLabels[gender]}</Typography>
              </Grid>
            )}

            {address?.presentAddress && (
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Present Address
                </Typography>
                <Typography variant="body1">
                  {address.presentAddress}
                </Typography>
              </Grid>
            )}

            {address?.permanentAddress && (
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Permanent Address
                </Typography>
                <Typography variant="body1">
                  {address.permanentAddress}
                </Typography>
              </Grid>
            )}
          </Grid>
        </Stack>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mt: 6,
            alignItems: "center",
          }}
        >
          <AppLink href={`/update-profile`}>
            <Button
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
              Update User
            </Button>
          </AppLink>
        </Box>
      </Container>
    </Box>
  );
}
