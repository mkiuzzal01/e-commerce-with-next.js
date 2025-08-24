"use client";
import { Box, Typography, Stack, useTheme } from "@mui/material";

type SectionHeaderProps = {
  title?: string;
  subTitle?: string;
  description?: string;
  icon?: React.ReactNode;
  alignment?: "left" | "center" | "right";
};

export default function SectionHeader({
  title,
  subTitle,
  description,
  icon,
  alignment = "center",
}: SectionHeaderProps) {
  const theme = useTheme();

  const alignmentProps = {
    left: { alignItems: "flex-start", textAlign: "left" as const },
    center: { alignItems: "center", textAlign: "center" as const },
    right: { alignItems: "flex-end", textAlign: "right" as const },
  };

  const currentAlignment = alignmentProps[alignment] || alignmentProps.left;

  return (
    <Stack spacing={3} {...currentAlignment}>
      <Stack
        direction={alignment === "center" ? "column" : "row"}
        spacing={alignment === "center" ? 2 : 3}
        alignItems="center"
      >
        {icon && (
          <Box
            width={48}
            height={48}
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="50%"
            sx={{
              background: `linear-gradient(to right, ${theme.palette.warning.main}, ${theme.palette.error.main})`,
              color: theme.palette.common.white,
            }}
          >
            {icon}
          </Box>
        )}
        <Box>
          <Typography
            variant="subtitle2"
            sx={{
              color: theme.palette.warning.main,
              textTransform: "uppercase",
              letterSpacing: 1,
              fontWeight: 600,
            }}
          >
            {subTitle}
          </Typography>
          <Typography
            variant="h4"
            component="h2"
            fontWeight={700}
            color="text.primary"
          >
            {title}
          </Typography>
        </Box>
      </Stack>

      {description && (
        <Typography variant="body1" color="text.secondary" maxWidth="700px">
          {description}
        </Typography>
      )}
    </Stack>
  );
}
