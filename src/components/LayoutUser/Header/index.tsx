import HeaderLeft from 'components/HeaderLeft'
import HeaderRight from 'components/HeaderRight'
import './Header.css'

function Header() {
  return (
    <div className="header">
      <HeaderLeft />
      <HeaderRight />
    </div>
  )
}

export default Header
