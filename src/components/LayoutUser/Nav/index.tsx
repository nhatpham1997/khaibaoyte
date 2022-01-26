import NavItem from 'components/NavItem'
import { useState } from 'react'
import './nav.css'

interface props {
  setTitleHeader: any
  showNav: any
}

function Nav({ setTitleHeader, showNav }: props) {
  const [tab, setTab] = useState(localStorage.getItem('tabIndex') || '1')

  return (
    <div className={`nav ${showNav && 'is-show'}`}>
      <div className="nav-header">
        <img
          alt="Rikkeisoft ベトナムオフショア開発"
          src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Logo-Rikkei.png"
          className="nav-logo"
        />
        <p className="nav-text">Khai Báo Y Tế</p>
      </div>
      <div className="nav-list">
        <NavItem
          setTitleHeader={setTitleHeader}
          setTab={setTab}
          index={1}
          selected={tab === '1' ? true : false}
          className="fas fa-laptop-medical"
          text="Khai báo di chuyển"
          to="/user"
        />
        <NavItem
          setTitleHeader={setTitleHeader}
          setTab={setTab}
          index={2}
          selected={tab === '2' ? true : false}
          className="fas fa-book-medical"
          text="Tờ khai di chuyển của tôi"
          to="/user/list-declaration"
        />
        <NavItem
          setTitleHeader={setTitleHeader}
          setTab={setTab}
          index={3}
          selected={tab === '3' ? true : false}
          className="fas fa-suitcase-rolling"
          text="Đăng kí di chuyển"
          to="/user/moving-register"
        />
        <NavItem
          setTitleHeader={setTitleHeader}
          setTab={setTab}
          index={4}
          selected={tab === '4' ? true : false}
          className="fas fa-receipt"
          text="Thông tin đăng ký di chuyển"
          to="/user/list-moving-register"
        />
        <NavItem
          setTitleHeader={setTitleHeader}
          setTab={setTab}
          index={5}
          selected={tab === '5' ? true : false}
          className="fas fa-user"
          text="Thay đổi thông tin cá nhân"
          to="/user/personal-information"
        />
        <NavItem
          setTitleHeader={setTitleHeader}
          setTab={setTab}
          index={6}
          selected={tab === '6' ? true : false}
          className="fas fa-key"
          text="Đổi mật khẩu"
          to="/user/change-password"
        />
      </div>
    </div>
  )
}

export default Nav
