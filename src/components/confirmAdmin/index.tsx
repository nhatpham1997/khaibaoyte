import React from 'react'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
import { TransitionProps } from '@mui/material/transitions'
import DeleteIcon from '@mui/icons-material/Delete'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

type message = {
  title: string
  content: string
}

export default function ConfirmAdmin(props: message) {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Button
        onClick={handleClickOpen}
        variant="contained"
        color="error"
        size="small"
        startIcon={<DeleteIcon />}
      >
        Xóa
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ fontSize: '2rem' }}>{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontSize: '1.6rem' }} id="alert-dialog-slide-description">
            {props.content}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ '& .MuiButton-root': { fontSize: '1.4rem' } }}>
          <Button onClick={handleClose}>Xác nhận</Button>
          <Button onClick={handleClose}>Hủy</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
