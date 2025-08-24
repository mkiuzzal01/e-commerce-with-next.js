/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { List } from "lucide-react";
import SectionHeader from "@/components/Shared/SectionHeader";
import WishListCard from "@/utils/cards/WishListCard";
import ReusablePagination from "@/components/Shared/ReusablePagination";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { TProduct, TWishlistItem } from "@/Types/ProductType";
import Loader from "@/utils/Loader";
import { useAllProductByKeyWordQuery } from "@/redux/features/product/product.Api";
import { removeFromWishlist } from "@/redux/slice/wishlistSlice";

export default function Wishlist() {
  const [page, setPage] = useState(1);
  const dispatch = useAppDispatch();
  const wishlistItems: TWishlistItem[] = useAppSelector(
    (state) => state.wishlist.items
  );

  const queryParams: Record<string, any> = {
    page,
    limit: 12,
  };

  const wishListIds = wishlistItems.map((item) => item._id);
  const { data, isLoading } = useAllProductByKeyWordQuery({
    queryParams,
    headerParams: {
      params: { _id: { $in: wishListIds } },
      activity: "market-launch",
    },
  });

  const wishlistProducts: TProduct[] = data?.data?.result || [];
  const meta = data?.data?.meta || { totalPages: 1 };
  const totalPages = meta.totalPages || 1;

  if (isLoading) return <Loader />;

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #fefce8 0%, #ffe4e6 100%)",
        minHeight: "100vh",
        py: 4,
      }}
    >
      <Box className="container mx-auto px-4">
        <Box className="py-8">
          <SectionHeader
            icon={<List />}
            title="Your Wishlist"
            description="View, manage, and shop your saved favorites — all in one place."
          />
        </Box>

        {wishlistProducts.length === 0 ? (
          <Box
            sx={{
              textAlign: "center",
              py: 10,
              color: "text.secondary",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Your wishlist is empty
            </Typography>
            <Typography variant="body1">
              Save products you like to find them easily here later.
            </Typography>
          </Box>
        ) : (
          <>
            <Grid container spacing={4}>
              {wishlistProducts.map((item) => (
                <Grid size={{ xs: 12, md: 3 }} key={item._id}>
                  <WishListCard
                    id={item?._id}
                    slug={item?.slug}
                    title={item?.title}
                    price={item?.price}
                    discount={item?.discount}
                    image={item?.productImage?.photo?.url}
                    categories={item?.categories}
                    onRemove={(id) => dispatch(removeFromWishlist(id))}
                  />
                </Grid>
              ))}
            </Grid>

            <Box textAlign="center" mt={4}>
              <ReusablePagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={(newPage) => setPage(newPage)}
              />
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}
