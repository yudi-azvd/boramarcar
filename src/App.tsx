import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { SocketProvider } from './hooks/socket'
import Dashboard from './pages/Dashboard'

import Home from './pages/Home'

import GlobalStyle from './styles/global'

function App() {
  return (
    <>
      <SocketProvider>
        <GlobalStyle />
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/dashboard' element={<Dashboard />} />
          </Routes>
        </Router>
      </SocketProvider>
    </>
  )
}

export default App
