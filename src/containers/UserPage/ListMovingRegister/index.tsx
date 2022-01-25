import LabelHeading from 'components/LabelHeading'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import axios from 'axios'
import './ListMovingRegister.css'
import { useState, useEffect } from 'react'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {},
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

function ListMovingRegister() {
  const [register, setRegister] = useState<any[]>([])

  const getListRegister = async () => {
    try {
      const data = await axios.get('https://dbkhaibaoyte.herokuapp.com/moving_register')
      console.log(data.data)
      setRegister(data.data)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getListRegister()
  }, [])
  return (
    <div>
      <LabelHeading text="Danh sách đăng ký di chuyển" />
      <div className="row">
        <TableContainer className="tableContainer" component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Họ Tên</StyledTableCell>
                <StyledTableCell align="center">Giới tính</StyledTableCell>
                <StyledTableCell align="center">Năm sinh</StyledTableCell>
                <StyledTableCell align="center">Email</StyledTableCell>
                <StyledTableCell align="center">Số điện thoại</StyledTableCell>
                <StyledTableCell align="center">Nơi ở hiện tại</StyledTableCell>
                <StyledTableCell align="center">Di chuyển đến</StyledTableCell>
                <StyledTableCell align="center">Ngày di chuyển</StyledTableCell>
                <StyledTableCell align="center">Trạng thái</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {register.map((item) => {
                return (
                  <StyledTableRow
                    key={item.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell className="name" align="center">
                      {item.fullName}
                    </TableCell>
                    <TableCell align="center">
                      {item.gender === 1 ? 'Nam' : item.status === 2 ? 'Nữ' : 'Khác'}
                    </TableCell>
                    <TableCell align="center">{item.yearOfBirth}</TableCell>
                    <TableCell align="center">{item.email}</TableCell>
                    <TableCell align="center">{item.phone}</TableCell>
                    <TableCell align="center">
                      {item.specificAddressResidence}-{item.wardResidenceName}-
                      {item.districtResidenceName}-{item.provinceResidenceName}
                    </TableCell>
                    <TableCell align="center">
                      {item.specificAddress}-{item.wardName}-{item.districtName}-{item.provinceName}
                    </TableCell>
                    <TableCell align="center">{item.time}</TableCell>
                    <TableCell
                      className="status"
                      style={{
                        color: `${
                          item.status === 0 ? 'orange' : item.status === 1 ? 'green' : 'red'
                        }`,
                      }}
                      align="center"
                    >
                      {item.status === 0 ? 'Đang chờ' : item.status === 1 ? 'Đã duyệt' : 'Từ chối'}
                    </TableCell>
                  </StyledTableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  )
}

export default ListMovingRegister
