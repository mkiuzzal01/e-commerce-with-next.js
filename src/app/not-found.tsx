"use client";
import { Button, Container, Typography, Box, Stack } from "@mui/material";
import Link from "next/link";
import { motion } from "framer-motion";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

export default function NotFound() {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          py: 8,
        }}
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: { xs: "6rem", sm: "8rem", md: "10rem" },
              fontWeight: 700,
              lineHeight: 1,
              mb: 2,
              color: "primary.main",
            }}
          >
            404
          </Typography>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={1}
          >
            <SentimentVeryDissatisfiedIcon fontSize="large" color="error" />
            <Typography
              variant="h4"
              component="h2"
              sx={{
                fontWeight: 600,
                mb: 1,
              }}
            >
              Page Not Found
            </Typography>
          </Stack>

          <Typography
            variant="body1"
            sx={{
              mb: 4,
              maxWidth: "500px",
              mx: "auto",
              color: "text.secondary",
            }}
          >
            Oops! The page you are looking for does not exist or has been moved.
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center"
          >
            <Button
              component={Link}
              href="/"
              variant="contained"
              size="large"
              sx={{ px: 4 }}
            >
              Go to Homepage
            </Button>
            <Button
              component={Link}
              href="/contact"
              variant="outlined"
              size="large"
              sx={{ px: 4 }}
            >
              Contact Support
            </Button>
          </Stack>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          style={{ marginTop: "3rem" }}
        >
          <Typography variant="caption" color="text.secondary">
            Error code: 404 | Not Found
          </Typography>
        </motion.div>
      </Box>
    </Container>
  );
}
