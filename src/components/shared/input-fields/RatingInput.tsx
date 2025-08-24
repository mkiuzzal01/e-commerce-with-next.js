import { Rating } from "@mui/material";
import React from "react";

type Props = {
  value: number;
  setValue: (value: number | null) => void;
};

export default function RatingInput({ value, setValue }: Props) {
  return (
    <Rating
      name="simple-controlled"
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
    />
  );
}
