import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from '@/presentation/hooks/auth'
import InitialPage from '@/presentation/pages/InitialPage'
import Room from '@/presentation/pages/Room'
import DevNotes from '@/presentation/pages/DevNotes'

import SignUp from '@/presentation/pages/SignUp'
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
          <Route path="/r/:roomId" element={<Room />} />
          {/* Outras rotas privadas vão aqui */}
        </Route>
      </Routes>
    </BrowserRouter>
  </AuthProvider>
)

export default Router
