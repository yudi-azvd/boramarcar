import { Button } from 'antd'
import { Link } from 'react-router-dom'
import logo from '@/presentation/assets/logo.svg'
import { Container, Content } from './styles'

const InitialPage: React.FC = () => (
  <Container>
    <Content>
      <img width={120} src={logo} alt="Logo" />

      <div>
        <Link to="/signup">
          <Button size="large" type="primary">
            Criar conta
          </Button>
        </Link>
        <Link to="/signin">
          <Button size="large" type="default">
            Entrar
          </Button>
        </Link>
      </div>
    </Content>
  </Container>
)

export default InitialPage
