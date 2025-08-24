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
import AppLink from "@/utils/AppLink";

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
        <Grid container spacing={4}>
          {/* Logo and Social Media Section */}
          <Grid size={{ xs: 12, md: 3 }}>
            <MuiLink href="/" underline="none" color="inherit">
              <Box sx={{ mb: 3 }}>
                <Image
                  src={logo}
                  alt="YourShop Logo"
                  width={140}
                  height={40}
                  priority
                />
              </Box>
            </MuiLink>
            <Typography variant="body2" sx={{ mb: 2, color: "grey.400" }}>
              Your trusted partner for quality products and exceptional service.
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              {icons.map(({ title, icon: Icon, link }, idx) => (
                <IconButton
                  key={idx}
                  color="inherit"
                  size="medium"
                  sx={{
                    p: 1,
                    "&:hover": {
                      bgcolor: "var(--color-brand-primary)",
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.2s ease-in-out",
                  }}
                  title={title}
                  aria-label={title}
                  component="a"
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon fontSize="small" />
                </IconButton>
              ))}
            </Box>
          </Grid>

          {/* Dynamic Navigation Categories Section */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              variant="h6"
              gutterBottom
              fontWeight="bold"
              sx={{ mb: 3, textTransform: "uppercase", color: "white" }}
            >
              Categories
            </Typography>
            {!isLoading && navLinks.length > 0 ? (
              <Grid container spacing={3}>
                {navLinks.map((main, index) => (
                  <Grid
                    size={{
                      xs: 12,
                      sm: navLinks.length > 2 ? 6 : 12 / navLinks.length,
                      md: navLinks.length > 3 ? 4 : 12 / navLinks.length,
                    }}
                    key={index}
                  >
                    <AppLink href={`/${main?.slug}`}>
                      <Typography
                        variant="subtitle2"
                        gutterBottom
                        fontWeight="bold"
                        sx={{
                          mb: 2,
                          color: "var(--color-brand-primary)",
                          textTransform: "uppercase",
                          fontSize: "0.875rem",
                          cursor: "pointer",
                          "&:hover": {
                            color: "white",
                          },
                          transition: "all 0.2s ease-in-out",
                        }}
                      >
                        {main?.name}
                      </Typography>
                    </AppLink>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 0.5,
                        maxHeight: "200px",
                        overflowY: "auto",
                        "&::-webkit-scrollbar": {
                          width: "4px",
                        },
                        "&::-webkit-scrollbar-track": {
                          background: "rgba(255, 255, 255, 0.1)",
                        },
                        "&::-webkit-scrollbar-thumb": {
                          background: "var(--color-brand-primary)",
                          borderRadius: "2px",
                        },
                        "&::-webkit-scrollbar-thumb:hover": {
                          background: "white",
                        },
                      }}
                    >
                      {main?.category?.map((cat, idx) => (
                        <AppLink
                          key={idx}
                          href={`/${main?.slug}/category/${cat.slug}`}
                        >
                          <Box
                            sx={{
                              color: "grey.400",
                              fontSize: "0.875rem",
                              display: "block",
                              cursor: "pointer",
                              "&:hover": {
                                color: "var(--color-brand-primary)",
                                paddingLeft: "4px",
                              },
                              transition: "all 0.2s ease-in-out",
                            }}
                          >
                            {cat.name.charAt(0).toUpperCase() +
                              cat.name.slice(1)}
                          </Box>
                        </AppLink>
                      ))}
                    </Box>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography variant="body2" color="grey.400">
                {isLoading
                  ? "Loading categories..."
                  : "No categories available"}
              </Typography>
            )}
          </Grid>

          {/* Contact Information Section */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography
              variant="h6"
              gutterBottom
              fontWeight="bold"
              sx={{ mb: 3, textTransform: "uppercase", color: "white" }}
            >
              Contact Us
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              <Box>
                <Typography variant="body2" fontWeight="bold" sx={{ mb: 0.5 }}>
                  Email:
                </Typography>
                <MuiLink
                  href="mailto:exportcornerkhulna@gmail.com"
                  color="grey.400"
                  underline="hover"
                  sx={{
                    fontSize: "0.875rem",
                    "&:hover": { color: "var(--color-brand-primary)" },
                  }}
                >
                  exportcornerkhulna@gmail.com
                </MuiLink>
              </Box>

              <Box>
                <Typography variant="body2" fontWeight="bold" sx={{ mb: 0.5 }}>
                  Phone:
                </Typography>
                <MuiLink
                  href="tel:+8801234567890"
                  color="grey.400"
                  underline="hover"
                  sx={{
                    fontSize: "0.875rem",
                    "&:hover": { color: "var(--color-brand-primary)" },
                  }}
                >
                  +880-1234-567890
                </MuiLink>
              </Box>

              <Box>
                <Typography variant="body2" fontWeight="bold" sx={{ mb: 0.5 }}>
                  Address:
                </Typography>
                <Typography
                  variant="body2"
                  color="grey.400"
                  sx={{ fontSize: "0.875rem" }}
                >
                  Khulna, Bangladesh
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Copyright Section */}
        <Box
          sx={{
            textAlign: "center",
            mt: 6,
            pt: 3,
            borderTop: "1px solid #374151",
          }}
        >
          <Typography variant="body2" color="grey.500">
            &copy; {year} Export Corner. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
