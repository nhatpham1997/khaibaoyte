import Box from '@mui/material/Box'
import React from 'react'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import { Typography } from '@mui/material'

type data = {
  data: {
    id: number
    username: string
    full_name: string
    year_of_birth: string
    citizen_identificatio: string
    sex: string
    nationality: string
    address: string
    phone: string
    email: string
    createDate: string
  }
}

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
}))

const styleSpan = {
  marginRight: '20px',
  fontWeight: '500',
  display: 'inline',
}

const styleBox = {
  padding: '10px',
  borderBottom: '1px solid #ccc',
  '&:last-child': { borderBottom: 'none' },
}

const AccountInformation = (props: data) => {
  return (
    <Item sx={{ display: 'flex', flexDirection: 'column', textAlign: 'start' }}>
      <Box sx={styleBox}>
        <Typography component="span" sx={styleSpan}>
          Tên tài khoản:
        </Typography>
        {props.data.username}
      </Box>
      <Box sx={styleBox}>
        <Typography component="span" sx={styleSpan}>
          Ngày tạo tài khoản:
        </Typography>
        {props.data.createDate}
      </Box>
      <Box sx={styleBox}>
        <Typography component="span" sx={styleSpan}>
          Tên người dùng:
        </Typography>
        {props.data.full_name}
      </Box>
      <Box sx={styleBox}>
        <Typography component="span" sx={styleSpan}>
          Ngày sinh:
        </Typography>
        {props.data.year_of_birth}
      </Box>
      <Box sx={styleBox}>
        <Typography component="span" sx={styleSpan}>
          Giới tính:
        </Typography>
        {props.data.sex}
      </Box>
      <Box sx={styleBox}>
        <Typography component="span" sx={styleSpan}>
          Email:
        </Typography>
        {props.data.email}
      </Box>
      <Box sx={styleBox}>
        <Typography component="span" sx={styleSpan}>
          Điện thoại:
        </Typography>
        {props.data.phone}
      </Box>
      <Box sx={styleBox}>
        <Typography component="span" sx={styleSpan}>
          CMND/CCCD:
        </Typography>
        {props.data.citizen_identificatio}
      </Box>
      <Box sx={styleBox}>
        <Typography component="span" sx={styleSpan}>
          Địa chỉ:
        </Typography>
        {props.data.address}
      </Box>
      <Box sx={styleBox}>
        <Typography component="span" sx={styleSpan}>
          Quốc tịch:
        </Typography>
        {props.data.nationality}
      </Box>
    </Item>
  )
}

export default AccountInformation
