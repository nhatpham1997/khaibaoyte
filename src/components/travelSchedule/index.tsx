import Button from '@mui/material/Button'
import Dialog, { DialogProps } from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { ListItem, ListItemText, Typography, Box } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useContext, useEffect, useRef, useState } from 'react'
import { GlobalContext } from 'contexts'

type typeProps = {
  name: string
}

export default function TravelSchedule(props: typeProps) {
  const { movingRegister, movingDeclaration, address } = useContext(GlobalContext)
  const params = useParams()
  const [open, setOpen] = useState(false)
  const [scroll, setScroll] = useState<DialogProps['scroll']>('paper')

  let data

  if (props.name === 'Lịch sử di chuyển') {
    data = movingDeclaration.filter((item) => item.userId.toString() === params.id)
    data.reverse()
  } else {
    data = movingRegister.filter((item) => item.userId.toString() === params.id)
    data.reverse()
  }

  const handleClickOpen = (scrollType: DialogProps['scroll']) => () => {
    setOpen(true)
    setScroll(scrollType)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const descriptionElementRef = useRef<HTMLElement>(null)
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef
      if (descriptionElement !== null) {
        descriptionElement.focus()
      }
    }
  }, [open])

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
      {address.length > 0 && (
        <Dialog
          open={open}
          onClose={handleClose}
          scroll={scroll}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle color="primary" id="scroll-dialog-title" sx={{ fontSize: '1.6rem' }}>
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
            <Button onClick={handleClose} sx={{ fontSize: '1.4rem' }}>
              Đóng
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  )
}
