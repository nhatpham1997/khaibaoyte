import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import { styled } from '@mui/system'

function createData(stt: number, fullname: string, username: string, email: string, sdt: string) {
  return { stt, fullname, username, email, sdt }
}

const rows = [
  createData(1, 'Nguyễn Văn Duy', 'NguyenDuy', 'duy124678@gmail.com', '0349170065'),
  createData(2, 'Nguyễn Văn Duy', 'NguyenDuy', 'duy124678@gmail.com', '0349170065'),
  createData(3, 'Nguyễn Văn Duy', 'NguyenDuy', 'duy124678@gmail.com', '0349170065'),
  createData(4, 'Nguyễn Văn Duy', 'NguyenDuy', 'duy124678@gmail.com', '0349170065'),
  createData(5, 'Nguyễn Văn Duy', 'NguyenDuy', 'duy124678@gmail.com', '0349170065'),
]

const classes = { width: '30px', color: 'red' }

const MyComponent = styled('button')({
  color: 'red',
  backgroundColor: 'aliceblue',
  padding: 8,
  borderRadius: 4,
})

function AccountUser() {
  return (
    <TableContainer component={Paper}>
      <h2>User</h2>
      <Table sx={{ minWidth: 650 }} color="primary" size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell sx={classes}>STT</TableCell>
            <TableCell align="left">Tài khoản</TableCell>
            <TableCell sx={{ minWidth: '150px' }} align="left">
              Tên người dùng
            </TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Số điện thoại</TableCell>
            <TableCell align="left">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.stt}
              sx={{
                '&:nth-of-type(odd)': { backgroundColor: '#ccc' },
                '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
              }}
            >
              <TableCell component="th" scope="row">
                {row.stt}
              </TableCell>
              <TableCell onClick={() => alert('hello')} align="left">
                {row.username}
              </TableCell>
              <TableCell align="left">{row.fullname}</TableCell>
              <TableCell align="left">{row.email}</TableCell>
              <TableCell align="left">{row.sdt}</TableCell>
              <TableCell align="left">
                <Button variant="contained" color="primary" size="small">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button color="error" variant="contained">
        Submit
      </Button>
      <MyComponent>Styled div</MyComponent>
    </TableContainer>
  )
}

export default AccountUser
