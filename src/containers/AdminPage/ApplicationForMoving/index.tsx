import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import { useGlobalContext } from 'contexts'
import movingRegisterApi from 'apis/movingRegister'
import { Typography } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import { addressApi } from '../../../apis/addressApi'

function ApplicationForMoving() {
  const { movingRegister, editMovingRegister } = useGlobalContext()
  const [dataAddress, setDataAddress] = useState<any[]>([])

  const handleApprove = (id: number, status: number) => {
    const itemIndex = movingRegister.findIndex((item) => item.id === id)
    const newMovingRegister = { ...movingRegister[itemIndex], status: 1 }
    movingRegisterApi.edit(id, newMovingRegister)
    const newData = [...movingRegister]
    newData[itemIndex].status = status
    editMovingRegister(newData)
  }

  const getAddress = async () => {
    const data = await addressApi.getAll()
    setDataAddress(data.data)
  }

  useEffect(() => {
    getAddress()
  }, [])

  const getAddressName = (value: number) => {
    const itemIndex = dataAddress?.findIndex((item) => item.code === value)
    return dataAddress[itemIndex]?.name
  }

  console.log(dataAddress)

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
                {row.wardName} - {row.districtName} - {row.provinceName}
              </TableCell>
              <TableCell align="right" sx={{ color: `${row.status}` }}>
                {row.wardResidenceName} - {row.districtResidenceName} - {row.provinceResidenceName}
              </TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.phone}</TableCell>
              <TableCell align="right">
                {row.status === 1 ? (
                  <Typography sx={{ color: 'green', fontSize: '1.6rem' }}>
                    <CheckIcon />
                    Đã phê duyệt
                  </Typography>
                ) : row.status === 2 ? (
                  <Typography sx={{ color: 'red', fontSize: '1.6rem' }}>
                    <CloseIcon sx={{ fontSize: '2rem', px: '2' }} />
                    Đã từ chối
                  </Typography>
                ) : (
                  ''
                )}
                <Button
                  variant="contained"
                  color="success"
                  sx={{ mr: 2, display: `${row.status !== 0 ? 'none' : 'unset'}` }}
                  onClick={() => handleApprove(row.id, 1)}
                >
                  Phê duyệt
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleApprove(row.id, 2)}
                  sx={{ display: `${row.status !== 0 ? 'none' : 'unset'}` }}
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
