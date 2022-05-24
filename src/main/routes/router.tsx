import { AuthProvider } from '@/presentation/hooks/auth'
import InitialPage from '@/presentation/pages/InitialPage'
import Dashboard from '@/presentation/pages/Dashboard'
import DevNotes from '@/presentation/pages/DevNotes'

import RequireAuth from './RequireAuth'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignUp from '@/presentation/pages/SignUp'
import UserRooms from '@/presentation/pages/UserRooms'

const Router: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<InitialPage />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/devnotes' element={<DevNotes />} />

          <Route element={<RequireAuth />}>
            <Route path='/rooms' element={<UserRooms />} />
            <Route path='/dashboard' element={<Dashboard />} />
            {/* Outras rotas privadas vão aqui */}
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default Router