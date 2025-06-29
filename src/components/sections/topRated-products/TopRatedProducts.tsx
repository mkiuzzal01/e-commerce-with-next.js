"use client";
import {
  Box,
  Rating,
  Typography,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import Image from "next/image";
import { useState } from "react";

type Product = {
  _id: string;
  name: string;
  image: string;
  price: number;
  rating: number;
  reviewCount: number;
  slug: string;
};

const TopRatedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  return (
    <Box className="py-10 px-4 md:px-16 bg-gray-50">
      <Typography variant="h4" className="mb-6 font-bold text-center">
        🌟 Top Rated / Best Sellers
      </Typography>

      <Box className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card key={product._id} className="hover:shadow-xl transition-shadow">
            <Image
              src={product.image}
              alt={product.name}
              className="h-52 w-full object-cover rounded-t"
            />
            <CardContent>
              <Typography
                variant="h6"
                className="font-semibold mb-1 line-clamp-1"
              >
                {product.name}
              </Typography>

              <Box className="flex items-center gap-1 mb-1">
                <Rating
                  value={product.rating}
                  precision={0.5}
                  readOnly
                  size="small"
                />
                <Typography variant="body2" color="textSecondary">
                  ({product.reviewCount})
                </Typography>
              </Box>

              <Typography
                variant="subtitle1"
                className="text-black font-bold mb-2"
              >
                ${product.price.toFixed(2)}
              </Typography>

              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => console.log("Add to cart", product._id)}
              >
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default TopRatedProducts;
