"use client";
import React from "react";
import { Box, Button, Grid, TextField, Typography, Paper } from "@mui/material";
import Map from "@/components/sections/map/Map";
import SectionHeader from "@/components/Shared/SectionHeader";
import { Contact } from "lucide-react";
import SectionButton from "@/utils/buttons/sectionButton";

export default function ContactUsPage() {
  return (
    <Box className="container m-auto p-4">
      <Box className="py-4">
        <SectionHeader
          title={"  Contact Us"}
          icon={<Contact />}
          description={`We'd love to hear from you! Please fill out the form below and we'll get
        back to you shortly.`}
        />
      </Box>
      <Box className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Paper>
          <Map />
        </Paper>

        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Grid container spacing={3}>
            <Grid
              size={{
                xs: 12,
                md: 6,
              }}
            >
              <TextField
                fullWidth
                label="Full Name"
                variant="outlined"
                required
              />
            </Grid>
            <Grid
              size={{
                xs: 12,
                md: 6,
              }}
            >
              <TextField
                fullWidth
                label="Email Address"
                variant="outlined"
                type="email"
                required
              />
            </Grid>
            <Grid
              size={{
                xs: 12,
              }}
            >
              <TextField
                fullWidth
                label="Subject"
                variant="outlined"
                required
              />
            </Grid>
            <Grid
              size={{
                xs: 12,
              }}
            >
              <TextField
                fullWidth
                label="Message"
                variant="outlined"
                multiline
                rows={5}
                required
              />
            </Grid>
            <Grid
              size={{
                xs: 12,
              }}
            >
              <SectionButton title="Submit" className="w-full" />
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
}
