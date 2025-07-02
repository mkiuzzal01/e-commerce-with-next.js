"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Box } from "@mui/material";

type AppLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  underline?: boolean;
  color?: string;
  activeColor?: string;
  target?: "_blank" | "_self";
  sx?: object;
};

const AppLink: React.FC<AppLinkProps> = ({
  href,
  children,
  className = "",
  underline = false,
  color = "inherit",
  activeColor = "#fe6731", 
  target = "_self",
  sx = {},
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} >
      <Box
        component="a"
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
        className={className}
        sx={{
          textDecoration: underline ? "underline" : "none",
          color: isActive ? activeColor : color,
          fontWeight: isActive ? 600 : "normal",
          cursor: "pointer",
          ...sx,
        }}
      >
        {children}
      </Box>
    </Link>
  );
};

export default AppLink;
