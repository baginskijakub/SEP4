import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect } from 'react';

interface Props{
  onChange: (value: unknown) => void
}

export const DateSelector: React.FC<Props> = ({onChange}) =>
{

  const [value, setValue] = React.useState<Dayjs | null>(dayjs());

  useEffect(() => {

    onChange(value.date() + '/' + (value.month() + 1) + '/' + value.year())

  }, [value])

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
      value={value}
      format={'DD/MM/YYYY'}
      onChange={(newValue) => setValue(newValue)}/>
    </LocalizationProvider>
  );
}