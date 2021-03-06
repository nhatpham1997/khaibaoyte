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
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const theme = createTheme()

export default function ForgotPassword() {
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
      const dataUsers = await axios.get('https://dbkhaibaoyte.herokuapp.com/user')
      setDataUser(dataUsers.data)

      setId(localStorage.getItem('userId'))
    }
    fetchData()
  }, [])

  const handleChangePassword = async (response: any, passwordNew: any) => {
    const result = axios.put(`https://dbkhaibaoyte.herokuapp.com/user/${id}`, {
      ...response,
      password: passwordNew,
    })
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
        setMessPassNew('m???t kh???u m???i kh??ng ???????c tr??ng v???i m???t kh???u c??!')
      } else {
        if (data.get('password_new').length < 6 && data.get('password_confirm').length < 6) {
          setValidPassNew(true)
          setMessPassNew('m???t kh???u m???i ph???i l???n h??n 5 k?? t???')
          setValidPassConfirm(true)
          setMessPassConfirm(' m???t kh???u m???i ph???i l???n h??n 5 k?? t??? !')

          return
        }
        if (data.get('password_new') === data.get('password_confirm')) {
          setValidPassNew(false)
          setMessPassNew('')
          setValidPassConfirm(false)
          setMessPassConfirm('')

          handleChangePassword(response[0], data.get('password_new'))

          alert(' thay ?????i m???t kh???u th??nh c??ng!')
          navigate('/user')
        } else {
          setValidPassConfirm(true)
          setMessPassConfirm('M???t kh???u kh??ng tr??ng kh???p!')
          setValidPassNew(false)
          setMessPassNew('')
        }
      }
    } else {
      setValidPassCurrent(true)
      setMessPassCurrent('M???t kh???u hi???n t???i kh??ng ????ng!')
      setValidPassNew(true)
      setMessPassNew('M???t kh???u hi???n t???i kh??ng ????ng!')
      setValidPassConfirm(true)
      setMessPassConfirm('M???t kh???u hi???n t???i kh??ng ????ng!')
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
        <Typography component="h1" variant="h5" sx={{ fontSize: '18px' }}>
          Thay ?????i m???t kh???u
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 1, maxWidth: { xs: '100%', lg: '60%' } }}
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
            label="M???t kh???u hi???n t???i!"
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
            label="M???t kh???u m???i "
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
            label="X??c nh???n m???t kh???u m???i!"
            type="password"
            id="password_confirm"
            autoComplete="password_confirm"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, fontSize: '14px', py: '10px' }}
          >
            l??u m???t kh???u
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  )
}
