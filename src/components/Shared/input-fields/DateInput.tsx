import { Controller, useFormContext } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

type DateInputProps = {
  name: string;
  label?: string;
  required?: boolean;
  fullWidth?: boolean;
};

export const DateInput = ({
  name,
  label,
  required = false,
  fullWidth = true,
}: DateInputProps) => {
  const { control } = useFormContext();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        name={name}
        control={control}
        rules={required ? { required: "This field is required" } : undefined}
        render={({ field, fieldState }: { field: { onChange: (date: dayjs.Dayjs | null) => void; value: string | null }, fieldState: { error?: { message?: string } } }) => (
          <DatePicker
            label={label}
            value={field.value ? dayjs(field.value) : null}
            onChange={(date: dayjs.Dayjs | null) => {
              field.onChange(date ? date.toISOString() : null);
            }}
            slotProps={{
              textField: {
                fullWidth,
                error: !!fieldState.error,
                helperText: fieldState.error?.message,
              },
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
};
