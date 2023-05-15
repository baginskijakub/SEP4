import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';
import { useEffect } from 'react';

interface Props{
  onChange: (value: unknown) => void
}

export const DateSelector: React.FC<Props> = ({onChange}) =>
{

  const [value, setValue] = React.useState<Dayjs | null>();

  useEffect(() => {

    onChange(value)

  }, [value])

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
      value={value}
      sx={{width: 200 }}
      onChange={(newValue) => setValue(newValue)}/>
    </LocalizationProvider>
  );
}