import * as React from 'react'
import TextField from '@mui/material/TextField'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DatePicker from '@mui/lab/DatePicker'

interface props {
  value?: any
  setValue?: any
  error?: any
  setError?: any
}

export default function DateRegister({ value, setValue, error, setError }: props) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Ngày di chuyển"
        value={value}
        onChange={(newValue) => {
          if (newValue.getTime() < new Date().getTime()) {
            setError((prev: any) => ({ ...prev, date: { val: true, code: 3 } }))
          } else if (newValue == 'Invalid Date') {
            setError((prev: any) => ({ ...prev, date: { val: true, code: 2 } }))
          } else if (newValue == null) {
            setError((prev: any) => ({ ...prev, date: { val: true, code: 1 } }))
          } else {
            setError((prev: any) => ({ ...prev, date: { val: false, code: 0 } }))
          }
          setValue(newValue)
        }}
        InputProps={{ style: { fontSize: '1.2rem' }, readOnly: true }}
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{
              minWidth: 'calc(calc(100%/2) - 1rem)',
              fontSize: '1.6rem',
            }}
            InputLabelProps={{ style: { fontSize: '1.2rem' } }}
            required
            type="date"
            error={error?.date.val}
            helperText={
              error?.date.val === true && error?.date.code === 1
                ? 'Bạn chưa nhập ngày di chuyển'
                : error?.date.val === true && error?.date.code === 2
                ? 'Không đúng định dạng MM/dd/yyyy'
                : error?.date.val === true && error?.date.code === 3
                ? 'Không được đăng ký ngày đã qua'
                : ''
            }
            autoComplete="off"
          />
        )}
      />
    </LocalizationProvider>
  )
}
