import React, { useEffect } from 'react'
import { Autocomplete, TextField } from '@mui/material'

interface Props {
    options: string[]
    onChange: (value: string) => void

}

export const AutoComplete: React.FC<Props> = ({options, onChange}) => {
  
    const [value, setValue] = React.useState<string | null>(options[0]);
    const [inputValue, setInputValue] = React.useState('');
    
    useEffect(() => {
        onChange(value)
    }, [value])
    
    return (
      <div>
        <Autocomplete
          value={value}
          onChange={(event: any, newValue: string | null) => {
            setValue(newValue);
          }}
          size='small'
          disableClearable={true}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          id="controllable-states-demo"
          options={options}
          sx={{ width: 150 }}
          renderInput={(params) => <TextField {...params} />}
        />
      </div>
    );
}
