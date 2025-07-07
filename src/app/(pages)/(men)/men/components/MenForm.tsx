"use client";
import React, { useState } from "react";
import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography,
  Paper,
} from "@mui/material";
import { Search } from "lucide-react";
import ReusableForm from "@/components/Shared/ReusableTable";
import { FieldValues } from "react-hook-form";
import RangeInput from "@/components/Shared/input-fields/RangeInput";
import { SelectInput } from "@/components/Shared/input-fields/SelectInput";

export default function MenForm() {
  const [search, setSearch] = useState<string>("");

  const handleSubmit = (data: FieldValues) => {
    console.log({ ...data, search });
  };

  return (
    <Box className="py-5">
      <Paper
        elevation={4}
        className="lg:p-10 p-8 rounded-2xl bg-white shadow-lg border border-gray-100"
      >
        <Typography variant="h5" className="pb-4" fontWeight={700}>
          Filter Men Products
        </Typography>

        <ReusableForm onSubmit={handleSubmit}>
          <Grid container spacing={4}>
            {/* Category */}
            <Grid size={{ xs: 12, md: 4 }} className="paragraph">
              <SelectInput
                label="Category"
                name="category"
                options={["T-Shirts", "Shirts", "Jeans", "Shoes"]}
              />
            </Grid>

            {/* Price Range */}
            <Grid size={{ xs: 12, md: 4 }} className="paragraph">
              <RangeInput />
            </Grid>

            {/* Search */}
            <Grid size={{ xs: 12, md: 4 }} className="paragraph">
              <OutlinedInput
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                fullWidth
                placeholder="Search men's items..."
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton type="submit" edge="end">
                      <Search />
                    </IconButton>
                  </InputAdornment>
                }
                sx={{
                  borderRadius: 2,
                  bgcolor: "#f9fafb",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "var(--primary-color)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "var(--primary-color)",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "var(--primary-color)",
                    boxShadow: "0 0 0 2px var(--primary-color)",
                  },
                }}
              />
            </Grid>
          </Grid>
        </ReusableForm>
      </Paper>
    </Box>
  );
}
