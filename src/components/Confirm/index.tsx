import * as React from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import { GlobalContext } from 'contexts'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export default function Confirm(props: any) {
  const { setShowConfirm } = React.useContext(GlobalContext)

  return (
    <Snackbar
      open={props.showConfirm}
      autoHideDuration={4000}
      onClose={() => setShowConfirm(false)}
    >
      <Alert
        severity="success"
        sx={{ width: '30rem', color: 'white', fontSize: '1.6rem', bgcolor: '#2e7d32' }}
      >
        {props.content}
      </Alert>
    </Snackbar>
  )
}
