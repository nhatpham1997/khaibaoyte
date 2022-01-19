import React, { useContext, useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import TableFooter from '@mui/material/TableFooter'
import TablePagination from '@mui/material/TablePagination'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import { useTheme } from '@mui/material/styles'
import { GlobalContext } from '../../../contexts'

interface TablePaginationActionsProps {
  count: number
  page: number
  rowsPerPage: number
  onPageChange: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme()
  const { count, page, rowsPerPage, onPageChange } = props

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1)
  }

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1)
  }

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
    </Box>
  )
}

function EpidemicArea() {
  const { covidLocations } = useContext(GlobalContext)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(7)
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - covidLocations.length) : 0
  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650, minHeight: '88vh' }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left" sx={{ minWidth: '150px' }}>
              Khu vực
            </TableCell>
            <TableCell align="right">Tổng số ca nhiễm</TableCell>
            <TableCell align="right">Tổng số ca nhiễm hôm nay</TableCell>
            <TableCell align="right">Tổng số ca tủ vong</TableCell>
            <TableCell align="right">Tra cứu</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? covidLocations.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : covidLocations
          ).map((item) => (
            <TableRow key={item.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell
                component="th"
                scope="row"
                sx={{
                  color: `${
                    item.casesToday > 100
                      ? 'red'
                      : item.casesToday > 50
                      ? 'orange'
                      : item.casesToday > 20
                      ? 'yellow'
                      : 'green'
                  }`,
                }}
              >
                {item.name}
              </TableCell>
              <TableCell align="right">{item.cases}</TableCell>
              <TableCell align="right">{item.casesToday}</TableCell>
              <TableCell align="right">{item.death}</TableCell>
              <TableCell align="right">
                <Button variant="contained">Xem chi tiết</Button>
              </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              align="right"
              rowsPerPageOptions={[7, 14, 21, { label: 'All', value: -1 }]}
              colSpan={3}
              count={covidLocations.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  )
}

export default EpidemicArea
