import * as React from 'react'
import TextField from '@mui/material/TextField'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import TimePicker from '@mui/lab/TimePicker'

export default function BasicTimePicker() {
  const [value, setValue] = React.useState<Date | null>(null)

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <TimePicker
        label="Giờ"
        value={value}
        onChange={(newValue) => {
          setValue(newValue)
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{
              minWidth: 'calc(calc(100%/3) - 1.33rem)',
            }}
            required
          />
        )}
      />
    </LocalizationProvider>
  )
}
