/* eslint-disable @typescript-eslint/no-explicit-any */
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
import Loader from "@/utils/Loader";
import { TOrder } from "@/Types/OrderType";
import { useOrderStatusChangeMutation } from "@/redux/features/order/order.Api";
import { useToast } from "@/utils/tost-alert/ToastProvider";
import { dateTimeFormatter } from "@/lib/dateTimeFormatter";

// Order status steps in sequence
const statusSteps = ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED"];

// Display names for statuses
const statusDisplayNames: Record<string, string> = {
  PENDING: "Pending",
  PROCESSING: "Processing",
  SHIPPED: "Shipped",
  DELIVERED: "Delivered",
};

interface UpcomingProps {
  orders?: TOrder[];
  isLoading?: boolean;
  refetch: () => void;
}

export default function Upcoming({
  orders = [],
  isLoading = false,
  refetch,
}: UpcomingProps) {
  const { showToast } = useToast();
  const upcomingOrders = orders;
  const [orderStatusChange, { isLoading: changing }] =
    useOrderStatusChangeMutation();

  const handleCancelOrder = async (orderId: string) => {
    const { data } = await orderStatusChange({
      id: orderId,
      orderStatus: "CANCELLED",
    });
    if (data?.success) {
      showToast({
        message: "Order cancelled successfully",
        type: "success",
      });
      refetch();
    } else {
      showToast({
        message: "Failed to cancel order",
        type: "error",
      });
    }
  };

  if (isLoading) return <Loader />;

  if (upcomingOrders.length === 0) {
    return (
      <Card elevation={3}>
        <CardContent sx={{ textAlign: "center", py: 6 }}>
          <Typography variant="h6" color="text.secondary">
            No upcoming orders found
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            All your orders have been delivered or there are no orders yet.
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Grid container spacing={4}>
      {upcomingOrders.map((order, idx) => {
        const activeStep = statusSteps.indexOf(order?.orderStatus);
        const customerName = `${order?.customerId?.name?.firstName || ""} ${
          order?.customerId?.name?.middleName || ""
        } ${order?.customerId?.name?.lastName || ""}`.trim();

        return (
          <Grid size={{ xs: 12 }} key={order?._id || idx}>
            <Card elevation={3}>
              <CardContent>
                {/* Order Summary */}
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 8 }}>
                    <Typography variant="h6" fontWeight="bold">
                      Order #{order?._id?.slice(-8) || "N/A"}
                    </Typography>
                    <Typography>Customer: {customerName || "N/A"}</Typography>
                    <Typography>
                      Email: {order?.customerId?.email || "N/A"}
                    </Typography>
                    <Typography>
                      Placed At: {dateTimeFormatter(order?.createdAt as string)}
                    </Typography>
                    <Typography>
                      Status:{" "}
                      {statusDisplayNames[order?.orderStatus] ||
                        order?.orderStatus}
                    </Typography>
                    <Typography>
                      Delivery Address:{" "}
                      {order?.deliveryAddress?.presentAddress || "N/A"}
                    </Typography>
                  </Grid>
                  <Grid
                    size={{ xs: 12, md: 4 }}
                    textAlign={{ xs: "left", md: "right" }}
                  >
                    <Typography variant="h6" fontWeight="bold">
                      Total: ৳{order?.totalPrice || 0}
                    </Typography>
                    <Box mt={4}>
                      {order?.orderStatus === "PENDING" && (
                        <Button
                          variant="contained"
                          sx={{
                            textTransform: "none",
                            fontWeight: 600,
                            bgcolor: "var(--color-brand-primary)",
                            color: "white",
                            boxShadow: "0 2px 12px rgb(255 107 107 / 0.4)",
                            "&:hover": {
                              bgcolor: "var(--color-brand-secondary)",
                              boxShadow: "0 4px 20px rgb(255 107 107 / 0.6)",
                            },
                          }}
                          onClick={() => handleCancelOrder(order?._id)}
                        >
                          {changing ? "Canceling..." : "Cancel Order"}
                        </Button>
                      )}
                    </Box>
                  </Grid>
                </Grid>

                <Divider sx={{ my: 2 }} />

                {/* Items */}
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Items ({order?.orderItems?.length || 0})
                </Typography>
                <Grid container spacing={2}>
                  {order?.orderItems?.map((item: any, index: number) => (
                    <Grid size={{ xs: 12, md: 4 }} key={index}>
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

                {/* Stepper */}
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Order Progress
                </Typography>
                <Stepper activeStep={activeStep} alternativeLabel>
                  {statusSteps.map((status) => (
                    <Step key={status}>
                      <StepLabel>{statusDisplayNames[status]}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}
