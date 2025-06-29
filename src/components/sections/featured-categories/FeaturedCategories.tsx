"use client";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { featuredCategories } from "./featuredCategoriesData";

export default function FeaturedCategories() {
  return (
    <div className="container mx-auto pt-10">
      <Box sx={{ my: 6, px: 2 }}>
        <Typography variant="h5" fontWeight="bold" mb={3}>
          Featured Categories
        </Typography>
        <Grid container spacing={3}>
          {featuredCategories.map((category) => (
            <Grid size={{ xs: 12, md: 4 }} key={category.id}>
              <Link href={category.link} passHref>
                <Card sx={{ borderRadius: 3, overflow: "hidden" }}>
                  <CardActionArea>
                    <CardMedia>
                      <Box
                        sx={{
                          position: "relative",
                          width: "100%",
                          height: 180,
                        }}
                      >
                        <Image
                          src={category.image}
                          alt={category.title}
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      </Box>
                    </CardMedia>
                    <CardContent>
                      <Typography variant="h6" align="center">
                        {category.title}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}
