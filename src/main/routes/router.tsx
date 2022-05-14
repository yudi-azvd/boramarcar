import Dashboard from '@/presentation/pages/Dashboard'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/devnotes' element={
          (() => (
          <div><h1>Notas de desenvolvimento</h1></div>)
          )()}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default Router