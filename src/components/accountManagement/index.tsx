import React, { useContext, useEffect, useState } from 'react'
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
import { Box, Snackbar } from '@mui/material'
import SearchAccount from 'components/searchAccount'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import Confirm from 'components/Confirm'

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

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const AccountManagement = (props: dataAdmin) => {
  const { isLogin, showConfirm } = useContext(GlobalContext)
  const [data, setData] = useState([...props.data])
  console.log(data, props.data)

  useEffect(() => {
    setData(props.data)
  }, [props.data])

  const handleSearch = (e: any) => {
    console.log(e)
    setData(e)
  }
  return (
    <>
      {isLogin !== '' && (
        <Box>
          <Confirm showConfirm={showConfirm} content="Xóa thành công!" />

          <Box mb={1} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '1.6rem', fontWeight: 'bold' }}>Danh sách {props.name}</span>
            <SearchAccount search={handleSearch} data={props.data} />
          </Box>
          <TableContainer component={Paper} sx={{ borderRadius: 0 }}>
            <Table sx={{ minWidth: 650 }} color="primary" aria-label="a dense table">
              <TableHead>
                <TableRow sx={{ '& .MuiTableCell-root': { fontSize: '1.4rem !important' } }}>
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
                {data.map((row, index) => (
                  <TableRow
                    key={row.id}
                    sx={{
                      height: '100%',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.05)',
                        transition: '0.2s ease-in-out',
                      },
                      '& .MuiTableCell-root': {
                        fontSize: '1.4rem !important',
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
                        '& button': {
                          fontSize: '1.4rem',
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
