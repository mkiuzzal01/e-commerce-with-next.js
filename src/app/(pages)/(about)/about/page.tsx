"use client";
import React from "react";
import { Box, Divider } from "@mui/material";
import { Store } from "lucide-react";
import Map from "@/components/sections/map/Map";
import SectionHeader from "@/components/Shared/SectionHeader";
import MissionVision from "./components/MissionVision";
import WhyShop from "./components/WhyShop";
import Stakeholders from "./components/Stakeholders";
import CoreValues from "./components/CoreValues";

const AboutPage = () => {
  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #fefce8 0%, #ffe4e6 100%)",
      }}
    >
      <Box className="container m-auto px-4">
        <Box className="py-4">
          <SectionHeader
            title={"About Us"}
            icon={<Store />}
            description={
              "At Your Store, we are passionate about bringing you the best products with exceptional service and value."
            }
          />
        </Box>
        <MissionVision />
        <WhyShop />
        <Divider />
        <CoreValues />
        <Stakeholders />
      </Box>
      <Map />
    </Box>
  );
};

export default AboutPage;
