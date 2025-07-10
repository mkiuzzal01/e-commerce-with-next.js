"use client";
import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  Divider,
  Stepper,
  Step,
  StepLabel,
  Tabs,
  Tab,
} from "@mui/material";
import SectionHeader from "@/components/Shared/SectionHeader";
import { Truck } from "lucide-react";
import ReusablePagination from "@/components/Shared/ReusablePagination";

const statusSteps = ["Processing", "Shipped", "Out for Delivery", "Delivered"];

const orders = [
  {
    orderId: "ORD1001",
    customerName: "Rahim Uddin",
    placedAt: "2025-07-07",
    status: "Out for Delivery",
    total: 2750,
    items: [
      {
        name: "Men's T-Shirt",
        quantity: 2,
        price: 650,
        image: "/images/products/tshirt.jpg",
      },
      {
        name: "Denim Jacket",
        quantity: 1,
        price: 1450,
        image: "/images/products/jacket.jpg",
      },
    ],
  },
  {
    orderId: "ORD1002",
    customerName: "Fatema Khatun",
    placedAt: "2025-07-05",
    status: "Shipped",
    total: 1980,
    items: [
      {
        name: "Unisex Sunglasses",
        quantity: 1,
        price: 1450,
        image: "/images/products/sunglasses.jpg",
      },
      {
        name: "Cap",
        quantity: 1,
        price: 530,
        image: "/images/products/cap.jpg",
      },
    ],
  },
  {
    orderId: "ORD1003",
    customerName: "Salman Rahman",
    placedAt: "2025-07-03",
    status: "Delivered",
    total: 3280,
    items: [
      {
        name: "Sports Shoes",
        quantity: 1,
        price: 1780,
        image: "/images/products/shoes.jpg",
      },
      {
        name: "Backpack",
        quantity: 1,
        price: 1500,
        image: "/images/products/bag.jpg",
      },
    ],
  },
];

const upcomingStatuses = ["Processing", "Shipped", "Out for Delivery"];

export default function TrackOrdersPage() {
  const [tabIndex, setTabIndex] = useState(0);

  const filteredOrders =
    tabIndex === 0
      ? orders.filter((o) => upcomingStatuses.includes(o.status))
      : orders.filter((o) => o.status === "Delivered");

  return (
    <Box
      sx={{
        py: 6,
        background: "linear-gradient(135deg, #fefce8 0%, #ffe4e6 100%)",
      }}
    >
      <Box className="container m-auto px-4">
        <Box className="py-4">
          <SectionHeader
            icon={<Truck />}
            title="Track Your Orders"
            description="Track your orders and know when they are delivered"
          />
        </Box>

        {/* Tabs */}
        <Tabs
          value={tabIndex}
          onChange={(_, newValue) => setTabIndex(newValue)}
          textColor="primary"
          indicatorColor="primary"
          variant="fullWidth"
          sx={{ mb: 4 }}
        >
          <Tab label="Upcoming Orders" />
          <Tab label="Delivered Orders" />
        </Tabs>

        <Grid container spacing={4}>
          {filteredOrders.map((order, idx) => {
            const activeStep = statusSteps.indexOf(order.status);
            return (
              <Grid size={{ xs: 12 }} key={idx}>
                <Card elevation={3}>
                  <CardContent>
                    {/* Order Summary */}
                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12 }}>
                        <Typography variant="h6" fontWeight="bold">
                          Order #{order.orderId}
                        </Typography>
                        <Typography>Customer: {order.customerName}</Typography>
                        <Typography>Placed At: {order.placedAt}</Typography>
                        <Typography>Status: {order.status}</Typography>
                      </Grid>
                      <Grid
                        size={{ xs: 12 }}
                        textAlign={{ xs: "left", md: "right" }}
                      >
                        <Typography variant="h6" fontWeight="bold">
                          Total: ৳{order.total}
                        </Typography>
                      </Grid>
                    </Grid>

                    <Divider sx={{ my: 2 }} />

                    {/* Items */}
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      gutterBottom
                    >
                      Items
                    </Typography>
                    <Grid container spacing={2}>
                      {order.items.map((item, index) => (
                        <Grid size={{ xs: 12, md: 6 }} key={index}>
                          <Box
                            display="flex"
                            alignItems="center"
                            gap={2}
                            border={1}
                            borderColor="grey.200"
                            p={1.5}
                            borderRadius={2}
                          >
                            <Avatar
                              variant="rounded"
                              src={item.image}
                              alt={item.name}
                              sx={{ width: 56, height: 56 }}
                            />
                            <Box flexGrow={1}>
                              <Typography fontWeight="medium">
                                {item.name}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                Qty: {item.quantity}
                              </Typography>
                            </Box>
                            <Typography fontWeight="bold">
                              ৳{item.price * item.quantity}
                            </Typography>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>

                    <Divider sx={{ my: 3 }} />

                    {/* Stepper */}
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      gutterBottom
                    >
                      Order Progress
                    </Typography>
                    <Stepper activeStep={activeStep} alternativeLabel>
                      {statusSteps.map((label) => (
                        <Step key={label}>
                          <StepLabel>{label}</StepLabel>
                        </Step>
                      ))}
                    </Stepper>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
      <Box textAlign="center" py={4}>
        <ReusablePagination currentPage={1} totalPages={10} />
      </Box>
    </Box>
  );
}
