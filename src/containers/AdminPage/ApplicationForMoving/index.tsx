import React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'

function createData(
  name: string,
  from: string,
  fromStatus: string,
  to: string,
  toStatus: string,
  email: string,
  phone: string
) {
  return { name, from, fromStatus, to, toStatus, email, phone }
}

const rows = [
  createData(
    'Phạm Quang Nhật',
    'Hà Nội',
    'red',
    'Hà Tĩnh',
    'green',
    'nhatpham@gmail.com',
    '0123456789'
  ),
  createData('Nguyễn Văn Duy', 'Hà Nội', 'red', 'Tp HCM', 'red', 'vanduy@gmail.com', '0123456789'),
]

function ApplicationForMoving() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Tên nhân viên</TableCell>
            <TableCell align="right">Điểm đi</TableCell>
            <TableCell align="right">Điểm đến</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Số điện thoại</TableCell>
            <TableCell align="right">Phê duyệt</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right" sx={{ color: `${row.fromStatus}` }}>
                {row.from}
              </TableCell>
              <TableCell align="right" sx={{ color: `${row.toStatus}` }}>
                {row.to}
              </TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.phone}</TableCell>
              <TableCell align="right">
                <Button variant="contained" color="success" sx={{ mr: 2 }}>
                  Phê duyệt
                </Button>
                <Button variant="contained" color="error">
                  Từ chối
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ApplicationForMoving
