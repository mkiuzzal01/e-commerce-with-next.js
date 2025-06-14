"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  Box,
  IconButton,
  Badge,
  InputBase,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Collapse,
  Divider,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  ShoppingCart as CartIcon,
  Person as PersonIcon,
  Favorite as FavoriteIcon,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";
import { navLinks } from "./NavLinks";

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openCategoryIndex, setOpenCategoryIndex] = useState<number | null>(
    null
  );
  const [subAnchorEl, setSubAnchorEl] = useState<null | HTMLElement>(null);
  const [openSubIndex, setOpenSubIndex] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpandedCategories, setMobileExpandedCategories] = useState<
    number[]
  >([]);

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    setAnchorEl(event.currentTarget);
    setOpenCategoryIndex(index);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setOpenCategoryIndex(null);
    setSubAnchorEl(null);
    setOpenSubIndex(null);
  };

  const handleSubMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    setSubAnchorEl(event.currentTarget);
    setOpenSubIndex(index);
  };

  const handleMobileDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMobileCategoryToggle = (index: number) => {
    setMobileExpandedCategories((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const drawer = (
    <Box sx={{ width: 280 }} role="presentation">
      <Box sx={{ p: 2, borderBottom: 1, borderColor: "divider" }}>
        <Typography variant="h6" className="text-green-600 font-bold">
          MyShop
        </Typography>
      </Box>
      <List>
        {navLinks.map((main, mainIdx) => (
          <div key={mainIdx}>
            <ListItem
              button
              onClick={() => handleMobileCategoryToggle(mainIdx)}
              sx={{ py: 1.5 }}
            >
              <ListItemText
                primary={main.MainCategoryName}
                primaryTypographyProps={{ fontWeight: "medium" }}
              />
              {mobileExpandedCategories.includes(mainIdx) ? (
                <ExpandLess />
              ) : (
                <ExpandMore />
              )}
            </ListItem>
            <Collapse
              in={mobileExpandedCategories.includes(mainIdx)}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                {main.Category.map((cat, catIdx) => (
                  <div key={catIdx}>
                    <ListItem
                      button
                      sx={{ pl: 4, py: 1 }}
                      onClick={() => setMobileOpen(false)}
                    >
                      <Link href={cat.link} className="w-full">
                        <ListItemText
                          primary={cat.categoryName}
                          primaryTypographyProps={{ fontSize: "0.9rem" }}
                        />
                      </Link>
                    </ListItem>
                    {cat.subCategory.map((sub, subIdx) => (
                      <ListItem
                        key={subIdx}
                        button
                        sx={{ pl: 6, py: 0.5 }}
                        onClick={() => setMobileOpen(false)}
                      >
                        <Link href={sub.link} className="w-full">
                          <ListItemText
                            primary={sub.subCategoryName}
                            primaryTypographyProps={{
                              fontSize: "0.8rem",
                              color: "text.secondary",
                            }}
                          />
                        </Link>
                      </ListItem>
                    ))}
                  </div>
                ))}
              </List>
            </Collapse>
            <Divider />
          </div>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#fff",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <Toolbar className="container mx-auto flex justify-between items-center px-4 lg:px-8">
          {/* Mobile Menu Button */}
          <Box className="md:hidden">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleMobileDrawerToggle}
              sx={{ color: "#333" }}
            >
              <MenuIcon />
            </IconButton>
          </Box>

          {/* Logo */}
          <Typography variant="h6" className="text-xl font-bold text-green-600">
            <Link href="/" className="flex items-center">
              MyShop
            </Link>
          </Typography>

          {/* Desktop Navigation */}
          <Box className="hidden md:flex gap-2">
            {navLinks.map((main, mainIdx) => (
              <div key={mainIdx}>
                <Button
                  onMouseEnter={(e) => handleMenuOpen(e, mainIdx)}
                  className="text-gray-800 normal-case px-4 py-2 hover:bg-gray-100 rounded-md transition-colors"
                  sx={{
                    minWidth: "auto",
                    "&:hover": { backgroundColor: "#f5f5f5" },
                  }}
                >
                  {main.MainCategoryName}
                </Button>

                {/* First-level Category Menu */}
                <Menu
                  anchorEl={anchorEl}
                  open={openCategoryIndex === mainIdx}
                  onClose={handleMenuClose}
                  onMouseLeave={handleMenuClose}
                  MenuListProps={{
                    onMouseLeave: handleMenuClose,
                    sx: { py: 1 },
                  }}
                  PaperProps={{
                    sx: {
                      mt: 1,
                      minWidth: 200,
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      border: "1px solid #e0e0e0",
                    },
                  }}
                >
                  {main.Category.map((cat, catIdx) => (
                    <div key={catIdx}>
                      <MenuItem
                        onMouseEnter={(e) => handleSubMenuOpen(e, catIdx)}
                        onClick={handleMenuClose}
                        sx={{
                          py: 1.5,
                          "&:hover": { backgroundColor: "#f8f9fa" },
                        }}
                      >
                        <Link href={cat.link} className="w-full font-medium">
                          {cat.categoryName}
                        </Link>
                      </MenuItem>

                      {/* Second-level SubCategory Menu */}
                      <Menu
                        anchorEl={subAnchorEl}
                        open={
                          openSubIndex === catIdx &&
                          openCategoryIndex === mainIdx
                        }
                        onClose={handleMenuClose}
                        anchorOrigin={{ vertical: "top", horizontal: "right" }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                        PaperProps={{
                          sx: {
                            minWidth: 180,
                            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                            border: "1px solid #e0e0e0",
                          },
                        }}
                      >
                        {cat.subCategory.map((sub, subIdx) => (
                          <MenuItem
                            key={subIdx}
                            onClick={handleMenuClose}
                            sx={{
                              py: 1,
                              "&:hover": { backgroundColor: "#f8f9fa" },
                            }}
                          >
                            <Link href={sub.link} className="w-full text-sm">
                              {sub.subCategoryName}
                            </Link>
                          </MenuItem>
                        ))}
                      </Menu>
                    </div>
                  ))}
                </Menu>
              </div>
            ))}
          </Box>

          {/* Search Bar */}
          <Box className="hidden lg:flex items-center bg-gray-100 rounded-full px-4 py-2 min-w-[300px]">
            <SearchIcon sx={{ color: "#666", mr: 1 }} />
            <InputBase
              placeholder="Search products..."
              sx={{
                flex: 1,
                fontSize: "0.9rem",
                "& input::placeholder": {
                  color: "#666",
                  opacity: 1,
                },
              }}
            />
          </Box>

          {/* Right Side Icons */}
          <Box className="flex items-center gap-2">
            {/* Search Icon for Mobile */}
            <IconButton className="lg:hidden" sx={{ color: "#333" }}>
              <SearchIcon />
            </IconButton>

            {/* User Account */}
            <IconButton sx={{ color: "#333" }}>
              <PersonIcon />
            </IconButton>

            {/* Wishlist */}
            <IconButton sx={{ color: "#333" }}>
              <Badge badgeContent={2} color="error">
                <FavoriteIcon />
              </Badge>
            </IconButton>

            {/* Shopping Cart */}
            <IconButton sx={{ color: "#333" }}>
              <Badge badgeContent={3} color="error">
                <CartIcon />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleMobileDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 280,
            top: 0,
            height: "100vh",
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}
