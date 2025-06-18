"use client";
import React from "react";
import { Box, Grid, Typography, IconButton } from "@mui/material";
import { Facebook, Twitter, Instagram, YouTube } from "@mui/icons-material"; // Adjust path accordingly
import Link from "next/link";
import { megaMenuData } from "../navbar/NavLinks";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <Box sx={{ bgcolor: "#111827", color: "white", pt: 6, pb: 3 }}>
      <Box className="container mx-auto">
        <Grid container spacing={3}>
          {/* Brand & Social */}
          <Grid size={{ xs: 12, md: 2 }}>
            <Typography variant="h6" gutterBottom>
              YourShop
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Discover the best products from fashion, electronics, and more.
            </Typography>
            <Box>
              {[Facebook, Twitter, Instagram, YouTube].map((Icon, idx) => (
                <IconButton
                  key={idx}
                  color="inherit"
                  size="small"
                  sx={{ p: 0.5 }}
                >
                  <Icon fontSize="small" />
                </IconButton>
              ))}
            </Box>
          </Grid>

          {/* Quick Navigation */}
          {megaMenuData?.map((main, index) => (
            <Grid size={{ xs: 12, md: 2 }} key={index}>
              <Typography variant="subtitle1" gutterBottom>
                {main.MainCategoryName}
              </Typography>
              {main.Category.map((cat, idx) => (
                <Box key={idx} sx={{ mb: 1 }}>
                  <Link href={cat.link}>{cat.categoryName}</Link>
                </Box>
              ))}
            </Grid>
          ))}

          {/* Contact Info */}
          <Grid size={{ xs: 12, md: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2">Email: support@yourshop.com</Typography>
            <Typography variant="body2">Phone: +880-1234-567890</Typography>
            <Typography variant="body2">Address: Dhaka, Bangladesh</Typography>
          </Grid>
        </Grid>

        {/* Bottom line */}
        <Box
          sx={{
            textAlign: "center",
            mt: 5,
            borderTop: "1px solid #333",
            pt: 2,
          }}
        >
          <Typography variant="caption" color="grey.500">
            &copy; {year} YourShop. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
