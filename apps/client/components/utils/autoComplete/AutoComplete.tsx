import React, { useEffect } from 'react'
import { Autocomplete, TextField } from '@mui/material'
import Paper from '@mui/material/Paper';


export interface SelectItem {
    label: string
    value: unknown
}
interface Props {
    options: string[] | SelectItem[]
    onChange: (value: unknown) => void

}

export const AutoComplete: React.FC<Props> = ({options, onChange}) => {

    const [value, setValue] = React.useState<string | SelectItem>(options[0]);
    const [inputValue, setInputValue] = React.useState('');

    useEffect(() => {
      if(typeof value === 'string'){
        onChange(value)
      }
      else{
        onChange(value.value)
      }

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
          id="autocomplete"
          options={options}
          sx={{ width: 150 }}
          renderInput={(params) => <TextField {...params} />}
        />
      </div>
    );
}
