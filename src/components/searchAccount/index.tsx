import { TextField } from '@mui/material'
import { Box } from '@mui/system'
import React, { useRef } from 'react'

type searchType = {
  search: (e: any) => void
  data: itemData[]
}

type itemData = {
  citizenIdentification?: string
  createdDate?: string
  district?: number
  email?: string
  fullName?: string
  gender?: number
  id?: number
  password?: string
  phone?: string
  province?: number
  provinceName?: string
  specificAddress?: string
  ward?: number
  yearOfBirth?: number
}

const SearchAccount = (props: searchType) => {
  const valueRef = useRef<any>()

  const handleSearchValue = (e: any) => {
    const dataSearch = props.data.filter((item: any) =>
      item.fullName
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D')
        .includes(
          e.target.value
            .toLowerCase()
            .trim()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd')
            .replace(/Đ/g, 'D')
        )
    )

    if (valueRef.current) {
      clearTimeout(valueRef.current)
    }

    valueRef.current = setTimeout(() => {
      props.search(dataSearch)
    }, 500)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
  }

  return (
    <Box
      onSubmit={handleSubmit}
      component="form"
      sx={{
        '& > :not(style)': { m: 0, width: '50ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        InputProps={{ style: { fontSize: '1.4rem' } }}
        InputLabelProps={{ style: { fontSize: '1.4rem' } }}
        onChange={handleSearchValue}
        id="outlined-basic"
        label="Tìm kiếm theo tên người dùng"
        variant="outlined"
      />
    </Box>
  )
}

export default SearchAccount
