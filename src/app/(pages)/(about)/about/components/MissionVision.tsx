import { Box, Grid, Paper, Typography } from "@mui/material";
import React from "react";
const missionVision = [
  {
    id: "mission",
    title: "Our Mission",
    content:
      "To provide a seamless shopping experience with high-quality, trendy products delivered right to your doorstep — all while ensuring customer satisfaction and trust.",
    bgGradient: "linear-gradient(135deg, var(--color-brand-primary), #f4c542)",
    textColor: "var(--color-brand-heading)",
  },
  {
    id: "vision",
    title: "Our Vision",
    content:
      "To be the go-to online store for fashion lovers worldwide, delivering style, value, and outstanding customer service every time.",
    bgGradient:
      "linear-gradient(135deg, var(--color-brand-secondary), #8f1f25)",
    textColor: "var(--color-brand-heading)",
  },
];
export default function MissionVision() {
  return (
    <Box>
      <Grid container spacing={6} mb={10}>
        {missionVision.map(({ id, title, content, bgGradient, textColor }) => (
          <Grid size={{ xs: 12, md: 6 }} key={id}>
            <Paper
              elevation={6}
              sx={{
                p: 5,
                borderRadius: 3,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                background: bgGradient,
                color: textColor,
              }}
            >
              <Typography variant="h4" gutterBottom>
                {title}
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                {content}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
