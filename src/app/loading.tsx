"use client";
import React from "react";
import Image from "next/image";
import { Box, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import logo from "../../public/assets/logo/logo2.png";

export default function Loading() {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "background.paper",
        zIndex: 9999,
      }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 10,
        }}
        style={{
          position: "relative",
          width: "150px",
          height: "150px",
          marginBottom: "2rem",
        }}
      >
        <Image
          src={logo}
          alt="Loading"
          fill
          style={{
            objectFit: "contain",
          }}
          priority
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <CircularProgress
          size={50}
          thickness={4}
          sx={{
            color: "primary.main",
          }}
        />
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 0.7 }}
        transition={{ delay: 0.5 }}
        style={{ marginTop: "2rem" }}
      >
        <Box
          component="span"
          sx={{
            fontSize: "0.875rem",
            color: "text.secondary",
            letterSpacing: "0.5px",
          }}
        >
          Loading...
        </Box>
      </motion.div>
    </Box>
  );
}
