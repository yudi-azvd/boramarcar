import Dashboard from '@/presentation/pages/Dashboard'
import DevNotes from '@/presentation/pages/DevNotes'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/devnotes' element={<DevNotes />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default Router