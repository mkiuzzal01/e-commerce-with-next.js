import AppLink from "@/utils/AppLink";
import { Box, Stack, Typography } from "@mui/material";
import { Contact, Headphones, Store, Truck } from "lucide-react";
import React from "react";

export default function TopBar() {
  return (
    <Box
      className="bg-[var(--color-brand-background)] text-white hidden lg:block"
      sx={{ bgcolor: "var(--color-brand-background)", color: "#fff" }}
    >
      <Box
        className="container mx-auto p-4"
        display="flex"
        justifyContent="space-between"
        fontSize="0.875rem"
        alignItems="center"
      >
        <Stack direction="row" spacing={6} alignItems="center">
          <Stack direction="row" spacing={1} alignItems="center">
            <Truck size={16} color="#10b981" />
            <Typography>First delivery with your trusted partner</Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <Headphones size={16} color="#3b82f6" />
            <Typography>24/7 You can buy product</Typography>
          </Stack>
        </Stack>

        <Stack direction="row" spacing={5} alignItems="center">
          <Box
            component="a"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              color: "inherit",
              textDecoration: "none",
              "&:hover": { color: "emerald.main" },
              cursor: "pointer",
              fontSize: "0.875rem",
            }}
          >
            <Truck size={16} />
            <AppLink href="/track-order">
              <Box
                sx={{
                  color: "inherit",
                  fontSize: "0.875rem",
                  cursor: "pointer",
                  "&:hover": { color: "blue.main" },
                  textDecoration: "none",
                }}
              >
                Track Order
              </Box>
            </AppLink>
          </Box>
          <AppLink href="/about">
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                color: "inherit",
                fontSize: "0.875rem",
                cursor: "pointer",
                "&:hover": { color: "orange.main" },
                textDecoration: "none",
              }}
            >
              <Store size={16} />
              About us
            </Box>
          </AppLink>
          <AppLink href="/contact">
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                color: "inherit",
                fontSize: "0.875rem",
                cursor: "pointer",
                "&:hover": { color: "orange.main" },
                textDecoration: "none",
              }}
            >
              <Contact size={16} />
              Contact us
            </Box>
          </AppLink>
        </Stack>
      </Box>
    </Box>
  );
}
