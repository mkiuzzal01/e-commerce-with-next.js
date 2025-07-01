import React from "react";
import {
  LocalShipping,
  CardGiftcard,
  CreditCard,
  Verified,
  Star,
  SupportAgent,
} from "@mui/icons-material";

export const PromotionalBannerData = [
  {
    icon: <LocalShipping sx={{ fontSize: 40 }} />,
    title: "Free Shipping",
    subtitle: "On all orders over $50",
  },
  {
    icon: <CardGiftcard sx={{ fontSize: 40 }} />,
    title: "New Collection",
    subtitle: "Summer 2025 just dropped",
  },
  {
    icon: <CreditCard sx={{ fontSize: 40 }} />,
    title: "Secure Payments",
    subtitle: "Multiple payment options",
  },
  {
    icon: <Verified sx={{ fontSize: 40 }} />,
    title: "Quality Guarantee",
    subtitle: "30-day money back guarantee",
  },
  {
    icon: <Star sx={{ fontSize: 40 }} />,
    title: "Premium Quality",
    subtitle: "Handpicked products",
  },
  {
    icon: <SupportAgent sx={{ fontSize: 40 }} />,
    title: "24/7 Support",
    subtitle: "Always here to help",
  },
];