import {
  Button, Form, Input, notification,
} from 'antd'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/presentation/hooks/auth'
import logo from '@/presentation/assets/logo'

import { Container, Content } from './styles'

const SignIn: React.FC = () => {
  const navigate = useNavigate()
  const { signin } = useAuth()

  async function handleSubmit({ userId }: { userId: string }) {
    try {
      await signin(userId)
      navigate('/rooms')
    } catch (error) {
      notification.error({
        message: 'Alguma coisa deu errado',
        description: String(error),
      })
    }
  }

  return (
    <Container>
      <Content>
        <img width={120} src={logo} alt="Logo" />

        <Form onFinish={handleSubmit} name="signin" layout="vertical">
          <Form.Item label="Seu ID" name="userId" rules={[{ required: true }]}>
            <Input type="text" required />
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit" size="large" style={{ width: '100%' }} type="primary">Entrar</Button>
          </Form.Item>
        </Form>
      </Content>
    </Container>
  )
}

export default SignIn
