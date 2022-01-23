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
import axios from 'axios'

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
  account: string
  id?: number
}

export default function ConfirmAdmin(props: message) {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleDelete = () => {
    const deleteAccount = async () => {
      const response = await axios.delete(`https://dbkhaibaoyte.herokuapp.com/user/${props.id}`)
      console.log(response)
      setOpen(false)
    }
    deleteAccount()
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
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">{props.content}</DialogContentText>
        </DialogContent>
        <DialogActions sx={{ '& .MuiButton-root': { fontSize: '1.4rem' } }}>
          <Button onClick={handleDelete}>Xác nhận</Button>
          <Button onClick={handleClose}>Hủy</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
