import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog, { DialogProps } from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { ListItem, ListItemText, Typography, Box } from '@mui/material'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { addressApi } from 'apis/addressApi'

type typeProps = {
  name: string
}

export default function TravelSchedule(props: typeProps) {
  const params = useParams()
  const [data, setData] = React.useState<any>([])
  const [open, setOpen] = React.useState(false)
  const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper')
  const [address, setAddress] = React.useState<any>([])
  const [loading, setLoading] = React.useState(true)

  const fetchDataAddress = async () => {
    try {
      const dataAddress = await addressApi.getAll()
      setAddress(dataAddress.data)
      console.log(dataAddress)
      setLoading(false)
    } catch (error) {
      console.log('Failed to fetch post list: ', error)
    }
  }

  const handleClickOpen = (scrollType: DialogProps['scroll']) => () => {
    setOpen(true)
    setScroll(scrollType)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const descriptionElementRef = React.useRef<HTMLElement>(null)
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef
      if (descriptionElement !== null) {
        descriptionElement.focus()
      }
    }
  }, [open])

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        if (props.name === 'Lịch sử di chuyển') {
          const response = await axios.get(
            `https://dbkhaibaoyte.herokuapp.com/moving_declaration?userId=${params.id}`
          )
          setData(response.data)
        } else {
          const response = await axios.get(
            `https://dbkhaibaoyte.herokuapp.com/moving_register?userId=${params.id}`
          )
          setData(response.data)
        }
        fetchDataAddress()
      } catch (error) {
        console.log('Failed to fetch post list: ', error)
      }
    }
    fetchData()
  }, [])

  return (
    <>
      <Button
        onClick={handleClickOpen('paper')}
        sx={{ marginLeft: '20px' }}
        variant="contained"
        color="primary"
        size="small"
      >
        {props.name}
      </Button>
      {!loading && (
        <Dialog
          open={open}
          onClose={handleClose}
          scroll={scroll}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle color="primary" id="scroll-dialog-title">
            {props.name}
          </DialogTitle>
          <DialogContent dividers={scroll === 'paper'}>
            <DialogContent
              sx={{ padding: 0 }}
              id="scroll-dialog-description"
              ref={descriptionElementRef}
              tabIndex={-1}
            >
              {data?.map((item: any, index: number) => {
                if (item.status === 0) {
                  return
                }
                // di chuyển từ
                const province =
                  address.filter((itemAddress: any) => item.province === itemAddress.code)[0] || {}
                const district =
                  province.districts?.filter(
                    (itemAddress: any) => item.district === itemAddress.code
                  )[0] || {}
                const ward =
                  district.wards?.filter((itemAddress: any) => item.ward === itemAddress.code)[0] ||
                  {}
                // di chuyển tới
                const responseProvince =
                  address.filter(
                    (itemAddress: any) => item.provinceResidence === itemAddress.code
                  )[0] || {}
                const responseDistrict =
                  responseProvince.districts?.filter(
                    (itemAddress: any) => item.districtResidence === itemAddress.code
                  )[0] || {}
                const responseWard =
                  responseDistrict.wards?.filter(
                    (itemAddress: any) => item.wardResidence === itemAddress.code
                  )[0] || {}
                return (
                  <ListItem
                    key={index}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      margin: 'auto',
                      //
                      border: `${
                        item.status === 0 || item.status === undefined
                          ? '2px solid #1976d2'
                          : item.status === 1
                          ? '2px solid #1976d2'
                          : '2px solid red'
                      }`,
                      minWidth: { lg: '400px' },
                      borderRadius: '15px',
                      marginBottom: '25px',
                      alignItems: 'flex-start',
                      '&:last-child': { marginBottom: '0' },
                    }}
                  >
                    <Box
                      sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        borderBottom: `${
                          item.status === 0 || item.status === undefined
                            ? '1px solid #1976d2'
                            : item.status === 1
                            ? '1px solid #1976d2'
                            : '1px solid red'
                        }`,
                      }}
                    >
                      <Typography
                        component="span"
                        m={0}
                        sx={{
                          fontWeight: 'bold',
                          fontSize: '1.6rem',
                        }}
                      >
                        Ngày {item.time}
                      </Typography>
                      {item.status !== 0 && item.status !== undefined && (
                        <Typography
                          sx={{
                            fontSize: '1.4rem',
                            borderRadius: '20px',
                            padding: '3px 6px',
                            marginBottom: '5px',
                            color: `${item.status === 1 ? '#1976d2' : 'red'}`,
                            fontWeight: 'bold',
                            border: `${item.status === 1 ? '1px solid #1976d2' : '1px solid red'}`,
                          }}
                          component="span"
                        >
                          {item.status === 1 ? 'Đã duyệt' : 'Từ chối'}
                        </Typography>
                      )}
                    </Box>
                    <ListItemText
                      sx={{
                        color: 'black',
                        width: '100%',
                        margin: '10px 0',
                        '& .MuiTypography-root': { fontSize: '1.4rem', fontWeight: '500' },
                      }}
                      primary={`Di chuyển từ: ${item.specificAddress}`}
                      secondary={`${ward.name || ''} - ${district.name || ''} - ${
                        province.name || ''
                      }`}
                    />
                    <ListItemText
                      sx={{
                        color: 'black',
                        width: '100%',
                        margin: '10px 0',
                        '& .MuiTypography-root': { fontSize: '1.4rem', fontWeight: '500' },
                      }}
                      primary={`Di chuyển tới: ${item.specificAddressResidence}`}
                      secondary={`${responseWard.name || ''} - ${responseDistrict.name || ''} - ${
                        responseProvince.name || ''
                      }`}
                    />
                  </ListItem>
                )
              })}
            </DialogContent>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Đóng</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  )
}
