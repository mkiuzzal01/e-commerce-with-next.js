"use client";
import React, { useEffect, useState } from "react";
import {
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  Stack,
  Chip,
} from "@mui/material";
import { ShoppingCart } from "lucide-react";
import { flashProducts } from "./flashProductsData";
import Image from "next/image";

const calculateTimeLeft = (target: string) => {
  const difference = +new Date(target) - +new Date();
  let timeLeft = {
    hours: "00",
    minutes: "00",
    seconds: "00",
  };

  if (difference > 0) {
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    timeLeft = {
      hours: String(hours).padStart(2, "0"),
      minutes: String(minutes).padStart(2, "0"),
      seconds: String(seconds).padStart(2, "0"),
    };
  }

  return timeLeft;
};

export default function FlashSale() {
  const [timeLeft, setTimeLeft] = useState(
    calculateTimeLeft("2025-06-20T23:59:59")
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft("2025-06-20T23:59:59"));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="container m-auto pt-10">
      <Stack
        direction={{ xs: "column", md: "row" }}
        alignItems="center"
        justifyContent="space-between"
        mb={3}
      >
        <Typography variant="h5" fontWeight="bold">
          ⚡ Today’s Deals
        </Typography>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography fontWeight="medium">Ends in:</Typography>
          <Chip
            label={`${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`}
            color="error"
            sx={{ fontWeight: "bold" }}
          />
        </Stack>
      </Stack>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={3}
        flexWrap="wrap"
      >
        {flashProducts.map((product) => (
          <Card
            key={product.id}
            sx={{
              flex: 1,
              minWidth: 280,
              maxWidth: 360,
              boxShadow: 4,
              borderRadius: 3,
              overflow: "hidden",
              position: "relative",
              "&:hover": {
                boxShadow: 6,
              },
            }}
          >
            <div className="relative aspect-[3/4] transform transition-transform duration-500 hover:scale-105">
              <Image
                src={product?.image}
                alt={product?.name}
                placeholder="blur"
                className="object-cover"
                fill
              />
            </div>
            <CardContent>
              <Typography
                variant="subtitle1"
                fontWeight="600"
                gutterBottom
                noWrap
              >
                {product.name}
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography color="primary" fontWeight="bold">
                  ৳{product.price}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ textDecoration: "line-through" }}
                  color="text.secondary"
                >
                  ৳{product.originalPrice}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1} mt={2}>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  startIcon={<ShoppingCart size={18} />}
                >
                  Add to Cart
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  fullWidth
                  sx={{ whiteSpace: "nowrap" }}
                >
                  Buy Now
                </Button>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </div>
  );
}
