/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Box, Container, Typography, Grid, Button } from "@mui/material";
import ReusableForm from "@/components/shared/ReusableForm";
import RatingInput from "@/components/shared/input-fields/RatingInput";
import { TextInput } from "@/components/shared/input-fields/TextInput";
import {
  useSingleOrderQuery,
  useUpdateOrderMutation,
} from "@/redux/features/order/order.Api";
import { FieldValues } from "react-hook-form";
import Loader from "../Loader";
import { TOrder, TOrderItem, TReview } from "@/Types/OrderType";
import { useToast } from "../tost-alert/ToastProvider";
import { useRouter } from "next/navigation";

interface ClientReviewFormProps {
  slug: string;
}

interface ReviewState {
  rating: number;
  comment: string;
  isSubmitted: boolean;
}

export default function ClientReviewForm({ slug }: ClientReviewFormProps) {
  const router = useRouter();
  const { showToast } = useToast();
  const { data, isLoading } = useSingleOrderQuery(slug || "", {
    skip: !slug,
  });
  const [updateOrder, { isLoading: updating }] = useUpdateOrderMutation();

  const order: TOrder | undefined = data?.data;
  const [reviews, setReviews] = useState<Record<string, ReviewState>>({});

  // Filter order items: only unique & not yet reviewed by this user
  const uniqueOrderItems: TOrderItem[] = useMemo(() => {
    if (!order?.orderItems) return [];

    const seen = new Set<string>();
    const reviewsArray = Array.isArray(order.reviews) ? order.reviews : [];

    return order.orderItems.filter((item) => {
      const productId = item?.productId?._id;
      if (!productId || seen.has(productId)) return false;

      // Check if this product is already reviewed by this user
      const alreadyReviewed = reviewsArray.some(
        (rev: TReview) =>
          rev.productId.toString() === productId.toString() &&
          rev.userId.toString() === order.customerId.toString()
      );

      if (alreadyReviewed) return false;

      seen.add(productId);
      return true;
    });
  }, [order]);

  // Initialize review state for all products
  useEffect(() => {
    if (uniqueOrderItems.length > 0) {
      const initialReviews: Record<string, ReviewState> = {};
      uniqueOrderItems.forEach((item) => {
        const productId = item.productId._id;
        initialReviews[productId] = {
          rating: 2,
          comment: "",
          isSubmitted: false,
        };
      });
      setReviews(initialReviews);
    }
  }, [uniqueOrderItems]);

  // Redirect to track-order if all reviews are submitted
  useEffect(() => {
    const allSubmitted =
      uniqueOrderItems.length > 0 &&
      uniqueOrderItems.every(
        (item) => reviews[item.productId._id]?.isSubmitted
      );

    if (allSubmitted) {
      router.push("/track-order");
    }
  }, [reviews, uniqueOrderItems, router]);

  const handleRatingChange = (productId: string, value: number) => {
    setReviews((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        rating: value,
      },
    }));
  };

  const handleSubmit = async (productId: string, values: FieldValues) => {
    if (!order) return;

    try {
      const reviewData = {
        reviews: {
          productId,
          userId: order.customerId,
          comment: values.comment || "",
          rating: reviews[productId]?.rating || 2,
        },
      };

      await updateOrder({
        id: order._id,
        data: reviewData,
      }).unwrap();
      setReviews((prev) => ({
        ...prev,
        [productId]: {
          ...prev[productId],
          isSubmitted: true,
        },
      }));

      showToast({
        message: "Review submitted successfully!",
        type: "success",
      });
    } catch {
      showToast({
        message: "Failed to submit review. Please try again.",
        type: "error",
      });
    }
  };

  if (isLoading) return <Loader />;

  if (uniqueOrderItems.length === 0) {
    return (
      <Box
        sx={{
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6" color="text.secondary">
          All products are reviewed. Redirecting...
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #fefce8 0%, #ffe4e6 100%)",
        minHeight: "100vh",
        py: 4,
      }}
    >
      <Box className="container m-auto">
        {uniqueOrderItems.map((item) => {
          const productId = item.productId._id;
          const productTitle = item.productId.title;
          const review = reviews[productId];

          if (!review || review.isSubmitted) return null;

          return (
            <Container
              key={productId}
              sx={{
                boxShadow: 2,
                p: 4,
                borderRadius: 5,
                mb: 4,
                backdropFilter: "blur(10px)",
                background: "rgba(255,255,255,0.8)",
              }}
            >
              <Typography
                variant="h6"
                component="h2"
                gutterBottom
                sx={{ fontWeight: 600, textAlign: "center" }}
              >
                Review: {productTitle}
              </Typography>

              <ReusableForm
                onSubmit={(values) => handleSubmit(productId, values)}
              >
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12 }}>
                    <TextInput
                      name="comment"
                      label="Write your opinion"
                      multiline
                      row={4}
                      fullWidth
                      required
                    />
                  </Grid>

                  <Grid size={{ xs: 12 }} sx={{ textAlign: "center" }}>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      Your Rating
                    </Typography>
                    <RatingInput
                      value={review.rating}
                      setValue={(val: any) =>
                        handleRatingChange(productId, val)
                      }
                    />
                  </Grid>

                  <Grid size={{ xs: 12 }} sx={{ textAlign: "center" }}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={updating}
                      sx={{
                        textTransform: "none",
                        px: 4,
                        py: 1.2,
                        fontWeight: 600,
                      }}
                    >
                      {updating ? "Submitting..." : "Submit Review"}
                    </Button>
                  </Grid>
                </Grid>
              </ReusableForm>
            </Container>
          );
        })}
      </Box>
    </Box>
  );
}
