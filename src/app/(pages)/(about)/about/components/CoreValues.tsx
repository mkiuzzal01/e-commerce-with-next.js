"use client";
import React from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import { icons } from "lucide-react";

const coreValuesData = [
  {
    id: 1,
    title: "Customer First",
    description: "Your satisfaction drives everything we do.",
    icon: "Heart",
  },
  {
    id: 2,
    title: "Innovation",
    description: "Constantly improving our products and services.",
    icon: "Star",
  },
  {
    id: 3,
    title: "Integrity",
    description: "Honest and transparent in all dealings.",
    icon: "ShieldCheck",
  },
  {
    id: 4,
    title: "Sustainability",
    description: "Committed to ethical and eco-friendly practices.",
    icon: "Leaf",
  },
  {
    id: 5,
    title: "Community",
    description: "Supporting and giving back to our customers and partners.",
    icon: "Users",
  },
];

export default function CoreValues() {
  return (
    <Box
      sx={{
        my: 10,
        px: { xs: 2, md: 0 },
      }}
    >
      <Typography
        variant="h4"
        sx={{
          mb: 6,
          textAlign: "center",
          position: "relative",
          "&::after": {
            content: '""',
            display: "block",
            width: 80,
            height: 4,
            bgcolor: "primary.main",
            mx: "auto",
            mt: 2,
            borderRadius: 2,
          },
        }}
      >
        Our Core Values
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {coreValuesData.map((value) => {
          const LucideIcon =
            icons[value.icon as keyof typeof icons] || icons.Star;

          return (
            <Grid size={{ xs: 12, md: 6 }} key={value.id}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 3,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: 3,
                    borderColor: "primary.main",
                  },
                }}
              >
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    bgcolor: "#fe6731",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 3,
                  }}
                >
                  <LucideIcon size={28} color="#fff" />
                </Box>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  {value.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {value.description}
                </Typography>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
