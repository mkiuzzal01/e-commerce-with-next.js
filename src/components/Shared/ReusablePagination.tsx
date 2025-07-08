"use client";

import React from "react";
import {
  Box,
  Pagination,
  PaginationItem,
  Stack,
  PaginationProps,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface ReusablePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  siblingCount?: number;
  boundaryCount?: number;
  showFirstButton?: boolean;
  showLastButton?: boolean;
  size?: PaginationProps["size"];
  shape?: PaginationProps["shape"];
  color?: PaginationProps["color"];
  disabled?: boolean;
  className?: string;
  sx?: object;
}

const ReusablePagination: React.FC<ReusablePaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  boundaryCount = 1,
  showFirstButton = true,
  showLastButton = true,
  size = "medium",
  shape = "rounded",
  color = "primary",
  disabled = false,
  className,
  sx,
}) => {
  if (totalPages <= 1) return null;

  return (
    <Box
      className={className}
      sx={{ display: "flex", justifyContent: "center", ...sx }}
    >
      <Stack spacing={2}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(_, page) => onPageChange?.(page)}
          siblingCount={siblingCount}
          boundaryCount={boundaryCount}
          showFirstButton={showFirstButton}
          showLastButton={showLastButton}
          size={size}
          shape={shape}
          color={color}
          disabled={disabled}
          renderItem={(item) => (
            <PaginationItem
              {...item}
              slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
            />
          )}
        />
      </Stack>
    </Box>
  );
};

export default ReusablePagination;
