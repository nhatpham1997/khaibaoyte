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

export default function BasicDatePicker({ value, setValue, error, setError }: props) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        disableMaskedInput
        disableFuture
        label="Tháng/Ngày/Năm"
        value={value}
        onChange={(newValue) => {
          if (newValue.getTime() > new Date().getTime()) {
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
        InputProps={{ style: { fontSize: '1.4rem' }, readOnly: true }}
        renderInput={(params) => (
          <TextField
            InputProps={{ style: { fontSize: '4.4rem' } }}
            className="date"
            {...params}
            sx={{
              minWidth: 'calc(calc(100%/3) - 1.33rem)',
              marginBottom: '1rem',
              marginTop: '1rem',
            }}
            InputLabelProps={{ style: { fontSize: '1.4rem' } }}
            required
            type="date"
            error={error?.date.val}
            helperText={
              error?.date.val === true && error?.date.code === 1
                ? 'Bạn chưa nhập ngày di chuyển'
                : error?.date.val === true && error?.date.code === 2
                ? 'Không đúng định dạng MM/dd/yyyy'
                : error?.date.val === true && error?.date.code === 3
                ? 'Không được nhập ngày tương lai'
                : ''
            }
            autoComplete="off"
          />
        )}
      />
    </LocalizationProvider>
  )
}
