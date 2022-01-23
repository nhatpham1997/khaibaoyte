import React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import ConfirmAdmin from 'components/confirmAdmin'
import { Link } from 'react-router-dom'
import FileOpenIcon from '@mui/icons-material/FileOpen'

type dataAdmin = {
  data: {
    citizenIdentification?: string
    createdDate?: string
    district?: number
    email?: string
    fullName?: string
    gender?: number
    id?: number
    password?: string
    phone?: string
    province?: number
    provinceName?: string
    specificAddress?: string
    ward?: number
    yearOfBirth?: number
  }[]
  name: string
}

const AccountManagement = (props: dataAdmin) => {
  return (
    <>
      <h3 style={{ margin: '16px', fontSize: '1.6rem' }}>Danh sách {props.name}</h3>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} color="primary" aria-label="a dense table">
          <TableHead>
            <TableRow sx={{ '& .MuiTableCell-root': { fontSize: '1.6rem' } }}>
              <TableCell sx={{ width: '30px' }}>STT</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell sx={{ minWidth: '170px' }} align="left">
                Tên người dùng
              </TableCell>
              <TableCell align="left">Điện thoại</TableCell>
              <TableCell align="left">Ngày tạo</TableCell>
              <TableCell align="center">Chi tiết</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data.map((row) => (
              <TableRow
                key={row.id}
                sx={{
                  height: '100%',
                  '&:nth-of-type(odd)': { backgroundColor: '#ccc' },
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    transition: '0.2s ease-in-out',
                  },
                  '& .MuiTableCell-root': { fontSize: '1.6rem' },
                }}
              >
                <TableCell component="th" scope="row" align="center">
                  {row.id}
                </TableCell>
                <TableCell align="left">{row.email}</TableCell>
                <TableCell align="left">{row.fullName}</TableCell>
                <TableCell align="left">{row.phone}</TableCell>
                <TableCell align="left">{row.createdDate}</TableCell>
                <TableCell
                  align="left"
                  sx={{
                    display: 'flex',
                    minHeight: '31.226px',
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                    '& button': {
                      fontSize: '1.6rem',
                    },
                  }}
                >
                  {props.name === 'Admin' && (
                    <Link to={`/admin/account-admin/${row.id}`} style={{ textDecoration: 'none' }}>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        startIcon={<FileOpenIcon />}
                      >
                        Xem
                      </Button>
                    </Link>
                  )}
                  {props.name === 'User' && (
                    <>
                      <Link to={`/admin/account-user/${row.id}`} style={{ textDecoration: 'none' }}>
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          startIcon={<FileOpenIcon />}
                        >
                          Xem
                        </Button>
                      </Link>
                      <ConfirmAdmin
                        id={row.id}
                        account="User"
                        title={`Bạn có chắc muốn xóa "${row.email}" không?`}
                        content={`Khi xác nhận thì toàn bộ thông tin tài khoản "${row.email}" bao gồm cả thông tin liên quan sẽ bị xóa!`}
                      />
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default AccountManagement
