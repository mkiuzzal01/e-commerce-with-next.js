"use client";
import SectionHeader from "@/components/shared/SectionHeader";
import { Box, Divider } from "@mui/material";
import { Store } from "lucide-react";
import MissionVision from "./components/MissionVision";
import WhyShop from "./components/WhyShop";
import CoreValues from "./components/CoreValues";
import Stakeholders from "./components/Stakeholders";
import Map from "@/components/sections/map/Map";

export default function page() {
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
}
