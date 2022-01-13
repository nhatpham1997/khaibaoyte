import React from 'react'
import HomeIcon from '@mui/icons-material/Home'
import { Breadcrumbs as MuiBreadcrumbs } from '@mui/material'
import Typography from '@mui/material/Typography'

function Breadcrumbs() {
  return (
    <MuiBreadcrumbs aria-label="breadcrumb">
      <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
      <Typography color="text.primary">Dashboard</Typography>
    </MuiBreadcrumbs>
  )
}

export default Breadcrumbs
