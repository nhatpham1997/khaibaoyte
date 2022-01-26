import React, { useContext } from 'react'
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
import { GlobalContext } from 'contexts'
import { Box } from '@mui/material'

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
  const { isLogin } = useContext(GlobalContext)
  console.log(isLogin)
  return (
    <>
      {isLogin !== '' && (
        <Box>
          <h3 style={{ margin: '16px', fontSize: '1.6rem' }}>Danh sách {props.name}</h3>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} color="primary" aria-label="a dense table">
              <TableHead>
                <TableRow sx={{ '& .MuiTableCell-root': { fontSize: '1.6rem !important' } }}>
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
                {props.data.map((row, index) => (
                  <TableRow
                    key={row.id}
                    sx={{
                      height: '100%',
                      '&:nth-of-type(odd)': { backgroundColor: '#ccc' },
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        transition: '0.2s ease-in-out',
                      },
                      '& .MuiTableCell-root': {
                        fontSize: '1.6rem !important',
                        borderBottom: 'none',
                      },
                    }}
                  >
                    <TableCell component="th" scope="row" align="center">
                      {index + 1}
                    </TableCell>
                    <TableCell align="left">{row.email}</TableCell>
                    <TableCell align="left">{row.fullName}</TableCell>
                    <TableCell align="left">{row.phone}</TableCell>
                    <TableCell align="left">{row.createdDate}</TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                        padding: '8px',
                        '& button': {
                          fontSize: '1.6rem',
                        },
                      }}
                    >
                      {props.name === 'Admin' && isLogin.toString() === '1' && (
                        <>
                          <Link
                            to={`/admin/account-admin/${row.id}`}
                            style={{ textDecoration: 'none' }}
                          >
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
                            account="Admin"
                            title={`Bạn có chắc muốn xóa "${row.email}" không?`}
                            content={`Khi xác nhận thì toàn bộ thông tin tài khoản "${row.email}" bao gồm cả thông tin liên quan sẽ bị xóa!`}
                          />
                        </>
                      )}
                      {props.name === 'User' && (
                        <>
                          <Link
                            to={`/admin/account-user/${row.id}`}
                            style={{ textDecoration: 'none' }}
                          >
                            <Button
                              variant="contained"
                              color="primary"
                              size="small"
                              startIcon={<FileOpenIcon />}
                              sx={{ fontSize: '1.2rem' }}
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
        </Box>
      )}
    </>
  )
}

export default AccountManagement
