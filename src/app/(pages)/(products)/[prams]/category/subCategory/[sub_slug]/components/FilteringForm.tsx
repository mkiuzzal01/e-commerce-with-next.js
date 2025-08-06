/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  InputAdornment,
  OutlinedInput,
  MenuItem,
  Select,
  Typography,
  Slider,
  Chip,
  Paper,
  Stack,
} from "@mui/material";
import { Search, Filter, X, ChevronDown } from "lucide-react";

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
const colors = ["Black", "White", "Blue", "Red", "Gray"];

export default function FilteringFrom() {
  const [formData, setFormData] = useState({
    category: "",
    brand: "",
    priceRange: [0, 1000],
    search: "",
    size: "",
    color: "",
  });

  const handleInputChange = (field: any, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleClear = () => {
    setFormData({
      category: "",
      brand: "",
      priceRange: [0, 1000],
      search: "",
      size: "",
      color: "",
    });
  };

  const filterFields = [
    { label: "Size", value: formData.size, options: sizes, field: "size" },
    { label: "Color", value: formData.color, options: colors, field: "color" },
  ];

  const activeFilters = Object.entries({
    category: formData.category,
    brand: formData.brand,
    size: formData.size,
    color: formData.color,
    search: formData.search,
  });

  return (
    <Box sx={{ py: 4 }}>
      <Container>
        {/* Header */}
        <Box textAlign="center" mb={6}>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Typography
              variant="h3"
              fontWeight="bold"
              sx={{
                background: "linear-gradient(to right, #f97316, #ef4444)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Export corner
            </Typography>
          </Stack>
          <Typography variant="h6" mt={2}>
            Discover amazing products with our smart filtering system
          </Typography>
        </Box>

        {/* Filter Panel */}
        <Paper
          elevation={4}
          sx={{
            p: 4,
            borderRadius: 5,
            mb: 4,
            backdropFilter: "blur(10px)",
            background: "rgba(255,255,255,0.8)",
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <Filter color="#f97316" />
              <Typography variant="h5" fontWeight="bold">
                Filter Products
              </Typography>
            </Stack>
          </Box>

          {/* Search */}
          <OutlinedInput
            placeholder="What are you looking for today?"
            value={formData.search}
            onChange={(e) => handleInputChange("search", e.target.value)}
            fullWidth
            startAdornment={
              <InputAdornment position="start">
                <Search color="#9ca3af" />
              </InputAdornment>
            }
            sx={{ mb: 4, borderRadius: 3, background: "#ffffffb3" }}
          />

          {/* Dropdown Filters */}
          <Grid container spacing={3} mb={4}>
            {filterFields.map(({ label, value, options, field }) => (
              <Grid size={{ xs: 12, md: 6 }} key={field}>
                <Typography
                  variant="body2"
                  fontWeight={600}
                  mb={1}
                  color="text.secondary"
                >
                  {label}
                </Typography>
                <Select
                  fullWidth
                  value={value}
                  onChange={(e) => handleInputChange(field, e.target.value)}
                  displayEmpty
                  sx={{ borderRadius: 2, background: "#ffffffb3" }}
                  IconComponent={ChevronDown}
                >
                  <MenuItem value="">All {label}s</MenuItem>
                  {options.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            ))}
          </Grid>

          {/* Price Range */}
          <Box mb={4}>
            <Typography variant="body2" fontWeight={600} gutterBottom>
              Price Range: ${formData.priceRange[0]} - ${formData.priceRange[1]}
            </Typography>
            <Slider
              value={formData.priceRange}
              onChange={(e, newValue) =>
                handleInputChange("priceRange", newValue)
              }
              min={0}
              max={1000}
              step={10}
              valueLabelDisplay="auto"
              sx={{ color: "#f97316" }}
            />
          </Box>

          {/* Active Filters */}
          {activeFilters.some(([val]) => val) && (
            <Box>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Active Filters:
              </Typography>
              <Stack direction="row" flexWrap="wrap" gap={1}>
                {activeFilters.map(([key, val]) =>
                  val ? (
                    <Chip
                      key={key}
                      label={`${
                        key.charAt(0).toUpperCase() + key.slice(1)
                      }: ${val}`}
                      onDelete={() => handleInputChange(key, "")}
                      sx={{
                        bgcolor: "#fef3c7",
                        color: "#b45309",
                        fontWeight: 500,
                      }}
                      deleteIcon={<X size={16} />}
                    />
                  ) : null
                )}
              </Stack>
            </Box>
          )}
        </Paper>

        {/* Action Buttons */}
        <Box textAlign="center">
          <Button
            onClick={handleClear}
            variant="outlined"
            color="warning"
            sx={{ borderRadius: 3, mr: 2 }}
          >
            Clear Filters
          </Button>
          <Button
            onClick={() => console.log(formData)}
            variant="contained"
            color="warning"
            sx={{ borderRadius: 3 }}
          >
            Apply Filters
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
