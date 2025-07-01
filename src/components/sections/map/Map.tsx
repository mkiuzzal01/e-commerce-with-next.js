"use client";
import React from "react";
import { Box } from "@mui/material";

export default function Map() {
  return (
    <Box
      component="section"
      aria-label="Google Map Location"
      sx={{
        width: "100%",
        height: { xs: 300, sm: 400, md: 500 },
        overflow: "hidden",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Box
        component="iframe"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3677.058402515876!2d89.53747227490581!3d22.837328679304!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ff9b0024c853f5%3A0x54bade7d84cd33e2!2sBL%20College!5e0!3m2!1sen!2sbd!4v1751368186093!5m2!1sen!2sbd"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        sx={{
          border: 0,
          width: "100%",
          height: "100%",
        }}
      />
    </Box>
  );
}
