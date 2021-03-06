import { useContext, useState, useEffect } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import TableFooter from '@mui/material/TableFooter'
import TablePagination from '@mui/material/TablePagination'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import { useTheme } from '@mui/material/styles'
import { GlobalContext } from '../../../contexts'
import { addressApi } from 'apis/addressApi'
import { covidApi } from 'apis/covid'

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
  const { movingDeclaration, dataCovid, setDataCovid } = useContext(GlobalContext)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(7)
  const [dataAddress, setDataAddress] = useState<any[]>([])
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - movingDeclaration.length) : 0
  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const getAddress = async () => {
    const data = await addressApi.getAll()
    setDataAddress(data.data)
  }

  useEffect(() => {
    getAddress()
  }, [])

  const getAddressName = (province: number, district: number, ward: number) => {
    const provinceIndex = dataAddress?.findIndex((item: any) => item.code === province)
    const districtIndex = dataAddress[provinceIndex]?.districts?.findIndex(
      (item: any) => item.code === district
    )
    const wardIndex = dataAddress[provinceIndex]?.districts[districtIndex]?.wards?.findIndex(
      (item: any) => item.code === ward
    )
    return `${dataAddress[provinceIndex]?.districts[districtIndex]?.wards[wardIndex]?.name} - ${dataAddress[provinceIndex]?.districts[districtIndex]?.name} - ${dataAddress[provinceIndex]?.name}`
  }

  // const getLevel = (ward: number) => {
  //   try {
  //     const uri = {
  //       filters: [
  //         {
  //           and: [
  //             {
  //               member: 'dtm_covid_nguy_co.ma_quan_huyen',
  //               operator: 'equals',
  //               values: [`${ward}`],
  //             },
  //             { member: 'dtm_covid_nguy_co.cap', operator: 'equals', values: ['C???p x??'] },
  //           ],
  //         },
  //       ],
  //       dimensions: [
  //         'dtm_covid_nguy_co.nguy_co',
  //         'dtm_covid_nguy_co.cap',
  //         'dtm_covid_nguy_co.ngay_cap_nhap',
  //       ],
  //     }
  //     const encode = encodeURI(JSON.stringify(uri))
  //     const data = covidApi.getAll(encode)
  //     const newData = [
  //       ...dataCovid,
  //       { ward: ward, level: data?.data?.results[0]?.data[0]?.['dtm_covid_nguy_co.nguy_co'] },
  //     ]
  //     setDataCovid(newData)
  //     // return `${data?.data?.results[0]?.data[0]?.['dtm_covid_nguy_co.nguy_co']}`
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  // console.log(dataCovid)

  return (
    <Box>
      <Box mb={1} sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <span style={{ fontSize: '1.6rem', fontWeight: 'bold' }}>
          Danh s??ch khai b??o c???a nh??n vi??n
        </span>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ '& .MuiTableCell-root': { fontSize: '1.4rem' } }}>
              <TableCell align="left" sx={{ minWidth: '150px' }}>
                T??n nh??n vi??n
              </TableCell>
              <TableCell align="right">?????a ch??? khai b??o</TableCell>
              <TableCell align="right">Ng??y khai b??o</TableCell>
              <TableCell align="right">S??? ??i???n tho???i</TableCell>
              <TableCell align="right">C???p ????? d???ch</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? movingDeclaration.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : movingDeclaration
            ).map((item) => {
              return (
                <TableRow
                  key={item.id}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    '& .MuiTableCell-root': { fontSize: '1.4rem' },
                  }}
                >
                  <TableCell component="th" scope="row">
                    {item.fullName}
                  </TableCell>
                  <TableCell align="right">
                    {getAddressName(item.province, item.district, item.ward)}
                  </TableCell>
                  <TableCell align="right">{item.time}</TableCell>
                  <TableCell align="right">{item.phone}</TableCell>
                  <TableCell align="right">C???p 1</TableCell>
                </TableRow>
              )
            })}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                align="left"
                rowsPerPageOptions={[7, 14, 21, { label: 'All', value: -1 }]}
                colSpan={3}
                count={movingDeclaration.length}
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
                sx={{
                  fontSize: '1.4rem',
                  '& p': { fontSize: '1.4rem' },
                  '& .MuiSvgIcon-root': { fontSize: '2rem' },
                }}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default EpidemicArea
