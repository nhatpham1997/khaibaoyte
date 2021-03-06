import GlobalProvider from 'contexts'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LayoutUser from './components/LayoutUser'
import LayoutAdmin from './components/LayoutAdmin'
import AccountAdmin from './containers/AdminPage/AccountAdmin'
import AdminDetail from 'containers/AdminPage/AdminDetail'
import AccountUser from 'containers/AdminPage/AccountUser'
import RegisterAdmin from 'containers/AdminPage/RegisterAdmin'
import UserDetail from 'containers/AdminPage/UserDetail'
import EpidemicArea from 'containers/AdminPage/EpidemicArea'
import ApplicationForMoving from 'containers/AdminPage/ApplicationForMoving'
import HomePage from 'containers/AdminPage'
import ChangePassword from 'containers/UserPage/ChangePassword'
import ListDeclaration from 'containers/UserPage/ListDeclaration'
import ListMovingRegister from 'containers/UserPage/ListMovingRegister'
import MovingDeclaration from 'containers/UserPage/MovingDeclaration'
import MovingRegister from 'containers/UserPage/MovingRegister'
import PersonalInformation from 'containers/UserPage/PersonalInformation'
import LoginPage from 'containers/UserPage/LoginForm'
import RegisterForm from 'components/RegisterForm'
import ForgotPassword from 'components/ForgotPassword'
import LoginAdmin from 'containers/AdminPage/LoginAdmin'
import AdminPassword from 'containers/AdminPage/AdminPassword'
import AdminPersonalInformation from 'containers/AdminPage/PersonalInformation'

function App() {
  return (
    <BrowserRouter>
      <GlobalProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/user/*" element={<LayoutUser />}>
            <Route path="" element={<MovingDeclaration />}></Route>
            <Route path="list-declaration" element={<ListDeclaration />}></Route>
            <Route path="moving-register" element={<MovingRegister />}></Route>
            <Route path="list-moving-register" element={<ListMovingRegister />}></Route>
            <Route path="personal-information" element={<PersonalInformation />}></Route>
            <Route path="change-password" element={<ChangePassword />}></Route>
          </Route>

          <Route path="/admin/*" element={<LayoutAdmin />}>
            <Route path="" element={<HomePage />} />
            <Route path="account-admin/*" element={<AccountAdmin />} />
            <Route path="account-admin/:id" element={<AdminDetail />} />
            <Route path="account-user" element={<AccountUser />} />
            <Route path="register-admin" element={<RegisterAdmin />} />
            <Route path="admin-password" element={<AdminPassword />} />
            <Route path="personal-information" element={<AdminPersonalInformation />} />
            <Route path="account-user/:id" element={<UserDetail />} />
            <Route path="application-for-moving" element={<ApplicationForMoving />} />
            <Route path="epidemic-area" element={<EpidemicArea />} />
          </Route>
        </Routes>
      </GlobalProvider>
    </BrowserRouter>
  )
}

export default App
