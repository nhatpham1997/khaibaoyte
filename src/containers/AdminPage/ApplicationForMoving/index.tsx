import React, { useContext } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import { GlobalContext } from 'contexts'
import movingRegisterApi from 'apis/movingRegister'

function ApplicationForMoving() {
  const { movingRegister } = useContext(GlobalContext)

  const handleApprove = (id: number) => {
    const itemIndex = movingRegister.findIndex((item) => item.id === id)
    movingRegister[itemIndex].status = false
    movingRegisterApi.edit(id, movingRegister[itemIndex])
  }

  const handleRefuse = (id: number) => {
    const itemIndex = movingRegister.findIndex((item) => item.id === id)
    movingRegister[itemIndex].status = true
    movingRegisterApi.edit(id, movingRegister[itemIndex])
  }

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
          {movingRegister.map((row) => (
            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.fullName}
              </TableCell>
              <TableCell align="right" sx={{ color: `${row.status}` }}>
                {row.wardResidence}
              </TableCell>
              <TableCell align="right" sx={{ color: `${row.status}` }}>
                {row.ward}
              </TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.phone}</TableCell>
              <TableCell align="right">
                <Button
                  variant="contained"
                  color="success"
                  sx={{ mr: 2 }}
                  disabled={row.status === true ? false : true}
                  onClick={() => handleApprove(row.id)}
                >
                  Phê duyệt
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  disabled={row.status === true ? false : true}
                  onClick={() => handleRefuse(row.id)}
                >
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
