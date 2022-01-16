import GlobalProvider, { GlobalContext } from 'contexts'
import { useContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LayoutUser from './components/LayoutUser'
import LayoutAdmin from './components/LayoutAdmin'
import AccountAdmin from './containers/AdminPage/AccountAdmin'
import AdminDetail from 'containers/AdminPage/AdminDetail'
import AccountUser from 'containers/AdminPage/AccountUser'
import UserDetail from 'containers/AdminPage/UserDetail'

function App() {
  const data = useContext(GlobalContext)
  console.log(data)

  return (
    <BrowserRouter>
      <GlobalProvider>
        <Routes>
          <Route path="/" element={<LayoutUser />} />
          <Route path="/admin/*" element={<LayoutAdmin />}>
            <Route path="" element={'Dây là trang Admin'} />
            <Route path="account-admin/*" element={<AccountAdmin />} />
            <Route path="account-admin/:id" element={<AdminDetail />} />
            <Route path="account-user" element={<AccountUser />} />
            <Route path="account-user/:id" element={<UserDetail />} />
          </Route>
        </Routes>
      </GlobalProvider>
    </BrowserRouter>
  )
}

export default App
