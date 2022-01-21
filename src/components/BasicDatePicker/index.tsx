import * as React from 'react'
import TextField from '@mui/material/TextField'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DatePicker from '@mui/lab/DatePicker'

export default function BasicDatePicker() {
  const [value, setValue] = React.useState<Date | null>(null)

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Ngày/Tháng/Năm"
        value={value}
        onChange={(newValue) => {
          setValue(newValue)
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{
              minWidth: 'calc(calc(100%/3) - 1.33rem)',
              fontSize: '1.6rem',
            }}
            required
          />
        )}
      />
    </LocalizationProvider>
  )
}
