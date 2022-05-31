import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from '@/presentation/hooks/auth'
import InitialPage from '@/presentation/pages/InitialPage'
import Dashboard from '@/presentation/pages/Dashboard'
import DevNotes from '@/presentation/pages/DevNotes'

import SignUp from '@/presentation/pages/SignUp'
import UserRooms from '@/presentation/pages/UserRooms'
import RequireAuth from './RequireAuth'
import makeUserRooms from '../factories/UserRoomsFactory'

const Router: React.FC = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InitialPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/devnotes" element={<DevNotes />} />

        <Route element={<RequireAuth />}>
          {/* <Route path='/rooms' element={<UserRooms />} /> */}
          <Route path="/rooms" element={makeUserRooms()} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Outras rotas privadas vão aqui */}
        </Route>
      </Routes>
    </BrowserRouter>
  </AuthProvider>
)

export default Router
