import logo from '@/presentation/assets/logo'
import { useAuth } from '@/presentation/hooks/auth'
import { Link } from 'react-router-dom'

import { Container } from './styles'

export const Header: React.FC = () => {
  const { user } = useAuth()

  return (
    <Container>
      <div>
        <img width={40} src={logo} alt="Logo do Bora Marcar" />
      </div>

      {!!user.id && (
        <div className="auth-info">
          Você está logado como <strong>{user.name}</strong>
        </div>
      )}

      <div>
        <Link to="/about">
          Sobre
        </Link>
      </div>
    </Container>
  )
}
