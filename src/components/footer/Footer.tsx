"use client";
import React from "react";
import { Box, Grid, Typography, IconButton } from "@mui/material";
import { Facebook, Twitter, Instagram, YouTube } from "@mui/icons-material"; // Adjust path accordingly
import Link from "next/link";
import { megaMenuData } from "../navbar/NavLinks";
import logo from "../../../public/assets/logo/logo1.png";
import Image from "next/image";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <Box sx={{ bgcolor: "#111827", color: "white", pt: 6, pb: 3 }}>
      <Box className="container mx-auto p-4">
        <Grid container spacing={3}>
          {/* Brand & Social */}
          <Grid size={{ xs: 12, md: 2 }}>
            <Link href={"/"}>
              <Box>
                <Image
                  src={logo}
                  alt="YourShop Logo"
                  width={140}
                  height={40}
                  priority
                />
              </Box>
            </Link>
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {[Facebook, Twitter, Instagram, YouTube].map((Icon, idx) => (
              <IconButton
                key={idx}
                color="inherit"
                size="large"
                sx={{ p: 0.5 }}
              >
                <Icon fontSize="small" />
              </IconButton>
            ))}
          </Box>
          <Typography variant="caption" color="grey.500">
            &copy; {year} YourShop. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
