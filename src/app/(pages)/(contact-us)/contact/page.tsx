"use client";
import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import Map from "@/components/sections/map/Map";
import SectionHeader from "@/components/Shared/SectionHeader";
import { Contact, Mail, Phone, MapPin, Clock } from "lucide-react";
import ContactForm from "./components/ContactForm";

export default function ContactUsPage() {
  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #fefce8 0%, #ffe4e6 100%)",
      }}
    >
      <Box className="container m-auto p-4">
        <Box className="mb-8">
          <SectionHeader
            title={"Contact Us"}
            icon={<Contact />}
            description={`We'd love to hear from you! Please fill out the form below and we'll get back to you shortly.`}
          />
        </Box>

        <Box className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Side - Contact Information */}
          <Box>
            <Stack spacing={2}>
              <Typography variant="h3">Get in Touch</Typography>

              <Stack direction="row" alignItems="center" spacing={1}>
                <Phone size={20} />
                <Typography variant="body1">
                  <strong>Phone:</strong> +880 1234 567 890
                </Typography>
              </Stack>

              <Stack direction="row" alignItems="center" spacing={1}>
                <Mail size={20} />
                <Typography variant="body1">
                  <strong>Email:</strong>exportcornerkhulna@gmail.com
                </Typography>
              </Stack>

              <Stack direction="row" alignItems="center" spacing={1}>
                <MapPin size={20} />
                <Typography variant="body1">
                  <strong>Address:</strong> BL Collage gate, Khulna, Bangladesh
                </Typography>
              </Stack>

              <Stack direction="row" alignItems="center" spacing={1}>
                <Clock size={20} />
                <Typography variant="body1">
                  <strong>Working Hours:</strong> Sun - Thu, 10:00 AM - 6:00 PM
                </Typography>
              </Stack>
            </Stack>
          </Box>

          {/* Right Side - Contact Form */}
          <Box>
            <ContactForm />
          </Box>
        </Box>
      </Box>

      {/* Map Section */}
      <Box className="mt-5">
        <Map />
      </Box>
    </Box>
  );
}
