import HeaderLeft from 'components/HeaderLeft'
import HeaderRight from 'components/HeaderRight'
import './Header.css'

interface props {
  titleHeader: string
  setShowNav: any
  showNav: any
}

function Header({ titleHeader, setShowNav, showNav }: props) {
  return (
    <div className="header">
      <HeaderLeft titleHeader={titleHeader} />
      <HeaderRight showNav={showNav} setShowNav={setShowNav} />
    </div>
  )
}

export default Header
