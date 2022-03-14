import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './hooks/auth'
import { SocketProvider } from './hooks/socket'
import Dashboard from './pages/Dashboard'

import Home from './pages/Home'

import GlobalStyle from './styles/global'

function App() {
  return (
    <>
      <AuthProvider>
        <GlobalStyle />
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/dashboard' element={
              <SocketProvider>
                <Dashboard />
              </SocketProvider>
            } />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  )
}

export default App
