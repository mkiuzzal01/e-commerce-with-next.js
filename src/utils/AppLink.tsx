import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Box } from "@mui/material";

type AppLinkProps = {
  href: string;
  className?: string;
  underline?: boolean;
  color?: string;
  activeColor?: string;
  target?: "_blank" | "_self";
  sx?: object;
  render?: (isActive: boolean) => React.ReactNode;
  children?: React.ReactNode;
};

const AppLink: React.FC<AppLinkProps> = ({
  href,
  className = "",
  underline = false,
  color = "inherit",
  activeColor = "#fe6731",
  target = "_self",
  sx = {},
  render,
  children,
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} target={target}>
      <Box
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
        className={className}
        sx={{
          textDecoration: underline ? "underline" : "none",
          color: isActive ? activeColor : color,
          fontWeight: isActive ? 600 : "normal",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          ...sx,
        }}
      >
        {render ? render(isActive) : children}
      </Box>
    </Link>
  );
};

export default AppLink;
