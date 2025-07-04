import React, { type ReactNode, memo } from "react";
import { Button, type ButtonProps } from "@mui/material";

export interface SectionButtonProps extends ButtonProps {
  title: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  className?: string;
}
const SectionButton: React.FC<SectionButtonProps> = memo(
  ({
    title,
    startIcon,
    endIcon,
    className,
    variant = "contained",
    color = "primary",
    ...rest
  }) => {
    return (
      <Button
        startIcon={startIcon}
        endIcon={endIcon}
        variant={variant}
        color={color}
        className={`btn-primary${className ? ` ${className}` : ""}`}
        {...rest}
      >
        {title}
      </Button>
    );
  }
);

SectionButton.displayName = "SectionButton";

export default SectionButton;
