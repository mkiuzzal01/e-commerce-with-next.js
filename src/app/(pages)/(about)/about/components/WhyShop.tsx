"use client";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { icons } from "lucide-react";

const whyShop = [
  {
    id: "whyShop",
    title: "Why Shop With Us?",
    subtitle:
      "We make shopping easy, safe, and rewarding with these exclusive benefits.",
    features: [
      {
        icon: "Truck",
        title: "Free Shipping",
        description:
          "Enjoy free shipping on all orders over $50, delivered fast and reliable.",
      },
      {
        icon: "ShieldCheck",
        title: "Secure Payment",
        description:
          "Your payment information is protected with industry-leading security.",
      },
      {
        icon: "Star",
        title: "Quality Guarantee",
        description:
          "All products go through strict quality checks before shipping.",
      },
      {
        icon: "Heart",
        title: "Customer Support",
        description:
          "Friendly 24/7 support to help you with any queries or issues.",
      },
    ],
  },
];

export default function WhyShop() {
  const section = whyShop[0];

  return (
    <Box textAlign="center" mb={10}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3, letterSpacing: 1 }}>
        {section.title}
      </Typography>
      <Typography variant="body1" mb={6}>
        {section.subtitle}
      </Typography>

      <Grid container spacing={6} justifyContent="center">
        {section.features.map(({ title, description, icon }) => {
          const LucideIcon = icons[icon as keyof typeof icons] || icons.Star;
          return (
            <Grid
              size={{
                xs: 12,
                md: 6,
              }}
              key={title}
            >
              <Paper
                elevation={3}
                sx={{
                  p: 5,
                  textAlign: "center",
                  borderRadius: 4,
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "scale(1)",
                    boxShadow: 6,
                  },
                  height: "100%",
                }}
              >
                <Box>
                  <Box className="flex justify-center mb-4">
                    <LucideIcon size={40} className="text-[#fe6731] mb-4" />
                  </Box>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    {title}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {description}
                </Typography>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
