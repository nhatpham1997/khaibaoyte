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
                <StyledTableCell className="tbody" align="center">
                  Họ Tên
                </StyledTableCell>
                <StyledTableCell className="tbody" align="center">
                  Giới tính
                </StyledTableCell>
                <StyledTableCell className="tbody" align="center">
                  Năm sinh
                </StyledTableCell>
                <StyledTableCell className="tbody" align="center">
                  Email
                </StyledTableCell>
                <StyledTableCell className="tbody" align="center">
                  Số điện thoại
                </StyledTableCell>
                <StyledTableCell className="tbody" align="center">
                  Nơi ở hiện tại
                </StyledTableCell>
                <StyledTableCell className="tbody" align="center">
                  Di chuyển đến
                </StyledTableCell>
                <StyledTableCell className="tbody" align="center">
                  Ngày di chuyển
                </StyledTableCell>
                <StyledTableCell className="tbody" align="center">
                  Trạng thái
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {register.map((item) => {
                return (
                  <StyledTableRow
                    key={item.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell className="name tbody" align="center">
                      {item.fullName}
                    </TableCell>
                    <TableCell className="tbody" align="center">
                      {item.gender === 1 ? 'Nam' : item.status === 2 ? 'Nữ' : 'Khác'}
                    </TableCell>
                    <TableCell className="tbody" align="center">
                      {item.yearOfBirth}
                    </TableCell>
                    <TableCell className="tbody" align="center">
                      {item.email}
                    </TableCell>
                    <TableCell className="tbody" align="center">
                      {item.phone}
                    </TableCell>
                    <TableCell className="tbody" align="center">
                      {item.specificAddressResidence}-{item.wardResidenceName}-
                      {item.districtResidenceName}-{item.provinceResidenceName}
                    </TableCell>
                    <TableCell className="tbody" align="center">
                      {item.specificAddress}-{item.wardName}-{item.districtName}-{item.provinceName}
                    </TableCell>
                    <TableCell className="tbody" align="center">
                      {item.time}
                    </TableCell>
                    <TableCell
                      className="status tbody"
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
