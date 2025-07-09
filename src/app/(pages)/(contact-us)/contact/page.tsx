"use client";
import React from "react";
import { Box, Button, Grid, TextField, Typography, Paper } from "@mui/material";
import Map from "@/components/sections/map/Map";

export default function ContactUsPage() {
  return (
    <Box className="container m-auto p-4">
      <Typography
        variant="h4"
        fontWeight="bold"
        align="center"
        gutterBottom
        color="primary"
      >
        Contact Us
      </Typography>
      <Typography align="center" color="text.secondary" mb={4}>
        We'd love to hear from you! Please fill out the form below and we'll get
        back to you shortly.
      </Typography>
      <Box className="grid grid-cols-2 gap-4
      
      
      \">
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
              <Button
                variant="contained"
                size="large"
                color="primary"
                fullWidth
              >
                Send Message
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
}
