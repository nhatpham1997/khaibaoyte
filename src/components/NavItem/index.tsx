import { Link } from 'react-router-dom'
import './NavItem.css'

interface props {
  className: string
  text: string
  selected: boolean
  to: string
}

function NavItem({ text, className, selected, to }: props) {
  function handleClick(e: any) {
    const navItems = document.querySelectorAll('.nav-item')
    navItems.forEach((navItem) => navItem.classList.remove('selected'))
    e.target.classList.add('selected')
  }

  return (
    <Link onClick={(e) => handleClick(e)} to={to} className={`nav-item ${selected && 'selected'}`}>
      <i className={`nav-item-icon ${className} `}></i>
      <p className="nav-item-text">{text}</p>
    </Link>
  )
}

export default NavItem
