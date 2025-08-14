"use client";
import { Box } from "@mui/material";

export default function Map() {
  return (
    <Box
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
        src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3676.213886688001!2d89.527174!3d22.868555999999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjLCsDUyJzA2LjgiTiA4OcKwMzEnMzcuOCJF!5e0!3m2!1sen!2sbd!4v1755018488847!5m2!1sen!2sbd"
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
