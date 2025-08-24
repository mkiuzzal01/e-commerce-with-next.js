"use client";
import React, { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import SectionHeader from "@/components/shared/SectionHeader";
import { Truck } from "lucide-react";
import ReusablePagination from "@/components/shared/ReusablePagination";
import { useAllOrderByKeyWordQuery } from "@/redux/features/order/order.Api";
import { useUser } from "@/lib/hooks/useUser";
import Loader from "@/utils/Loader";
import Upcoming from "./Upcoming";
import Delivered from "./Delivered";
import Canceled from "./Canceled";
import { TOrder } from "@/Types/OrderType";

export default function TrackOrder() {
  const [tabIndex, setTabIndex] = useState<number>(0);

  // Separate page states for each tab
  const [pageUpcoming, setPageUpcoming] = useState<number>(1);
  const [pageDelivered, setPageDelivered] = useState<number>(1);
  const [pageCanceled, setPageCanceled] = useState<number>(1);

  const { userInfo, userComing } = useUser();

  // Upcoming orders
  const {
    data: upcomingData,
    isLoading: isUpcomingLoading,
    refetch,
  } = useAllOrderByKeyWordQuery({
    queryParams: { page: pageUpcoming, limit: 10 },
    headerParams: {
      params: {
        customerId: userInfo?._id,
        orderStatus: { $nin: ["DELIVERED", "CANCELLED"] },
      },
    },
  });

  // Delivered orders
  const { data: deliveredData, isLoading: isDeliveredLoading } =
    useAllOrderByKeyWordQuery({
      queryParams: { page: pageDelivered, limit: 10 },
      headerParams: {
        params: { customerId: userInfo?._id, orderStatus: "DELIVERED" },
      },
    });

  // Canceled orders
  const { data: canceledData, isLoading: isCanceledLoading } =
    useAllOrderByKeyWordQuery({
      queryParams: { page: pageCanceled, limit: 10 },
      headerParams: {
        params: { customerId: userInfo?._id, orderStatus: "CANCELLED" },
      },
    });

  // Extract meta and orders
  const upcomingMeta = upcomingData?.data?.meta ?? { totalPages: 1, total: 0 };
  const deliveredMeta = deliveredData?.data?.meta ?? {
    totalPages: 1,
    total: 0,
  };
  const canceledMeta = canceledData?.data?.meta ?? { totalPages: 1, total: 0 };

  const upcomingOrders: TOrder[] = upcomingData?.data?.result ?? [];
  const deliveredOrders: TOrder[] = deliveredData?.data?.result ?? [];
  const canceledOrders: TOrder[] = canceledData?.data?.result ?? [];

  const upcomingCount = upcomingMeta.total;
  const deliveredCount = deliveredMeta.total;
  const canceledCount = canceledMeta.total;

  // Determine current tab data
  let currentOrders: TOrder[] = [];
  let currentTotalPages = 1;
  let currentPage = 1;
  let isCurrentLoading = false;
  let handlePageChange: (page: number) => void = () => {};

  if (tabIndex === 0) {
    currentOrders = upcomingOrders;
    currentTotalPages = upcomingMeta.totalPages;
    currentPage = pageUpcoming;
    isCurrentLoading = isUpcomingLoading;
    handlePageChange = setPageUpcoming;
  } else if (tabIndex === 1) {
    currentOrders = deliveredOrders;
    currentTotalPages = deliveredMeta.totalPages;
    currentPage = pageDelivered;
    isCurrentLoading = isDeliveredLoading;
    handlePageChange = setPageDelivered;
  } else {
    currentOrders = canceledOrders;
    currentTotalPages = canceledMeta.totalPages;
    currentPage = pageCanceled;
    isCurrentLoading = isCanceledLoading;
    handlePageChange = setPageCanceled;
  }

  if (
    userComing ||
    (tabIndex === 0 && isUpcomingLoading) ||
    (tabIndex === 1 && isDeliveredLoading) ||
    (tabIndex === 2 && isCanceledLoading)
  ) {
    return <Loader />;
  }

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
            description="Track your orders and know when they are delivered or canceled"
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
          <Tab
            label={`Upcoming Orders${
              upcomingCount > 0 ? ` (${upcomingCount})` : ""
            }`}
            sx={{ fontWeight: "medium" }}
          />
          <Tab
            label={`Delivered Orders${
              deliveredCount > 0 ? ` (${deliveredCount})` : ""
            }`}
            sx={{ fontWeight: "medium" }}
          />
          <Tab
            label={`Canceled Orders${
              canceledCount > 0 ? ` (${canceledCount})` : ""
            }`}
            sx={{ fontWeight: "medium" }}
          />
        </Tabs>

        {/* Tab Content */}
        <Box>
          {tabIndex === 0 && (
            <Upcoming
              orders={upcomingOrders}
              isLoading={isUpcomingLoading}
              refetch={refetch}
            />
          )}
          {tabIndex === 1 && (
            <Delivered
              orders={deliveredOrders}
              isLoading={isDeliveredLoading}
            />
          )}
          {tabIndex === 2 && (
            <Canceled orders={canceledOrders} isLoading={isCanceledLoading} />
          )}
        </Box>

        {/* Pagination */}
        {currentOrders.length > 0 && currentTotalPages > 1 && (
          <Box textAlign="center" mt={4}>
            <ReusablePagination
              currentPage={currentPage}
              totalPages={currentTotalPages}
              onPageChange={handlePageChange}
            />
          </Box>
        )}

        {isCurrentLoading && (
          <Box textAlign="center" mt={4}>
            <Loader />
          </Box>
        )}
      </Box>
    </Box>
  );
}
