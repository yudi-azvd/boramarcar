import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from '@/presentation/hooks/auth'

import InitialPage from '@/presentation/pages/InitialPage'
import RoomDashboard from '@/presentation/pages/RoomDashboard'
import SignUp from '@/presentation/pages/SignUp'
import SignIn from '@/presentation/pages/SignIn'
import About from '@/presentation/pages/About'
import DevNotes from '@/presentation/pages/DevNotes'

import makeUserRooms from '@/main/factories/UserRoomsFactory'
import { Header } from '@/presentation/components/Header'
import RequireAuth from './RequireAuth'
import RequireNoAuth from './RequireNoAuth'

const Router: React.FC = () => (
  <AuthProvider>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route element={<RequireNoAuth />}>
          <Route path="/" element={<InitialPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Route>

        <Route element={<RequireAuth />}>
          <Route path="/rooms" element={makeUserRooms()} />
          <Route path="/r/:roomId" element={<RoomDashboard />} />
        </Route>

        <Route path="/devnotes" element={<DevNotes />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
)

export default Router
