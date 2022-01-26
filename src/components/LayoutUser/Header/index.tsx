import HeaderLeft from 'components/HeaderLeft'
import HeaderRight from 'components/HeaderRight'
import './Header.css'

interface props {
  titleHeader: string
}

function Header({ titleHeader }: props) {
  return (
    <div className="header">
      <HeaderLeft titleHeader={titleHeader} />
      <HeaderRight />
    </div>
  )
}

export default Header
