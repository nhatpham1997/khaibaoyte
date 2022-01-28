import React from 'react'
import HomeIcon from '@mui/icons-material/Home'
import { Breadcrumbs as MuiBreadcrumbs } from '@mui/material'
import Typography from '@mui/material/Typography'
import { useLocation, Link } from 'react-router-dom'

function Breadcrumbs() {
  const route = useLocation().pathname.split('/').slice(1)
  return (
    <MuiBreadcrumbs aria-label="breadcrumb" sx={{ color: 'white' }}>
      <Link to="/admin" style={{ color: 'grey', textDecoration: 'none' }}>
        <Typography>
          <HomeIcon sx={{ mr: 0.5, color: 'white' }} fontSize="large" />
        </Typography>
      </Link>
      <Typography color="text.primary" sx={{ fontSize: '14px', color: 'white' }}>
        {route[1] === '' || route.length === 1
          ? 'Trang Chủ'
          : route[1] === 'account-admin'
          ? 'Quản Lý Admin'
          : route[1] === 'account-user'
          ? 'Quản Lý User'
          : route[1] === 'application-for-moving'
          ? 'Quản Lý Di Chuyển'
          : 'Danh Sách Vùng Dịch'}
      </Typography>
    </MuiBreadcrumbs>
  )
}

export default Breadcrumbs
