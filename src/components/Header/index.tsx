import { Container } from './style'

import logo from '../../heatmap-schedule.png'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

const Header: React.FC = () => {
  const navigate = useNavigate()

  return (
    <Container>
      <div>
        <img width={60} src={logo} alt="Logo" />
        <h2>Heatmap Schedule</h2>
      </div>

      <Button onClick={() => navigate('/')}>
        Sair da sala
      </Button>
    </Container>
  )
}

export default Header