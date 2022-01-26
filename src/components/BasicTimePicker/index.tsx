import * as React from 'react'
import TextField from '@mui/material/TextField'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import TimePicker from '@mui/lab/TimePicker'

interface props {
  value?: any
  setValue?: any
  error?: any
  setError?: any
}

export default function BasicTimePicker({ value, setValue, error, setError }: props) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <TimePicker
        label="Giờ"
        value={value}
        onChange={(newValue) => {
          console.log(newValue)
          if (newValue == 'Invalid Date') {
            setError((prev: any) => ({ ...prev, time: { val: true, code: 2 } }))
          } else if (newValue == null) {
            setError((prev: any) => ({ ...prev, time: { val: true, code: 1 } }))
          } else {
            setError((prev: any) => ({ ...prev, time: { val: false, code: 0 } }))
          }
          setValue(newValue)
        }}
        InputProps={{ style: { fontSize: '1.2rem' } }}
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{
              minWidth: 'calc(calc(100%/3) - 1.33rem)',
              marginBottom: '1rem',
              marginTop: '1rem',
            }}
            InputLabelProps={{ style: { fontSize: '1.2rem' } }}
            required
            type="time"
            error={error?.time.val}
            helperText={
              error?.time.val === true && error?.time.code === 1
                ? 'Bạn chưa nhập giờ di chuyển'
                : error?.time.val === true && error?.time.code === 2
                ? 'Không đúng định dạng hh:mm (a/p)m'
                : ''
            }
            autoComplete="off"
          />
        )}
      />
    </LocalizationProvider>
  )
}
