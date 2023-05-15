import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function DateSelector()
{
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker/>
    </LocalizationProvider>
  );
}