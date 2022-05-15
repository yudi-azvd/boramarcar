import { AuthProvider } from '@/presentation/hooks/auth'
import ChooseName from '@/presentation/pages/ChooseName'
import Dashboard from '@/presentation/pages/Dashboard'
import DevNotes from '@/presentation/pages/DevNotes'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const Router: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* pra fazer autenticação de verdade */}
          {/* https://reactrouter.com/docs/en/v6/components/navigate */}
          <Route path='/' element={<ChooseName />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/devnotes' element={<DevNotes />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default Router