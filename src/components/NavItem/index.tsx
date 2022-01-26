import { Link } from 'react-router-dom'
import './NavItem.css'

interface props {
  className: string
  text: string
  selected: boolean
  to: string
  index?: number
  setTab?: any
  setTitleHeader?: any
}

function NavItem({ text, className, selected, to, index, setTab, setTitleHeader }: props) {
  function handleClick(e: any) {
    setTitleHeader(e.target.innerText)
    localStorage.setItem('title', e.target.innerText)
    setTab(e.target.dataset.index)
    localStorage.setItem('tabIndex', e.target.dataset.index)
    const navItems = document.querySelectorAll('.nav-item')
    navItems.forEach((navItem) => navItem.classList.remove('selected'))
    e.target.classList.add('selected')
  }

  return (
    <Link
      onClick={(e) => handleClick(e)}
      to={to}
      data-index={index}
      className={`nav-item ${selected && 'selected'}`}
    >
      <i className={`nav-item-icon ${className} `}></i>
      <p className="nav-item-text">{text}</p>
    </Link>
  )
}

export default NavItem
