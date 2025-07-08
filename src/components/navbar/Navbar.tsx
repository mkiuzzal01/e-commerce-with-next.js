"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
  X,
  Phone,
  MapPin,
  Truck,
  Headphones,
  HomeIcon,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/assets/logo/logo1.png";
import { megaMenuData } from "./NavLinks";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  IconButton,
  Divider,
  Dialog,
  DialogContent,
  DialogActions,
  InputBase,
  Button,
  Box,
  Stack,
  useTheme,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AppLink from "@/utils/AppLink";

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const theme = useTheme();

  const handleMouseEnter = (index: number) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(index);
  };

  const handleMouseLeave = () => {
    console.log(activeMenu);
    console.log(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setActiveMenu(null), 100);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow =
      isMobileMenuOpen || isSearchOpen ? "hidden" : "auto";
  }, [isMobileMenuOpen, isSearchOpen]);

  const [expandedAccordion, setExpandedAccordion] = useState<number | false>(
    false
  );

  return (
    <Box position="relative">
      <Box
        component="header"
        className={` sticky top-0 z-50 transition-shadow ${
          isScrolled ? "shadow-md" : "shadow-sm"
        }`}
        sx={{ boxShadow: isScrolled ? theme.shadows[4] : theme.shadows[1] }}
      >
        {/* Top Bar */}
        <Box
          className="bg-[var(--color-brand-background)] text-white hidden lg:block"
          sx={{ bgcolor: "var(--color-brand-background)", color: "#fff" }}
        >
          <Box
            className="container mx-auto py-3"
            display="flex"
            justifyContent="space-between"
            fontSize="0.875rem"
            alignItems="center"
          >
            <Stack direction="row" spacing={6} alignItems="center">
              <Stack direction="row" spacing={1} alignItems="center">
                <Truck size={16} color="#10b981" />
                <Typography>Free shipping on orders over $50</Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <Headphones size={16} color="#3b82f6" />
                <Typography>24/7 Customer Support</Typography>
              </Stack>
            </Stack>

            <Stack direction="row" spacing={5} alignItems="center">
              <Box
                component="a"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  color: "inherit",
                  textDecoration: "none",
                  "&:hover": { color: "emerald.main" },
                  cursor: "pointer",
                  fontSize: "0.875rem",
                }}
              >
                <Phone size={16} />
              </Box>
              <AppLink href="/track-order">
                <Box
                  sx={{
                    color: "inherit",
                    fontSize: "0.875rem",
                    cursor: "pointer",
                    "&:hover": { color: "blue.main" },
                    textDecoration: "none",
                  }}
                >
                  Track Order
                </Box>
              </AppLink>

              <Box
                component="a"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  color: "inherit",
                  fontSize: "0.875rem",
                  cursor: "pointer",
                  "&:hover": { color: "orange.main" },
                  textDecoration: "none",
                }}
              >
                <MapPin size={16} />
                Store Locator
              </Box>
            </Stack>
          </Box>
        </Box>

        {/* Main Nav */}
        <Box
          className={`bg-white transition-all ${isScrolled ? "py-2" : "py-4"}`}
          sx={{ py: isScrolled ? 1 : 2 }}
        >
          <Box
            className="container mx-auto"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            {/* Logo */}
            <Box onClick={() => setActiveMenu(null)}>
              <Link href="/">
                <Image
                  src={logo}
                  alt="Company Logo"
                  width={isScrolled ? 60 : 80}
                  height={isScrolled ? 40 : 50}
                  className="transition-all duration-300"
                  priority
                />
              </Link>
            </Box>

            {/* Desktop Nav */}
            <Box
              component="nav"
              sx={{
                display: { xs: "none", lg: "flex" },
                gap: 2,
                alignItems: "center",
              }}
            >
              <Box>
                <Button>
                  <AppLink
                    href="/"
                    render={(isActive) => (
                      <IconButton title="Home">
                        <HomeIcon color={isActive ? "#fe6731" : "black"} />
                      </IconButton>
                    )}
                  />
                </Button>
              </Box>
              {megaMenuData.map((item, idx) => (
                <Box
                  key={idx}
                  onClick={() => setActiveMenu(null)}
                  onMouseEnter={() => handleMouseEnter(idx)}
                  onMouseLeave={handleMouseLeave}
                  sx={{ position: "relative" }}
                >
                  <AppLink href={item?.link}>
                    <Button
                      endIcon={
                        <ChevronDown
                          size={16}
                          className={`transition-transform ${
                            activeMenu === idx ? "rotate-180" : ""
                          }`}
                        />
                      }
                      sx={{
                        textTransform: "none",
                        color: "inherit",
                        fontWeight: "medium",
                        px: 2,
                        py: 1,
                        "&:hover": {
                          color: "#fe6731",
                          backgroundColor: "transparent",
                        },
                      }}
                    >
                      {item?.MainCategoryName}
                    </Button>
                  </AppLink>
                </Box>
              ))}
            </Box>

            {/* Action Buttons */}
            <Stack direction="row" spacing={1.5} alignItems="center">
              {/* Desktop Search */}
              <Box
                sx={{
                  position: "relative",
                  display: { xs: "none", md: "block" },
                  width: 256,
                }}
              >
                <Search
                  size={16}
                  style={{
                    position: "absolute",
                    left: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#94a3b8",
                  }}
                />
                <InputBase
                  placeholder="Search products..."
                  sx={{
                    pl: "36px",
                    pr: 2,
                    py: 1,
                    borderRadius: 1,
                    bgcolor: "grey.50",
                    border: "1px solid",
                    borderColor: "grey.300",
                    width: "100%",
                    fontSize: "0.875rem",
                    "&:focus": {
                      outline: "none",
                      borderColor: "primary.main",
                      boxShadow: `0 0 0 2px ${theme?.palette?.primary?.light}`,
                    },
                  }}
                  inputProps={{ "aria-label": "search products" }}
                />
              </Box>

              {/* Mobile Search Toggle */}
              <IconButton
                onClick={() => setIsSearchOpen(true)}
                sx={{ display: { xs: "inline-flex", md: "none" } }}
                aria-label="Open search"
                size="large"
              >
                <Search size={20} width={"100%"} />
              </IconButton>

              {/* User / Wishlist / Cart Buttons */}
              <Link href={"/login"}>
                <IconButton aria-label="User" size="large">
                  <User size={20} />
                </IconButton>
              </Link>

              <AppLink href="/cart">
                <IconButton
                  aria-label="Wishlist"
                  size="large"
                  sx={{ position: "relative" }}
                >
                  <Heart size={20} />
                  <Box
                    component="span"
                    sx={{
                      position: "absolute",
                      top: -4,
                      right: -4,
                      bgcolor: "error.main",
                      color: "common.white",
                      fontSize: "0.625rem",
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    2
                  </Box>
                </IconButton>
              </AppLink>

              <AppLink href="/wishlist">
                <IconButton
                  aria-label="Cart"
                  size="large"
                  sx={{ position: "relative" }}
                >
                  <ShoppingCart size={20} />
                  <Box
                    component="span"
                    sx={{
                      position: "absolute",
                      top: -4,
                      right: -4,
                      bgcolor: "primary.main",
                      color: "common.white",
                      fontSize: "0.625rem",
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    3
                  </Box>
                </IconButton>
              </AppLink>

              {/* Mobile Menu Toggle */}
              <IconButton
                onClick={() => setIsMobileMenuOpen(true)}
                sx={{ display: { lg: "none" } }}
                aria-label="Open mobile menu"
                size="large"
              >
                <Menu size={24} />
              </IconButton>
            </Stack>
          </Box>
        </Box>

        {/* Mega Menu (Desktop only) */}
        {activeMenu !== null && (
          <Box
            component="nav"
            onMouseEnter={() => handleMouseEnter(activeMenu)}
            onMouseLeave={handleMouseLeave}
            sx={{
              position: "absolute",
              top: "100%",
              left: 0,
              width: "100vw",
              bgcolor: "background.paper",
              boxShadow: theme.shadows[5],
              zIndex: 40,
              borderTop: 1,
              borderColor: "divider",
              display: { xs: "none", lg: "block" },
            }}
          >
            <Box
              className="container mx-auto px-4"
              sx={{
                display: "flex",
                py: 6,
                maxWidth: "1280px",
                mx: "auto",
                gap: 4,
              }}
            >
              <Box sx={{ width: "75%", display: "flex", flexWrap: "wrap" }}>
                {megaMenuData[activeMenu].Category.map((cat, i) => (
                  <Box
                    onClick={() => setActiveMenu(null)}
                    key={i}
                    sx={{
                      width: { xs: "100%", sm: "50%", md: "33.3333%" },
                      pr: 2,
                      mb: 4,
                    }}
                  >
                    <AppLink href={cat?.link}>
                      <Typography
                        variant="subtitle1"
                        fontWeight="600"
                        mb={1.5}
                        sx={{
                          color: "#fe6731",
                          textDecoration: "none",
                          "&:hover": { color: "primary.main" },
                          display: "inline-block",
                          cursor: "pointer",
                        }}
                      >
                        {cat?.categoryName}
                      </Typography>
                    </AppLink>
                    <Box
                      component="ul"
                      sx={{ pl: 2, mt: 0, listStyle: "none" }}
                    >
                      {cat.subCategory.map((sub, j) => (
                        <Box
                          onClick={() => setActiveMenu(null)}
                          key={j}
                          component="li"
                          sx={{ mb: 0.5 }}
                        >
                          <AppLink href={sub?.link}>
                            <Box
                              sx={{
                                textDecoration: "none",
                                "&:hover": { color: "primary.main" },
                                display: "inline-block",
                                cursor: "pointer",
                              }}
                            >
                              {sub?.subCategoryName}
                            </Box>
                          </AppLink>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                ))}
              </Box>
              <Box sx={{ width: "25%" }}>
                {megaMenuData[activeMenu]?.featured && (
                  <Box
                    sx={{
                      borderRadius: 2,
                      p: 3,
                      textAlign: "center",
                      border: 1,
                      borderColor: "divider",
                      bgcolor: "grey.100",
                      background:
                        "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
                    }}
                  >
                    <Box className="w-3/5 m-auto">
                      <Box className="relative aspect-[3/4] w-full mb-2">
                        <Image
                          src={megaMenuData[activeMenu]?.featured?.image}
                          alt="Featured"
                          objectFit="cover"
                          fill
                        />
                      </Box>
                    </Box>
                    <Typography variant="h6" fontWeight="600" mb={1}>
                      {megaMenuData[activeMenu]?.featured.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      mb={2}
                      sx={{ maxWidth: 280, mx: "auto" }}
                    >
                      {megaMenuData[activeMenu]?.featured?.description}
                    </Typography>
                    <Box onClick={() => setActiveMenu(null)}>
                      <Link
                        href={megaMenuData[activeMenu]?.featured?.buttonLink}
                      >
                        <Button
                          className="btn-primary"
                          variant="contained"
                          size="medium"
                          component="a"
                        >
                          {megaMenuData[activeMenu]?.featured?.buttonText}
                        </Button>
                      </Link>
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        )}
      </Box>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <>
          {/* Overlay */}
          <Box
            onClick={() => setIsMobileMenuOpen(false)}
            sx={{
              position: "fixed",
              inset: 0,
              bgcolor: "rgba(0,0,0,0.5)",
              zIndex: 40,
            }}
          />

          {/* Drawer */}
          <Box
            sx={{
              position: "fixed",
              top: 0,
              right: 0,
              width: "70%",
              height: "100%",
              bgcolor: "background.paper",
              zIndex: 50,
              boxShadow: 5,
              p: 2,
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Image src={logo} alt="Logo" width={60} height={40} />
              <IconButton
                aria-label="Close mobile menu"
                onClick={() => setIsMobileMenuOpen(false)}
                size="large"
              >
                <X size={24} />
              </IconButton>
            </Box>
            <Divider />

            {/* Accordion Menu */}
            <Box mt={2}>
              {megaMenuData.map((mainCat, idx) => (
                <Accordion
                  key={idx}
                  disableGutters
                  elevation={0}
                  square
                  expanded={expandedAccordion === idx}
                  onChange={() =>
                    setExpandedAccordion((prev) => (prev === idx ? false : idx))
                  }
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel-content-${idx}`}
                    id={`panel-header-${idx}`}
                  >
                    <Box onClick={() => setIsMobileMenuOpen(false)}>
                      <AppLink href={mainCat?.link}>
                        <Typography variant="subtitle1" fontWeight="medium">
                          {mainCat?.MainCategoryName}
                        </Typography>
                      </AppLink>
                    </Box>
                    <Link href={mainCat?.link}></Link>
                  </AccordionSummary>
                  <AccordionDetails sx={{ pl: 2 }}>
                    {mainCat?.Category?.map((cat, i) => (
                      <Box
                        onClick={() => setIsMobileMenuOpen(false)}
                        key={i}
                        mb={2}
                      >
                        <AppLink href={cat?.link}>
                          <Typography
                            variant="subtitle2"
                            fontWeight="bold"
                            mb={0.5}
                          >
                            {cat?.categoryName}
                          </Typography>
                        </AppLink>
                        <Box
                          component="ul"
                          sx={{ pl: 2, mt: 0, listStyle: "none" }}
                        >
                          {cat?.subCategory?.map((sub, j) => (
                            <Box
                              onClick={() => setIsMobileMenuOpen(false)}
                              key={j}
                              component="li"
                              mb={0.5}
                            >
                              <AppLink href={sub?.link}>
                                <Box onClick={() => setIsMobileMenuOpen(false)}>
                                  {sub?.subCategoryName}
                                </Box>
                              </AppLink>
                            </Box>
                          ))}
                        </Box>
                      </Box>
                    ))}
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          </Box>
        </>
      )}

      {/* Mobile Search Dialog */}
      <Dialog
        open={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogContent>
          <Box
            display="flex"
            alignItems="center"
            border={1}
            borderColor="grey.300"
            borderRadius={1}
            px={2}
            py={1}
          >
            <Search size={24} color="#94a3b8" />
            <InputBase
              placeholder="Search products..."
              fullWidth
              autoFocus
              inputProps={{ "aria-label": "search products" }}
              sx={{ ml: 1 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsSearchOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
