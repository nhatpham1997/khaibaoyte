import React, { useContext, useState } from 'react'
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
import { GlobalContext } from 'contexts'
import { Box } from '@mui/system'

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
  const [open, setOpen] = useState(false)
  const {
    users,
    dataUsers,
    admins,
    dataAdmins,
    movingRegister,
    dataMovingRegister,
    movingDeclaration,
    dataMovingDeclaration,
  } = useContext(GlobalContext)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleDelete = async (id?: number) => {
    if (props.account === 'User') {
      const response = await axios.delete(`https://dbkhaibaoyte.herokuapp.com/user/${id}`)

      if (response.status === 200) {
        const newData = users.filter((item) => item.id !== id)
        // lọc danh sách đăng kí
        const dataRegister = movingRegister.filter((item: any) => item.userId == id)
        const newDataRegister = movingRegister.filter((item: any) => item.userId !== id)
        // lọc danh sách khai báo
        const dataDeclaration = movingDeclaration.filter((item: any) => item.userId == id)
        const newDataDeclaration = movingDeclaration.filter((item: any) => item.userId !== id)

        if (dataRegister) {
          dataRegister.forEach(async (item: any) => {
            const result = await axios.delete(
              `https://dbkhaibaoyte.herokuapp.com/moving_register/${item.id}`
            )
            if (result.status === 200) {
              dataMovingRegister([...newDataRegister])
            }
          })
        }

        if (dataDeclaration) {
          dataRegister.forEach(async (item: any) => {
            const result = await axios.delete(
              `https://dbkhaibaoyte.herokuapp.com/moving_declaration/${item.id}`
            )
            if (result.status === 200) {
              dataMovingDeclaration([...newDataDeclaration])
            }
          })
        }

        dataUsers([...newData])
        setOpen(false)
      } else {
        alert('Vui lòng thử lại')
      }
    } else {
      const response = await axios.delete(`https://dbkhaibaoyte.herokuapp.com/admin/${id}`)
      console.log(response)
      if (response.status === 200) {
        const newData = admins.filter((item) => item.id !== id)
        dataAdmins([...newData])
        setOpen(false)
      } else {
        alert('Vui lòng thử lại')
      }
    }
  }

  return (
    <>
      {users.length > 0 && (
        <Box>
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
            <DialogTitle sx={{ fontSize: '1.6rem', fontWeight: 'bold' }}>{props.title}</DialogTitle>
            <DialogContent>
              <DialogContentText
                id="alert-dialog-slide-description"
                sx={{ fontSize: '1.4rem', fontWeight: '600' }}
              >
                {props.content}
              </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ '& .MuiButton-root': { fontSize: '1.4rem' } }}>
              <Button onClick={() => handleDelete(props.id)}>Xác nhận</Button>
              <Button onClick={handleClose}>Hủy</Button>
            </DialogActions>
          </Dialog>
        </Box>
      )}
    </>
  )
}
