import Box from '@mui/material/Box'
import React, { useContext, useEffect, useState } from 'react'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import { Typography } from '@mui/material'
import { useLocation, useParams } from 'react-router-dom'
import { GlobalContext } from 'contexts'

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
}))

const styleSpan = {
  fontWeight: '500',
  display: 'inline-block',
  fontSize: '1.4rem',
  minWidth: '14rem',
  height: '100%',
}

const styleBox = {
  padding: '10px',
  borderBottom: '1px solid #ccc',
  '&:last-child': { borderBottom: 'none' },
}

const AccountInformation = () => {
  const { users, admins, address } = useContext(GlobalContext)
  const params = useParams()
  const match = useLocation()

  let data: any
  let responseProvince: any
  let responseDistrict: any
  let responseWard: any

  if (match.pathname.includes('account-admin')) {
    data = admins.filter((item: any) => item.id.toString() === params.id)[0]
  } else {
    data = users.filter((item: any) => item.id.toString() === params.id)[0]
  }

  if (address.length > 0) {
    responseProvince = address.filter((item: any) => data.province === item.code)[0] || {}
    responseDistrict =
      responseProvince.districts?.filter((item: any) => data.district === item.code)[0] || {}
    responseWard = responseDistrict.wards?.filter((item: any) => data.ward === item.code)[0] || {}
  }

  return (
    <Box sx={{ '& .css-1c3xpmj-MuiPaper-root': { borderRadius: 'none !important' } }}>
      {address.length > 0 && (
        <Item
          sx={{
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'start',
            boxShadow: 3,
            fontSize: '1.4rem',
          }}
        >
          <Box sx={styleBox}>
            <Typography component="span" sx={styleSpan}>
              Tên tài khoản:
            </Typography>
            {data.email || ''}
          </Box>
          <Box sx={styleBox}>
            <Typography component="span" sx={styleSpan}>
              Ngày tạo tài khoản:
            </Typography>
            {data.createdDate || ''}
          </Box>
          <Box sx={styleBox}>
            <Typography component="span" sx={styleSpan}>
              Tên người dùng:
            </Typography>
            {data.fullName || ''}
          </Box>
          <Box sx={styleBox}>
            <Typography component="span" sx={styleSpan}>
              Ngày sinh:
            </Typography>
            {data.yearOfBirth || ''}
          </Box>
          <Box sx={styleBox}>
            <Typography component="span" sx={styleSpan}>
              Giới tính:
            </Typography>
            {data.gender === 1 ? 'Nam' : data.gender === 2 ? 'Nữ' : 'Khác'}
          </Box>

          <Box sx={styleBox}>
            <Typography component="span" sx={styleSpan}>
              Điện thoại:
            </Typography>
            {data.phone || ''}
          </Box>
          <Box sx={styleBox}>
            <Typography component="span" sx={styleSpan}>
              CMND/CCCD:
            </Typography>
            {data.citizenIdentification || ''}
          </Box>
          <Box sx={styleBox}>
            <Typography component="span" sx={styleSpan}>
              Quê quán:
            </Typography>
            {data.provinceName || ''}
          </Box>
          <Box sx={styleBox}>
            <Typography component="span" sx={styleSpan}>
              Nơi ở hiện tại:
            </Typography>
            {data.specificAddress || ''}
          </Box>
          <Box sx={styleBox}>
            <Typography component="span" sx={styleSpan}>
              Địa chỉ hiện tại:
            </Typography>
            {responseWard.name || data.ward || ''} - {responseDistrict.name || data.district || ''}{' '}
            - {responseProvince.name || data.provinceName || ''}
          </Box>
        </Item>
      )}
    </Box>
  )
}

export default AccountInformation
