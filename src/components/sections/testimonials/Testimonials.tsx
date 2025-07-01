"use client";
import { useRef } from "react";
import { SwiperSlide } from "swiper/react";
import ReusableCarousel, {
  CarouselRef,
} from "@/components/Shared/ReusableCarousel";
import SectionHeader from "@/components/Shared/SectionHeader";

import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Stack,
  IconButton,
} from "@mui/material";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import { testimonialsData } from "./TestimonialsData";
import { Zap } from "lucide-react";

const Testimonials = () => {
  const carouselRef = useRef<CarouselRef>(null);

  return (
    <Box
      sx={{
        background: "#dddddd",
        py: 4,
      }}
    >
      <Box className="container mx-auto ">
        <SectionHeader
          title="What Our Clients Say"
          subTitle="Testimonials"
          description="We believe the best way to understand the value of our services is through the voices of those who have experienced it firsthand."
          icon={<Zap className="w-6 h-6 text-white" />}
          alignment="center"
        />

        {/* Testimonials Carousel */}
        <Box mt={8}>
          <ReusableCarousel
            ref={carouselRef}
            autoplay={true}
            pagination={false}
            navigation={false}
            loop
            effect="coverflow"
            centeredSlides
            slidesPerView="auto"
            breakpoints={{
              320: { slidesPerView: 1 },
              768: { slidesPerView: 1 },
              1024: { slidesPerView: 3 },
            }}
          >
            {testimonialsData.map((item, index) => (
              <SwiperSlide key={index}>
                <Card
                  elevation={3}
                  sx={{
                    p: 3,
                    mx: "auto",
                    height: "100%",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    borderRadius: 3,
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="body1"
                      sx={{
                        fontStyle: "italic",
                        color: "text.secondary",
                        mb: 3,
                      }}
                    >
                      “{item.testimonial}”
                    </Typography>

                    <Stack
                      direction="row"
                      spacing={2}
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Avatar src={item.imageUrl} alt={item.name} />
                      <Box textAlign="left">
                        <Typography variant="subtitle1" fontWeight="bold">
                          {item.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {item.role}
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </SwiperSlide>
            ))}
          </ReusableCarousel>

          {/* Pagination Buttons */}
          <Stack direction="row" spacing={2} justifyContent="center" mt={4}>
            <IconButton
              onClick={() => carouselRef.current?.slidePrev()}
              sx={{ bgcolor: "grey.200", "&:hover": { bgcolor: "grey.300" } }}
            >
              <ArrowBackIosNew fontSize="small" />
            </IconButton>
            <IconButton
              onClick={() => carouselRef.current?.slideNext()}
              sx={{ bgcolor: "grey.200", "&:hover": { bgcolor: "grey.300" } }}
            >
              <ArrowForwardIos fontSize="small" />
            </IconButton>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default Testimonials;
