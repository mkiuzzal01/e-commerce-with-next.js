import { Avatar, Box, Chip, Grid, IconButton, Paper, Typography } from "@mui/material";
import { Linkedin, TwitterIcon } from "lucide-react";
import React from "react";

const STAKEHOLDERS = [
  {
    name: "Alex Johnson",
    role: "Founder & CEO",
    bio: "Visionary leader with 15+ years in e-commerce and retail innovation.",
    avatar: "/assets/team/alex.jpg",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
  },
  {
    name: "Sarah Williams",
    role: "Chief Product Officer",
    bio: "Product expert focused on delivering exceptional customer experiences.",
    avatar: "/assets/team/sarah.jpg",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
  },
  {
    name: "Michael Chen",
    role: "CTO",
    bio: "Technology strategist building scalable e-commerce platforms.",
    avatar: "/assets/team/michael.jpg",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
  },
  {
    name: "Emma Rodriguez",
    role: "Head of Customer Success",
    bio: "Passionate about creating memorable shopping experiences.",
    avatar: "/assets/team/emma.jpg",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
  },
];

export default function Stakeholders() {
  return (
    <Box sx={{ my: 10 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 6, textAlign: "center" }}>
        Meet Our Team
      </Typography>
      <Grid container spacing={6} justifyContent="center">
        {STAKEHOLDERS.map(({ name, role, bio, avatar, social }) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={name}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                borderRadius: 3,
                textAlign: "center",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                },
              }}
            >
              <Avatar
                src={avatar}
                alt={name}
                sx={{
                  width: 120,
                  height: 120,
                  mb: 3,
                  border: "3px solid var(--color-brand-primary)",
                }}
              />
              <Typography variant="h6" fontWeight={600}>
                {name}
              </Typography>
              <Chip
                label={role}
                size="small"
                sx={{
                  bgcolor: "var(--color-brand-primary)",
                  color: "white",
                  my: 1,
                }}
              />
              <Typography variant="body2" color="text.secondary" sx={{ my: 2 }}>
                {bio}
              </Typography>
              <Box sx={{ display: "flex", gap: 2, mt: "auto" }}>
                <a
                  href={social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconButton aria-label="LinkedIn">
                    <Linkedin size={20} />
                  </IconButton>
                </a>
                <a
                  href={social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconButton aria-label="Twitter">
                    <TwitterIcon size={20} />
                  </IconButton>
                </a>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
