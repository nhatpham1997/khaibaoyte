import NavItem from 'components/NavItem'
import './nav.css'

function Nav() {
  return (
    <div className="nav">
      <div className="nav-header">
        <img
          alt="Rikkeisoft ベトナムオフショア開発"
          src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Logo-Rikkei.png"
          className="nav-logo"
        />
        <p className="nav-text">Khai Báo Y Tế</p>
      </div>
      <div className="nav-list">
        <NavItem selected className="fas fa-laptop-medical" text="Khai báo di chuyển" to="/user" />
        <NavItem
          selected={false}
          className="fas fa-book-medical"
          text="Tờ khai di chuyển của tôi"
          to="/user/list-declaration"
        />
        <NavItem
          selected={false}
          className="fas fa-suitcase-rolling"
          text="Đăng kí di chuyển"
          to="/user/moving-register"
        />
        <NavItem
          selected={false}
          className="fas fa-receipt"
          text="Thông tin đăng ký di chuyển"
          to="/user/list-moving-register"
        />
        <NavItem
          selected={false}
          className="fas fa-user"
          text="Thay đổi thông tin cá nhân"
          to="/user/personal-information"
        />
        <NavItem
          selected={false}
          className="fas fa-key"
          text="Đổi mật khẩu"
          to="/user/change-password"
        />
      </div>
    </div>
  )
}

export default Nav
