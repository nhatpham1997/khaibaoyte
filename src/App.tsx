import GlobalProvider, { GlobalContext } from 'contexts'
import { useContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LayoutUser from './components/LayoutUser'
import AccountAdmin from './containers/AdminPage/AccountAdmin'
import AccountUser from 'containers/AdminPage/AccountUser'
import LayoutAdmin from './components/LayoutAdmin'

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
            <Route path="account-admin" element={<AccountAdmin />} />
            <Route path="account-admin/:id" element={'đây là trang chi tiết Admin'} />
            <Route path="account-user" element={<AccountUser />} />
            <Route path="account-user/:id" element={'đây là trang chi tiết'} />
          </Route>
        </Routes>
      </GlobalProvider>
    </BrowserRouter>
  )
}

export default App
