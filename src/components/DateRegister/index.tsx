import * as React from 'react'
import TextField from '@mui/material/TextField'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DatePicker from '@mui/lab/DatePicker'

interface props {
  value?: any
  setValue?: any
}

export default function DateRegister({ value, setValue }: props) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Ngày di chuyển"
        value={value}
        onChange={(newValue) => {
          setValue(newValue)
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{
              minWidth: 'calc(calc(100%/2) - 1rem)',
              fontSize: '1.6rem',
            }}
            InputLabelProps={{ style: { fontSize: '1.2rem' } }}
            required
            error={value ? false : true}
            helperText={value ? '' : 'Chọn ngày di chuyển'}
          />
        )}
      />
    </LocalizationProvider>
  )
}
