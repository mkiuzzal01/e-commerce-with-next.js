"use client";
import React from "react";
import {
  Box,
  Grid,
  Typography,
  IconButton,
  Link as MuiLink,
} from "@mui/material";
import { Facebook, Twitter, Instagram, YouTube } from "@mui/icons-material";
import Image from "next/image";
import logo from "../../../public/assets/logo/logo.png";
import { useAllMainCategoryQuery } from "@/redux/features/category/category.Api";
import { TNavLink } from "../navbar/TNavbar";

const icons = [
  {
    title: "Facebook",
    icon: Facebook,
    link: "https://www.facebook.com/profile.php?id=61552125565150",
  },
  {
    title: "Twitter",
    icon: Twitter,
    link: "https://twitter.com/",
  },
  {
    title: "Instagram",
    icon: Instagram,
    link: "https://www.instagram.com/",
  },
  {
    title: "YouTube",
    icon: YouTube,
    link: "https://www.youtube.com/",
  },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const { data, isLoading } = useAllMainCategoryQuery({});
  const navLinks: TNavLink[] = data?.data?.result || [];

  return (
    <Box sx={{ bgcolor: "#111827", color: "white", pt: 6, pb: 3 }}>
      <Box className="container mx-auto px-4">
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 3 }}>
            <MuiLink href="/" underline="none" color="inherit">
              <Box sx={{ mb: 2 }}>
                <Image
                  src={logo}
                  alt="YourShop Logo"
                  width={140}
                  height={40}
                  priority
                />
              </Box>
            </MuiLink>
            <Box>
              {icons.map(({ title, icon: Icon, link }, idx) => (
                <IconButton
                  key={idx}
                  color="inherit"
                  size="large"
                  sx={{ p: 1 }}
                  title={title}
                  aria-label={title}
                  component="a"
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon fontSize="medium" />
                </IconButton>
              ))}
            </Box>
          </Grid>
          {!isLoading &&
            navLinks.map((main, index) => (
              <Grid size={{ xs: 6, md: 2 }} key={index}>
                <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                  {main.name.toUpperCase()}
                </Typography>
                {main.category?.map((cat, idx) => (
                  <Box key={idx} sx={{ mb: 1 }}>
                    <MuiLink
                      href={`/${main.slug}/category/${cat.slug}`}
                      underline="hover"
                      color="inherit"
                    >
                      {cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
                    </MuiLink>
                  </Box>
                ))}
              </Grid>
            ))}
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography
              variant="subtitle1"
              gutterBottom
              fontWeight="bold"
              sx={{
                textTransform: "uppercase",
              }}
            >
              Contact Us
            </Typography>

            <Typography variant="body2" sx={{ mb: 0.5 }}>
              Email: exportcornerkhulna@gmail.com
            </Typography>
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              Phone: +880-1234-567890
            </Typography>
            <Typography variant="body2">Address: Khulna, Bangladesh</Typography>
          </Grid>
        </Grid>
        <Box
          sx={{
            textAlign: "center",
            mt: 5,
            borderTop: "1px solid #333",
            pt: 2,
          }}
        >
          <Typography variant="caption" color="grey.500">
            &copy; {year} Export corner. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
