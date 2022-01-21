import FavoriteIcon from '@mui/icons-material/Favorite'
import CopyrightIcon from '@mui/icons-material/Copyright'
import './Footer.css'

function Footer() {
  return (
    <div className="footer">
      <CopyrightIcon sx={{ marginRight: '4px' }} /> 2022, made with{' '}
      <FavoriteIcon sx={{ marginRight: '4px', marginLeft: '4px' }} /> by{' '}
      <span style={{ fontWeight: 'bold', marginLeft: '4px', marginRight: '4px' }}>
        rikkeisoft fresher frontend
      </span>
      for a better web.
    </div>
  )
}

export default Footer
