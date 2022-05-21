import { AuthProvider } from '@/presentation/hooks/auth'
import ChooseName from '@/presentation/pages/ChooseName'
import Dashboard from '@/presentation/pages/Dashboard'
import DevNotes from '@/presentation/pages/DevNotes'

import RequireAuth from './RequireAuth'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const Router: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ChooseName />} />
          <Route path='/devnotes' element={<DevNotes />} />

          <Route element={<RequireAuth />}>
            <Route path='/dashboard' element={<Dashboard />} />
            {/* Outras rotas privadas vão aqui */}
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default Router