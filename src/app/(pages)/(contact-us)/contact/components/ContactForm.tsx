import TextInput from "@/components/shared/input-fields/TextInput";
import ReusableForm from "@/components/shared/ReusableForm";
import { Box, Button, Grid } from "@mui/material";
import React from "react";
import { FieldValues } from "react-hook-form";

export default function ContactForm() {
  const handleSubmit = (data: FieldValues) => {
    console.log(data);
  };
  return (
    <Box>
      <ReusableForm onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
          >
            <TextInput name={"name"} label={"Name"} required />
          </Grid>
          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
          >
            <TextInput name={"email"} label={"Email"} required />
          </Grid>
          <Grid
            size={{
              xs: 12,
            }}
          >
            <TextInput name={"subject"} label={"Subject"} required />
          </Grid>
          <Grid
            size={{
              xs: 12,
            }}
          >
            <TextInput
              name={"message"}
              label={"Message"}
              row={6}
              multiline
              required
            />
          </Grid>
          <Grid
            size={{
              xs: 12,
            }}
          >
            <Button fullWidth type="submit" variant="contained">
              Submit
            </Button>
          </Grid>
        </Grid>
      </ReusableForm>
    </Box>
  );
}
