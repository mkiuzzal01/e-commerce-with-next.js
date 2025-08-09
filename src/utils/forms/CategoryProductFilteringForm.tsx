/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAllSubCategoryQuery } from "@/redux/features/category/category.Api";
import { useGetAllVariantsQuery } from "@/redux/features/variant/variant.Api";
import { TOptions } from "@/Types/ProductType";
import { Search } from "@mui/icons-material";
import {
  Box,
  Container,
  Grid,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  Slider,
  Stack,
  Typography,
} from "@mui/material";
import { ChevronDown } from "lucide-react";
import { useMemo } from "react";

type CategoryProductFilteringFormProps = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  size: string;
  setSize: React.Dispatch<React.SetStateAction<string>>;
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
  priceRange: number[];
  setPriceRange: React.Dispatch<React.SetStateAction<number[]>>;
};

export default function CategoryProductFilteringForm({
  search,
  setSearch,
  category,
  setCategory,
  size,
  setSize,
  color,
  setColor,
  priceRange,
  setPriceRange,
}: CategoryProductFilteringFormProps) {
  const { data: subCategoryData } = useAllSubCategoryQuery({});
  const { data: variantData } = useGetAllVariantsQuery({});

  const subCategories = useMemo(
    () =>
      subCategoryData?.data?.result?.map((subCat: any) => ({
        label: subCat.name,
        value: subCat._id,
      })) || [],
    [subCategoryData]
  );

  const sizes = useMemo(
    () =>
      variantData?.data?.result?.map((variant: any) => ({
        label: variant.name,
        value: variant.name,
      })) || [],
    [variantData]
  );

  const colors = useMemo(() => {
    const allColors: { label: string; value: string }[] = [];
    variantData?.data?.result?.forEach((variant: any) => {
      variant.attributes?.forEach((attr: any) => {
        if (
          attr.value &&
          !allColors.some(
            (c) => c.value.toLowerCase() === attr.value.toLowerCase()
          )
        ) {
          allColors.push({ label: attr.value, value: attr.value });
        }
      });
    });
    return allColors;
  }, [variantData]);

  const filterFields = [
    {
      label: "Category",
      value: category,
      options: subCategories,
      field: "category",
      setter: setCategory,
    },
    {
      label: "Size",
      value: size,
      options: sizes,
      field: "size",
      setter: setSize,
    },
    {
      label: "Color",
      value: color,
      options: colors,
      field: "color",
      setter: setColor,
    },
  ];

  return (
    <Box sx={{ py: 4 }}>
      <Container
        sx={{
          boxShadow: 2,
          p: 4,
          borderRadius: 5,
          mb: 4,
          backdropFilter: "blur(10px)",
          background: "rgba(255,255,255,0.8)",
        }}
      >
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
        <OutlinedInput
          placeholder="What are you looking for today?"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
          startAdornment={
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          }
          sx={{ mb: 4, borderRadius: 3, background: "#ffffffb3" }}
        />

        {/* Dropdown Filters */}
        <Grid container spacing={3} mb={4}>
          {filterFields.map(({ label, value, options, setter, field }) => (
            <Grid size={{ xs: 12, md: 4 }} key={field}>
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
                onChange={(e) => setter(e.target.value)}
                displayEmpty
                sx={{ borderRadius: 2, background: "#ffffffb3" }}
                IconComponent={ChevronDown}
              >
                <MenuItem value="">All {label}s</MenuItem>
                {options.map((option: TOptions) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          ))}
        </Grid>

        {/* Price Range */}
        <Box mb={4}>
          <Typography variant="body2" fontWeight={600} gutterBottom>
            Price Range: ৳{priceRange[0]} - ৳{priceRange[1]}
          </Typography>
          <Slider
            value={priceRange}
            onChange={(e, newValue) => setPriceRange(newValue as number[])}
            min={0}
            max={10000}
            step={10}
            valueLabelDisplay="auto"
            sx={{ color: "#f97316" }}
          />
        </Box>
      </Container>
    </Box>
  );
}
