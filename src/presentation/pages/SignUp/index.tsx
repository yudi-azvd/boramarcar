import { useAuth } from "@/presentation/hooks/auth"
import logo from "@/presentation/assets/logo"

import { Container, Content } from "./styles"

import { Button, Form, Input, notification } from "antd"
import { useNavigate } from "react-router-dom"


const SignUp: React.FC = () => {
  const navigate = useNavigate()
  const { signup } = useAuth()

  async function handleSubmit({ username }: { username: string }) {
    try {
      await signup(username)
      navigate('/rooms')
    } catch (error) {
      notification.error({
        message: 'Alguma coisa deu errado',
        description: String(error)
      })
    }
  }

  return (
    <Container>
      <Content>
        <img width={120} src={logo} alt="Logo" />

        <Form onFinish={handleSubmit} name="signup" layout='vertical'>
          <Form.Item label="Seu nome" name="username" rules={[{ required: true, min: 4, max: 16, }]}>
            <Input type="text" placeholder="Tanjiro Kamado" required />
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit" size="large" style={{ width: '100%' }} type="primary">Criar conta</Button>
          </Form.Item>
        </Form>
      </Content>
    </Container>
  )
}

export default SignUp