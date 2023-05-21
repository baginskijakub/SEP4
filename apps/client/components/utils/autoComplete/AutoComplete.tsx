import React, { useEffect } from 'react'
import { Autocomplete, TextField } from '@mui/material'
import Paper from '@mui/material/Paper';

interface Props {
  options: string[]
  onChange: (value: string) => void
}

export const AutoComplete: React.FC<Props> = ({ options, onChange }) => {
  const [value, setValue] = React.useState<string | null>(options[0])
  const [inputValue, setInputValue] = React.useState('')

  useEffect(() => {
    onChange(value)
  }, [value])

  return (
    <Autocomplete
      value={value}
      onChange={(event: any, newValue: string | null) => {
        setValue(newValue)
      }}
      size="small"
      disableClearable={true}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue)
      }}
      id="controllable-states-demo"
      options={options}
      sx={{
        width: 150,
        fontSize: '10px',
        '& .MuiOutlinedInput-root': {
          backgroundColor: '#8ABCB3',
          borderRadius: '6px',
          fontSize: '12px',
          color: '#fff',
        },
        '& .MuiAutocomplete-popper': {
          backgroundColor: '#8ABCB3',
        }
      }}
      PaperComponent={({ children }) => (
        <Paper
          elevation={0}
          sx={{
            backgroundColor: '#8ABCB3',
            borderRadius: '6px',
            border: '1px solid #528E83',
            fontFamily: 'Arial',
            color: '#fff',
          }}
        >
          {children}
        </Paper>
      )}
      renderInput={(params) => <TextField {...params} />}
    />
  )
}
