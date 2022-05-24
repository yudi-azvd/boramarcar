import { useAuth } from '@/presentation/hooks/auth'
import { Container, Content } from './styles'

import { Button, Form, Input, notification } from 'antd'
import { useNavigate } from 'react-router-dom'

import logo from '@/presentation/assets/logo.svg'

const CreateRoom: React.FC = () => {
  const navigate = useNavigate()
  const { signup } = useAuth()

  async function handleSubmit({ roomname, username }: { username: string, roomname: string }) {
    try {
      const roomId = 'theOnlyRoomId'
      const user = await signup(username)
      // const roomId = await createRoom(roomname, user.id)
      navigate('/dashboard', { state: { roomId } })
      // navigate(`/r/${roomId}`)
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

        <Form onFinish={handleSubmit} name="create-form" layout='vertical'>
          <Form.Item label="Seu nome" name="username" rules={[{ required: true, min: 4, max: 16, }]}>
            <Input type="text" placeholder="Tanjiro Kamado" required />
          </Form.Item>
          <Form.Item label="Nome da sala" name="roomname" rules={[{ min: 4, max: 16, }]}>
            <Input type="text" placeholder="Aldeia da Folha" />
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit" size="large" style={{ width: '100%' }} type="primary">Criar sala</Button>
          </Form.Item>
        </Form>
      </Content>
    </Container>
  )
}

export default CreateRoom