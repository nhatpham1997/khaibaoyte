import { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'

const theme = createTheme()

export default function AdminPassword() {
  const [dataUser, setDataUser] = useState<any>([])
  const [id, setId] = useState<any>()
  const [validPassCurrent, setValidPassCurrent] = useState(false)
  const [messPassCurrent, setMessPassCurrent] = useState('')
  const [validPassConfirm, setValidPassConfirm] = useState(false)
  const [messPassConfirm, setMessPassConfirm] = useState('')
  const [validPassNew, setValidPassNew] = useState(false)
  const [messPassNew, setMessPassNew] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      const dataUsers = await axios.get('https://dbkhaibaoyte.herokuapp.com/admin')
      setDataUser(dataUsers.data)

      setId(localStorage.getItem('adminId'))
    }
    fetchData()
  }, [])

  const handleChangePassword = async (response: any, passwordNew: any) => {
    const result = axios.put(`https://dbkhaibaoyte.herokuapp.com/admin/${id}`, {
      ...response,
      password: passwordNew,
    })
    // console.log(result)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data: any = new FormData(event.currentTarget)
    // console.log({
    //   currentPassword: data.get('current_password'),
    //   passwordNew: data.get('password_new'),
    //   passwordConfirm: data.get('password_confirm'),
    // })

    const response = dataUser.filter((item: any) => item.id.toString() === id.toString())
    if (response.length < 0) {
      return
    }
    if (response[0].password === data.get('current_password')) {
      setValidPassCurrent(false)
      setMessPassCurrent('')

      if (data.get('password_new') === data.get('current_password')) {
        setValidPassNew(true)
        setMessPassNew('mật khẩu mới không được trùng với mật khẩu cũ!')
      } else {
        if (data.get('password_new').length < 6 && data.get('password_confirm').length < 6) {
          setValidPassNew(true)
          setMessPassNew('mật khẩu mới phải lớn hơn 5 kí tự')
          setValidPassConfirm(true)
          setMessPassConfirm(' mật khẩu mới phải lớn hơn 5 kí tự !')

          return
        }
        if (data.get('password_new') === data.get('password_confirm')) {
          setValidPassNew(false)
          setMessPassNew('')
          setValidPassConfirm(false)
          setMessPassConfirm('')

          handleChangePassword(response[0], data.get('password_new'))

          alert(' thay đổi mật khẩu thành công!')
          navigate('/admin')
        } else {
          setValidPassConfirm(true)
          setMessPassConfirm('Mật khẩu không trùng khớp!')
          setValidPassNew(false)
          setMessPassNew('')
        }
      }
    } else {
      setValidPassCurrent(true)
      setMessPassCurrent('Mật khẩu hiện tại không đúng!')
      setValidPassNew(true)
      setMessPassNew('Mật khẩu hiện tại không đúng!')
      setValidPassConfirm(true)
      setMessPassConfirm('Mật khẩu hiện tại không đúng!')
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          mx: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <span style={{ fontSize: '1.6rem', fontWeight: 'bold' }}>Đổi Mật khẩu Admin</span>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{
            mt: 1,
            '& input': { fontSize: '1.4rem' },
            '& .MuiOutlinedInput-input': { fontSize: '1.4rem' },
          }}
        >
          <TextField
            InputProps={{ style: { fontSize: '1.4rem' } }}
            InputLabelProps={{ style: { fontSize: '1.4rem' } }}
            helperText={messPassCurrent}
            error={validPassCurrent}
            margin="normal"
            required
            fullWidth
            id="current_password"
            label="Mật khẩu cũ"
            name="current_password"
            autoComplete="current_password"
            autoFocus
            type="password"
          />
          <TextField
            InputProps={{ style: { fontSize: '1.4rem' } }}
            InputLabelProps={{ style: { fontSize: '1.4rem' } }}
            helperText={messPassNew}
            error={validPassNew}
            margin="normal"
            required
            fullWidth
            name="password_new"
            label="Mật khẩu mới"
            type="password"
            id="password_new"
            autoComplete="password_new"
          />
          <TextField
            InputProps={{ style: { fontSize: '1.4rem' } }}
            InputLabelProps={{ style: { fontSize: '1.4rem' } }}
            helperText={messPassConfirm}
            error={validPassConfirm}
            margin="normal"
            required
            fullWidth
            name="password_confirm"
            label="Nhập lại mật khẩu mới"
            type="password"
            id="password_confirm"
            autoComplete="password_confirm"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, fontSize: '1.4rem' }}
          >
            Save
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  )
}
