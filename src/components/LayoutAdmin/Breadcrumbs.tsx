import React from 'react'
import HomeIcon from '@mui/icons-material/Home'
import { Breadcrumbs as MuiBreadcrumbs } from '@mui/material'
import Typography from '@mui/material/Typography'
import { useLocation, Link } from 'react-router-dom'

function Breadcrumbs() {
  const route = useLocation().pathname.split('/').slice(1)
  console.log(route)
  return (
    <MuiBreadcrumbs aria-label="breadcrumb">
      <Link to="/admin" style={{ color: 'grey', textDecoration: 'none' }}>
        <Typography>
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
        </Typography>
      </Link>
      <Typography color="text.primary">
        {route[1] === '' || route.length === 1 ? 'Trang Chủ' : route[1]}
      </Typography>
    </MuiBreadcrumbs>
  )
}

export default Breadcrumbs
