"use client";
import React, { type ReactNode, memo } from "react";
import Link from "next/link";
import { Button, type ButtonProps as MUIButtonProps } from "@mui/material";

type SectionButtonProps = {
  title: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  className?: string;
  link?: string;
  variant?: "contained" | "outlined" | "text";
  color?: MUIButtonProps["color"];
} & Omit<MUIButtonProps, "variant" | "color">;

const SectionButton = memo(
  ({
    title,
    startIcon,
    endIcon,
    className = "",
    variant = "contained",
    color = "primary",
    link,
    ...rest
  }: SectionButtonProps) => {
    const buttonElement = (
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

    return link ? <Link href={link}>{buttonElement}</Link> : buttonElement;
  }
);

SectionButton.displayName = "SectionButton";

export default SectionButton;
