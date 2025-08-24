import React from "react";
import { Stack, IconButton } from "@mui/material";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";

interface CarouselArrowsProps {
  onPrev: () => void;
  onNext: () => void;
  disabledPrev?: boolean;
  disabledNext?: boolean;
  justifyContent?: "flex-start" | "center" | "flex-end";
}

const CarouselArrows: React.FC<CarouselArrowsProps> = ({
  onPrev,
  onNext,
  disabledPrev = false,
  disabledNext = false,
  justifyContent = "flex-end",
}) => {
  return (
    <Stack direction="row" spacing={1} justifyContent={justifyContent} my={4}>
      <IconButton
        aria-label="Previous slide"
        onClick={onPrev}
        disabled={disabledPrev}
        sx={{
          color: "white",
          backgroundColor: "var(--color-brand-primary)",
          transition: "all 0.3s ease",
          "&:hover": {
            backgroundColor: "var(--color-brand-primary)",
            color: "white",
            boxShadow: "0 4px 12px rgba(254, 103, 49, 0.5)",
          },
          "&:disabled": {
            color: "rgba(254, 103, 49, 0.4)",
          },
        }}
      >
        <ArrowBackIosNew fontSize="small" />
      </IconButton>

      <IconButton
        aria-label="Next slide"
        onClick={onNext}
        disabled={disabledNext}
        sx={{
          color: "white",
          backgroundColor: "var(--color-brand-primary)",
          transition: "all 0.3s ease",
          "&:hover": {
            backgroundColor: "var(--color-brand-primary)",
            color: "white",
            boxShadow: "0 4px 12px rgba(254, 103, 49, 0.5)",
          },
          "&:disabled": {
            color: "rgba(254, 103, 49, 0.4)",
          },
        }}
      >
        <ArrowForwardIos fontSize="small" />
      </IconButton>
    </Stack>
  );
};

export default CarouselArrows;
