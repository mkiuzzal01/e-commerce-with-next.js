"use client";
import React from "react";
import { Box, Button, Container, Grid } from "@mui/material";
import { FieldValues } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
import { SelectInput } from "@/components/Shared/input-fields/SelectInput";
import ReusableForm from "@/components/Shared/ReusableForm";
import { useUser } from "@/lib/hooks/useUser";
import Loader from "@/utils/Loader";
// import { userValidationSchema } from "./updateUserValidation";
import { useUpdateUserMutation } from "@/redux/features/auth/auth.Api";
import { useToast } from "@/utils/tost-alert/ToastProvider";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { updateUser } from "@/redux/features/auth/authSlice";
import TextInput from "@/components/Shared/input-fields/TextInput";

export default function UpdateUser() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { showToast } = useToast();
  const { userInfo, userComing, refetch } = useUser();
  const [update, { isLoading }] = useUpdateUserMutation();

  const redirectPath = searchParams.get("redirect") || "/view-profile";

  const handleSubmit = async (values: FieldValues) => {
    try {
      const res = await update({
        id: userInfo?._id,
        data: values,
      }).unwrap();
      if (res.success) {
        showToast({ message: "Profile updated successfully", type: "success" });
        refetch();
        dispatch(updateUser({ slug: res?.data.slug }));
        router.push(redirectPath);
      }
    } catch {
      showToast({
        message: "Failed to update profile",
        type: "error",
      });
    }
  };

  if (userComing || isLoading) return <Loader />;

  return (
    <Box>
      <Container sx={{ my: 5 }}>
        <ReusableForm
          onSubmit={handleSubmit}
          // resolver={zodResolver(userValidationSchema)}
          defaultValues={{
            name: {
              firstName: userInfo?.name?.firstName || "",
              middleName: userInfo?.name?.middleName || "",
              lastName: userInfo?.name?.lastName || "",
            },
            email: userInfo?.email || "",
            phone: userInfo?.phone || "",
            gender: userInfo?.gender || "",
            address: {
              presentAddress: userInfo?.address?.presentAddress || "",
              permanentAddress: userInfo?.address?.permanentAddress || "",
            },
          }}
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

            <Grid size={{ xs: 12, md: 5 }}>
              <TextInput name="email" label="Email" type="email" required />
            </Grid>

            <Grid size={{ xs: 12, md: 5 }}>
              <TextInput name="phone" label="Phone" required />
            </Grid>

            <Grid size={{ xs: 12, md: 2 }}>
              <SelectInput
                name="gender"
                label="Gender"
                options={["male", "female", "other"]}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextInput
                name="address.presentAddress"
                label="Present Address"
                required
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextInput
                name="address.permanentAddress"
                label="Permanent Address"
                required
              />
            </Grid>
          </Grid>

          <Box mt={3}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update"}
            </Button>
          </Box>
        </ReusableForm>
      </Container>
    </Box>
  );
}
