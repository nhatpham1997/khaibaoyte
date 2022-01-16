import Box from '@mui/material/Box'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

function LayoutAdmin() {
  return (
    <Box display="grid" gridTemplateColumns="repeat(5, 1fr)" gap={2}>
      <Box gridColumn="span 1" sx={{ display: { xs: 'none', lg: 'block' } }}>
        <Sidebar />
      </Box>
      <Box sx={{ gridColumn: { xs: 'span 5', lg: 'span 4' } }}>
        <Navbar />
        <Box>
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}

export default LayoutAdmin
