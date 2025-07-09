"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  ShoppingCart,
  Heart,
  User,
  Menu,
  X,
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
  Button,
  Box,
  Stack,
  useTheme,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AppLink from "@/utils/AppLink";
import TopBar from "./TopBar";

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isClosingMenu, setIsClosingMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const theme = useTheme();

  const handleMouseEnter = (index: number) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(index);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveMenu(null), 100);
  };

  const handleOpenMobileMenu = () => {
    setIsClosingMenu(false);
    setIsMobileMenuOpen(true);
  };

  const handleCloseMobileMenu = () => {
    setIsClosingMenu(true);
    setTimeout(() => {
      setIsMobileMenuOpen(false);
      setIsClosingMenu(false);
    }, 400);
  };

  useEffect(() => {
    setIsScrolled(window.scrollY > 0);

    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "auto";
  }, [isMobileMenuOpen]);

  const [expandedAccordion, setExpandedAccordion] = useState<number | false>(
    false
  );

  return (
    <Box className="relative">
      <Box
        component="header"
        className={`sticky top-0 z-50 transition-shadow duration-300 ${
          isScrolled ? "shadow-md" : "shadow-sm"
        }`}
        sx={{
          boxShadow: isScrolled ? theme.shadows[4] : theme.shadows[1],
          background: "linear-gradient(135deg, #fefce8 0%, #ffe4e6 100%)",
        }}
      >
        {/* Top Bar */}
        <TopBar />

        {/* Main Nav */}
        <Box
          sx={{
            py: isScrolled ? 1 : 2,
            transition: "padding 0.3s ease",
          }}
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
              {/* User / Wishlist / Cart Buttons */}
              <Link href={"/login"}>
                <IconButton aria-label="User" size="large">
                  <User size={20} />
                </IconButton>
              </Link>

              <AppLink href="/wishlist">
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

              <AppLink href="/cart">
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
                onClick={handleOpenMobileMenu}
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
      {(isMobileMenuOpen || isClosingMenu) && (
        <>
          {/* Overlay */}
          <Box
            onClick={handleCloseMobileMenu}
            sx={{
              position: "fixed",
              inset: 0,
              bgcolor: "rgba(0,0,0,0.5)",
              zIndex: 40,
              opacity: isClosingMenu ? 0 : 1,
              transition: "opacity 300ms ease",
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
              transform: isClosingMenu ? "translateX(100%)" : "translateX(0)",
              transition: "transform 400ms ease",
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
                onClick={handleCloseMobileMenu}
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
                    <Box onClick={handleCloseMobileMenu}>
                      <AppLink href={mainCat?.link}>
                        <Typography variant="subtitle1" fontWeight="medium">
                          {mainCat?.MainCategoryName}
                        </Typography>
                      </AppLink>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails sx={{ pl: 2 }}>
                    {mainCat?.Category?.map((cat, i) => (
                      <Box onClick={handleCloseMobileMenu} key={i} mb={2}>
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
                              onClick={handleCloseMobileMenu}
                              key={j}
                              component="li"
                              mb={0.5}
                            >
                              <AppLink href={sub?.link}>
                                <Box onClick={handleCloseMobileMenu}>
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
    </Box>
  );
}
