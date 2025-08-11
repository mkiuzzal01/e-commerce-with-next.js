"use client";

import React, { useState } from "react";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  ListItemIcon,
} from "@mui/material";
import AppLink from "../AppLink";
import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/features/auth/authSlice";
import { useToast } from "../tost-alert/ToastProvider";

interface UserMenuItem {
  label: string;
  icon?: React.ReactNode;
  href: string;
}

interface UserMenuProps {
  user: {
    name?: string;
    image?: string;
  };
  menuItems: UserMenuItem[];
}

export default function UserMenu({ user, menuItems }: UserMenuProps) {
  const { showToast } = useToast();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const dispatch = useAppDispatch();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    showToast({
      type: "success",
      message: "Logged out successfully",
      duration: 3000,
    });
    handleClose();
  };

  const displayName = user?.name?.trim() || "Guest User";
  const avatarSrc = user?.image || "/default-avatar.png";

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Tooltip title={displayName}>
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "user-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              src={avatarSrc}
              alt={displayName}
              sx={{
                width: 36,
                height: 36,
                border: "2px solid",
                borderColor: "divider",
              }}
            />
          </IconButton>
        </Tooltip>
      </Box>

      <Menu
        anchorEl={anchorEl}
        id="user-menu"
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        disableScrollLock
        PaperProps={{
          sx: {
            minWidth: 200,
            borderRadius: 2,
            overflow: "hidden",
          },
        }}
      >
        {/* User Info Header */}
        <MenuItem
          disabled
          sx={{
            opacity: 1,
            py: 1.2,
            display: "flex",
            gap: 1.5,
            alignItems: "center",
            bgcolor: "background.default",
          }}
        >
          <Avatar src={avatarSrc} alt={displayName} />
          <Box>
            <Typography
              variant="body2"
              fontWeight="bold"
              noWrap
              sx={{ maxWidth: 140 }}
            >
              {displayName}
            </Typography>
            <Typography variant="caption" color="text.secondary" noWrap>
              {displayName === "Guest User" ? "Not logged in" : "View profile"}
            </Typography>
          </Box>
        </MenuItem>

        <Divider />

        {/* Dynamic Menu Items */}
        {menuItems?.length > 0 ? (
          menuItems.map((item, idx) => (
            <AppLink key={idx} href={item?.href}>
              <MenuItem onClick={handleClose}>
                {item.icon && (
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    {item?.icon}
                  </ListItemIcon>
                )}
                <Typography variant="body2">{item?.label}</Typography>
              </MenuItem>
            </AppLink>
          ))
        ) : (
          <MenuItem disabled>
            <Typography variant="body2" color="text.secondary">
              No menu options
            </Typography>
          </MenuItem>
        )}

        <Divider />

        {/* Logout */}
        <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}>
          <Typography variant="body2" fontWeight="medium">
            Logout
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
}
