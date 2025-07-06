"use client";
import Image from "next/image";
// import { useCallback } from "react";
import { SwiperSlide } from "swiper/react";
import ReusableCarousel from "../Shared/ReusableCarousel";
import { bannerData,  } from "./BannerData";
import { Box, Container, Grid, Typography } from "@mui/material";

export default function Banner() {
  // const handleButtonClick = useCallback((item: BannerItem) => {
  //   console.log(`Button clicked for: ${item.title}`);
  // }, []);

  return (
    <Box component="section" className="relative third-color overflow-hidden">
      <Box className="relative z-10">
        <ReusableCarousel
          autoplay
          pagination
          pauseOnMouseEnter={false}
          autoplayDelay={2000}
          speed={1000}
          loop
        >
          {bannerData?.map((item, index) => (
            <SwiperSlide key={item.id}>
              <Box className="min-h-[500px] md:min-h-[600px] lg:min-h-[790px] flex items-center">
                <Container className="py-12 lg:py-16">
                  <Grid
                    container
                    spacing={4}
                    alignItems="center"
                    className="!items-center"
                  >
                    {/* Text */}
                    <Grid
                      size={{
                        xs: 12,
                        md: 7,
                      }}
                      sx={{ textAlign: { xs: "center", md: "left" } }}
                    >
                      <Box className="flex flex-col gap-6">
                        {item.offer && (
                          <Box className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-sm border border-amber-500/30 rounded-full px-6 py-3 text-sm font-semibold text-amber-400 shadow-lg">
                            <span className="relative flex h-2.5 w-2.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-400" />
                            </span>
                            {item.offer}
                          </Box>
                        )}

                        {item.subtitle && (
                          <Typography
                            className="text-xs sm:text-sm font-bold tracking-[0.2em] text-amber-400 uppercase opacity-90"
                            component="div"
                          >
                            {item.subtitle}
                          </Typography>
                        )}

                        <h1 className="heading">
                          <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                            {item.title}
                          </span>
                        </h1>

                        <p className="paragraph max-w-2xl mx-auto md:mx-0 opacity-90">
                          {item.description}
                        </p>

                        <Box className="pt-4">
                          <button
                            // onClick={() => handleButtonClick(item)}
                            className="btn-primary group relative inline-flex items-center gap-3 px-8 py-4 sm:px-10 sm:py-5 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/25 focus:outline-none focus:ring-4 focus:ring-amber-500/50"
                          >
                            <span className="text-base sm:text-lg">
                              {item.buttonLabel}
                            </span>
                          </button>
                        </Box>
                      </Box>
                    </Grid>

                    {/* Image */}
                    <Grid
                      size={{
                        xs: 12,
                        md: 5,
                      }}
                      sx={{
                        display: "flex",
                        justifyContent: { xs: "center", md: "flex-end" },
                      }}
                    >
                      <Box className="relative w-full max-w-xs sm:max-w-sm lg:max-w-lg group">
                        {/* BG Blur Effects */}
                        <Box className="absolute inset-0 bg-gradient-to-br from-amber-500/20 via-orange-500/10 to-transparent rounded-full blur-3xl transform -rotate-6" />
                        <Box className="absolute top-1/2 left-1/2 w-32 h-32 bg-gradient-to-r from-amber-400/30 to-orange-500/30 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2" />

                        {/* Image Container */}
                        <Box className="relative aspect-[3/4] transition-all duration-700 group-hover:scale-105 group-hover:rotate-1">
                          <Box className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl backdrop-blur-sm border border-white/20 shadow-2xl" />
                          <Box className="relative h-full rounded-3xl overflow-hidden">
                            <Image
                              src={item.image}
                              alt={item.title}
                              priority={index === 0}
                              fill
                              className="object-contain p-4 transition-transform duration-500 hover:scale-110"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                            />
                          </Box>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Container>
              </Box>
            </SwiperSlide>
          ))}
        </ReusableCarousel>
      </Box>
    </Box>
  );
}
