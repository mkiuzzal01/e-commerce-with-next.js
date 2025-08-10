"use client";
import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
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
import logo from "../../../public/assets/logo/logo.png";
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
import { useAllMainCategoryQuery } from "@/redux/features/category/category.Api";
import Loader from "@/utils/Loader";
import { TNavLink } from "./TNavbar";
import { useAppSelector } from "@/redux/hooks";
import { TCartItem, TWishlistItem } from "@/Types/ProductType";

export default function Navbar() {
  const wishlistItems: TWishlistItem[] = useAppSelector((state) => state?.wishlist?.items);
  const cartItems: TCartItem[] = useAppSelector((state) => state?.cart?.items);
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isClosingMenu, setIsClosingMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const theme = useTheme();
  const { data, isLoading } = useAllMainCategoryQuery({});
  const navLinks: TNavLink[] = data?.data?.result;

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
    document.body.style.overflow = "hidden";
  };

  const handleCloseMobileMenu = () => {
    setIsClosingMenu(true);
    setTimeout(() => {
      setIsMobileMenuOpen(false);
      setIsClosingMenu(false);
      document.body.style.overflow = "auto";
    }, 400);
  };

  useEffect(() => {
    setIsMounted(true);
    setIsScrolled(window.scrollY > 0);
  }, []);

  useLayoutEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const [expandedAccordion, setExpandedAccordion] = useState<number | false>(
    false
  );

  if (isLoading) return <Loader />;
  if (!navLinks) return null;

  return (
    <Box className="relative">
      <Box
        component="header"
        className="sticky top-0 z-50"
        sx={{
          boxShadow: isMounted
            ? isScrolled
              ? theme.shadows[4]
              : theme.shadows[1]
            : theme.shadows[1],
          background: "linear-gradient(135deg, #fefce8 0%, #ffe4e6 100%)",
          transition: "box-shadow 0.3s ease",
        }}
      >
        <TopBar />

        <Box
          sx={{
            py: isMounted && isScrolled ? 1 : 2,
            transition: "padding 0.3s ease",
          }}
        >
          <Box
            className="container mx-auto px-4"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box
              onClick={() => setActiveMenu(null)}
              sx={{
                width: 80,
                height: 50,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Link href="/" passHref>
                <Image
                  src={logo}
                  alt="Company Logo"
                  width={isMounted && isScrolled ? 60 : 80}
                  height={isMounted && isScrolled ? 40 : 50}
                  style={{
                    transition: "all 0.3s ease",
                    objectFit: "contain",
                  }}
                  priority
                />
              </Link>
            </Box>

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
              {navLinks.map((item, idx) => (
                <Box
                  key={idx}
                  onClick={() => setActiveMenu(null)}
                  onMouseEnter={() => handleMouseEnter(idx)}
                  onMouseLeave={handleMouseLeave}
                  sx={{ position: "relative" }}
                >
                  <AppLink href={`/${item?.slug}`}>
                    <Button
                      endIcon={
                        <ChevronDown
                          size={16}
                          style={{
                            transition: "transform 0.2s ease",
                            transform:
                              activeMenu === idx
                                ? "rotate(180deg)"
                                : "rotate(0)",
                          }}
                        />
                      }
                      sx={{
                        color: "inherit",
                        fontWeight: "medium",
                        px: 2,
                        py: 1,
                        "&:hover": {
                          color: "#fe6731",
                          backgroundColor: "transparent",
                        },
                        textTransform: "uppercase",
                      }}
                    >
                      {item?.name}
                    </Button>
                  </AppLink>
                </Box>
              ))}
            </Box>

            <Stack direction="row" spacing={1.5} alignItems="center">
              <Link href="/login" passHref>
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
                    {wishlistItems?.length}
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
                    {cartItems?.length}
                  </Box>
                </IconButton>
              </AppLink>

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

        {activeMenu !== null && navLinks[activeMenu] && (
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
                {navLinks[activeMenu]?.category?.map((cat, i) => (
                  <Box
                    onClick={() => setActiveMenu(null)}
                    key={i}
                    sx={{
                      width: { xs: "100%", sm: "50%", md: "33.3333%" },
                      pr: 2,
                      mb: 4,
                    }}
                  >
                    <AppLink
                      href={`/${navLinks[activeMenu]?.slug}/category/${cat?.slug}`}
                    >
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
                        {cat?.name?.charAt(0).toUpperCase() +
                          cat?.name?.slice(1)}
                      </Typography>
                    </AppLink>

                    <Box
                      component="ul"
                      sx={{ pl: 2, mt: 0, listStyle: "none" }}
                    >
                      {navLinks[activeMenu]?.subCategory?.map((sub, j) => (
                        <Box
                          onClick={() => setActiveMenu(null)}
                          key={j}
                          component="li"
                          sx={{ mb: 0.5 }}
                        >
                          <AppLink
                            href={`/${navLinks[activeMenu]?.slug}/category/subCategory/${sub?.slug}`}
                          >
                            <Box
                              sx={{
                                textDecoration: "none",
                                "&:hover": { color: "primary.main" },
                                display: "inline-block",
                                cursor: "pointer",
                              }}
                            >
                              {sub?.name?.charAt(0).toUpperCase() +
                                sub?.name?.slice(1)}
                            </Box>
                          </AppLink>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                ))}
              </Box>
              <Box sx={{ width: "25%" }}>
                {navLinks[activeMenu]?.image && (
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
                          src={navLinks[activeMenu]?.image?.url}
                          alt="Featured"
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      </Box>
                    </Box>
                    <Typography variant="h6" fontWeight="600" mb={1}>
                      {navLinks[activeMenu]?.name}
                    </Typography>
                    <Box onClick={() => setActiveMenu(null)}>
                      <Link href={`/${navLinks[activeMenu]?.slug}`} passHref>
                        <Button
                          variant="contained"
                          size="medium"
                          component="a"
                          sx={{
                            backgroundColor: "#fe6731",
                            "&:hover": {
                              backgroundColor: "#e55d2d",
                            },
                            color: "#fff",
                          }}
                        >
                          See All
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

      {(isMobileMenuOpen || isClosingMenu) && (
        <>
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

            <Box mt={2}>
              {navLinks.map((mainCat, idx) => (
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
                      <AppLink href={`/${mainCat?.slug}`}>
                        <Typography variant="subtitle1" fontWeight="medium">
                          {mainCat?.name}
                        </Typography>
                      </AppLink>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails sx={{ pl: 2 }}>
                    {mainCat?.category?.map((cat, i) => (
                      <Box onClick={handleCloseMobileMenu} key={i} mb={2}>
                        <AppLink href={`/${mainCat.slug}/category/${cat.slug}`}>
                          <Typography
                            variant="subtitle2"
                            fontWeight="bold"
                            mb={0.5}
                          >
                            {cat?.name}
                          </Typography>
                        </AppLink>
                        <Box
                          component="ul"
                          sx={{ pl: 2, mt: 0, listStyle: "none" }}
                        >
                          {mainCat?.subCategory?.map((sub, j) => (
                            <Box
                              onClick={handleCloseMobileMenu}
                              key={j}
                              component="li"
                              mb={0.5}
                            >
                              <AppLink
                                href={`/${mainCat?.slug}/category/subCategory/${sub?.slug}`}
                              >
                                <Box onClick={handleCloseMobileMenu}>
                                  {sub?.name}
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
