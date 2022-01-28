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
import Box from '@mui/material/Box'

function ApplicationForMoving() {
  const { movingRegister, editMovingRegister } = useGlobalContext()
  const [dataAddress, setDataAddress] = useState<any[]>([])

  const handleApprove = (id: number, status: number) => {
    const itemIndex = movingRegister.findIndex((item) => item.id === id)
    const newMovingRegister = { ...movingRegister[itemIndex], status: status }
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
    <Box>
      <Box mb={1} sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '1.6rem', fontWeight: 'bold' }}>
          Danh sách khai báo của nhân viên
        </span>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ '& .MuiTableCell-root': { fontSize: '1.6rem' } }}>
              <TableCell>Tên nhân viên</TableCell>
              <TableCell>Điểm đi</TableCell>
              <TableCell>Điểm đến</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Số điện thoại</TableCell>
              <TableCell>Phê duyệt</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movingRegister.map((row) => (
              <TableRow
                key={row.id}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  '& .MuiTableCell-root': { fontSize: '1.4rem' },
                }}
              >
                <TableCell component="th" scope="row">
                  {row.fullName}
                </TableCell>
                <TableCell sx={{ color: `${row.status}` }}>
                  {row.wardName} - {row.districtName} - {row.provinceName}
                </TableCell>
                <TableCell sx={{ color: `${row.status}` }}>
                  {row.wardResidenceName} - {row.districtResidenceName} -{' '}
                  {row.provinceResidenceName}
                </TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell sx={{ minWidth: '220px' }}>
                  {row.status === 1 ? (
                    <Typography sx={{ color: 'green', fontSize: '1.4rem', mb: '-4px' }}>
                      <CheckIcon />
                      Đã phê duyệt
                    </Typography>
                  ) : row.status === 2 ? (
                    <Typography sx={{ color: 'red', fontSize: '1.4rem' }}>
                      <CloseIcon sx={{ fontSize: '2rem', px: '2', mb: '-4px' }} />
                      Đã từ chối
                    </Typography>
                  ) : (
                    ''
                  )}
                  <Button
                    variant="contained"
                    color="success"
                    size="small"
                    sx={{
                      mr: 1,
                      display: `${row.status !== 0 ? 'none' : 'unset'}`,
                      fontSize: '1.4rem',
                    }}
                    onClick={() => handleApprove(row.id, 1)}
                  >
                    Phê duyệt
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleApprove(row.id, 2)}
                    sx={{ display: `${row.status !== 0 ? 'none' : 'unset'}`, fontSize: '1.4rem' }}
                  >
                    Từ chối
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default ApplicationForMoving
