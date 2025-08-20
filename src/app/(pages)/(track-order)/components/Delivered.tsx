import React from "react";
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
  Button,
} from "@mui/material";
import { CheckCircle } from "lucide-react";
import { TOrder } from "@/Types/OrderType";
import Link from "next/link";

const statusSteps = [
  "PENDING",
  "PROCESSING",
  "SHIPPED",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
];

const statusDisplayNames: Record<string, string> = {
  PENDING: "Pending",
  PROCESSING: "Processing",
  SHIPPED: "Shipped",
  OUT_FOR_DELIVERY: "Out for Delivery",
  DELIVERED: "Delivered",
};

export default function Delivered({
  orders = [],
  isLoading = false,
}: {
  orders: TOrder[];
  isLoading?: boolean;
}) {
  if (isLoading) {
    return (
      <Card elevation={3}>
        <CardContent sx={{ textAlign: "center", py: 6 }}>
          <Typography variant="h6" color="text.secondary">
            Loading delivered orders...
          </Typography>
        </CardContent>
      </Card>
    );
  }

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });

  if (orders.length === 0) {
    return (
      <Card elevation={3}>
        <CardContent sx={{ justifyItems: "center", py: 6 }}>
          <CheckCircle
            size={48}
            style={{ color: "#9e9e9e", marginBottom: "16px" }}
          />
          <Typography variant="h6" color="text.secondary">
            No delivered orders found
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Your delivered orders will appear here once completed.
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Grid container spacing={4}>
      {orders.map((order, idx) => {
        const activeStep = statusSteps.indexOf(order.orderStatus);
        const customerName = `${order.customerId?.name?.firstName || ""} ${
          order.customerId?.name?.middleName || ""
        } ${order.customerId?.name?.lastName || ""}`.trim();
        const isReviewed = Boolean(order.reviews?.productId);

        return (
          <Grid size={{ xs: 12 }} key={order._id || idx}>
            <Card elevation={3} sx={{ position: "relative" }}>
              <CardContent>
                {/* Order Summary */}
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 8 }}>
                    <Typography variant="h6" fontWeight="bold">
                      Order #{order._id?.slice(-8) || "N/A"}
                    </Typography>
                    <Typography>Customer: {customerName || "N/A"}</Typography>
                    <Typography>
                      Email: {order.customerId?.email || "N/A"}
                    </Typography>
                    <Typography>
                      Placed At: {formatDate(order.createdAt as string)}
                    </Typography>
                    <Typography>
                      Delivered To:{" "}
                      {order.deliveryAddress?.presentAddress || "N/A"}
                    </Typography>
                    {order.updatedAt && (
                      <Typography color="success.main" fontWeight="medium">
                        Delivered On: {formatDate(order.updatedAt)}
                      </Typography>
                    )}
                  </Grid>
                  <Grid
                    size={{ xs: 12, md: 4 }}
                    textAlign={{ xs: "left", md: "right" }}
                  >
                    <Typography variant="h6" fontWeight="bold">
                      Total: ৳{order?.totalPrice || 0}
                    </Typography>
                    <Box>
                      {!isReviewed && (
                        <Link href={`/review/${order?.slug}`}>
                          <Button variant="contained">Review</Button>
                        </Link>
                      )}
                    </Box>
                  </Grid>
                </Grid>

                <Divider sx={{ my: 2 }} />

                {/* Items */}
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Items ({order.orderItems?.length || 0})
                </Typography>
                <Grid container spacing={2}>
                  {order.orderItems?.map((item, index) => (
                    <Grid size={{ xs: 12, md: 6 }} key={index}>
                      <Box
                        display="flex"
                        alignItems="center"
                        gap={2}
                        border={1}
                        borderColor="success.light"
                        bgcolor="success.50"
                        p={1.5}
                        borderRadius={2}
                      >
                        <Avatar
                          variant="rounded"
                          src={
                            item.productId?.productImage?.photo?.url ||
                            "/placeholder-image.jpg"
                          }
                          alt={item.productId?.title || "Product"}
                          sx={{ width: 56, height: 56 }}
                        />
                        <Box flexGrow={1}>
                          <Typography fontWeight="medium">
                            {item.productId?.title || "Product Name"}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Qty: {item.quantity || 0}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Size: {item.size?.toUpperCase() || "N/A"} | Color:{" "}
                            {item.color || "N/A"}
                          </Typography>
                        </Box>
                        <Box textAlign="right">
                          <Typography fontWeight="bold">
                            ৳
                            {(item.productId?.price || 0) *
                              (item.quantity || 0)}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            ৳{item.productId?.price || 0} each
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>

                <Divider sx={{ my: 3 }} />

                {/* Completed Stepper */}
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Order Completed ✓
                </Typography>
                <Stepper activeStep={activeStep} alternativeLabel>
                  {statusSteps.map((status) => (
                    <Step key={status} completed={true}>
                      <StepLabel>{statusDisplayNames[status]}</StepLabel>
                    </Step>
                  ))}
                </Stepper>

                {/* Delivered confirmation */}
                <Box sx={{ mt: 3, display: "flex", gap: 2, flexWrap: "wrap" }}>
                  <Typography
                    variant="body2"
                    color="success.main"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      fontWeight: "medium",
                    }}
                  >
                    <CheckCircle size={16} />
                    Order successfully delivered
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}
