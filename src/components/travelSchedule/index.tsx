import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog, { DialogProps } from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { ListItem, ListItemText, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'

type typeProps = {
  name: string
}

export default function TravelSchedule(props: typeProps) {
  const params = useParams()
  const [open, setOpen] = React.useState(false)
  const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper')

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
            {[1, 2, 3, 4, 6].map((item) => (
              <ListItem
                key={item}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  margin: 'auto',
                  border: '2px solid #1976d2',
                  minWidth: { lg: '400px' },
                  borderRadius: '15px',
                  marginBottom: '20px',
                  '&:last-child': { marginBottom: '0' },
                }}
              >
                <Typography
                  m={0}
                  sx={{
                    borderBottom: '1px solid #1976d2',
                    fontWeight: 'bold',
                    width: '100%',
                    fontSize: '1.6rem',
                  }}
                >
                  Ngày 01 tháng 01 năm 2021
                </Typography>
                <ListItemText
                  sx={{
                    color: 'black',
                    width: '100%',
                    '& .MuiTypography-root': { fontSize: '1.4rem', fontWeight: '500' },
                  }}
                  primary="Công viên Hòa Bình"
                  secondary="Liên Hà - Đan Phượng - Hà Nội"
                />
              </ListItem>
            ))}
          </DialogContent>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ fontSize: '1.4rem' }}>
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
