import React from "react";
import { Slider as MUISlider } from "@mui/material";

interface Props {
  maxValue: number;
  minValue: number;
  onChange: (value: number) => void;
  defaultValue: number;
  unit: string;
  ariaLabel: string;
}
export const Slider:React.FC<Props> = ({maxValue, minValue, defaultValue, unit, onChange, ariaLabel}) => {

  return (
    <MUISlider
      aria-label={ariaLabel}
      min={minValue}
      max={maxValue}
      valueLabelFormat={(value) => `${value}${unit}`}
      valueLabelDisplay="auto"
      getAriaValueText={(value) => `${value}${unit}`}
      step={unit === 'ppm' ? 0.01 : 0.25}
      defaultValue={defaultValue}
      sx={{
        color: '#528E83'
      }}
      onChange={(e, value) => onChange(value as number)}
    >

    </MUISlider>
  );
};
