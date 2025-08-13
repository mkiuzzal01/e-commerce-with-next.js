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
} from "@mui/material";
import Loader from "@/utils/Loader";
import { TOrder } from "@/Types/OrderType";

// Display names for statuses
const statusDisplayNames: Record<string, string> = {
  CANCELLED: "Cancelled",
  CANCELED: "Cancelled", // in case spelling varies
};

interface CanceledProps {
  orders?: TOrder[];
  isLoading?: boolean;
}

export default function Canceled({
  orders = [],
  isLoading = false,
}: CanceledProps) {
  const canceledOrders = orders;

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  };

  if (isLoading) return <Loader />;

  if (canceledOrders.length === 0) {
    return (
      <Card elevation={3}>
        <CardContent sx={{ textAlign: "center", py: 6 }}>
          <Typography variant="h6" color="text.secondary">
            No canceled orders found
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            You haven’t canceled any orders yet.
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Grid container spacing={4}>
      {canceledOrders.map((order, idx) => {
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
                      Placed At: {formatDate(order?.createdAt as string)}
                    </Typography>
                    <Typography color="error" fontWeight="bold">
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
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}
