import {
  Button, Form, Input, Modal, notification,
} from 'antd'
import { JoinRoom } from '@/contracts'
import { Room } from '@/domain/types'

interface JoinRoomModalFormProps {
  visible: boolean
  userId: string
  joinRoom: JoinRoom
  onCancel: ((e: React.MouseEvent<HTMLElement, MouseEvent>) => void) | undefined
  addRoom: (room: Room) => void
}

const JoinRoomModalForm: React.FC<JoinRoomModalFormProps> = ({
  visible = false,
  userId,
  onCancel,
  joinRoom,
  addRoom,
}) => {
  async function handleFinish({ roomId }: { roomId: string }) {
    try {
      const trimmedRoomId = roomId.trim()
      const room = await joinRoom(trimmedRoomId, userId)
      notification.success({
        message: 'Sala adicionada com sucesso!',
      })

      addRoom(room)
    } catch (error) {
      notification.error({
        message: 'Alguma coisa deu errado :(',
        description: String(error),
      })
    }
  }

  return (
    <Modal
      title="Entrar em sala"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button form="join-room" type="primary" key="submit" htmlType="submit">
          Entrar
        </Button>,
      ]}
    >
      <Form
        name="join-room"
        layout="vertical"
        onFinish={handleFinish}
      >
        <Form.Item name="roomId" label="ID da sala" rules={[{ required: true, whitespace: false }]}>
          <Input type="text" placeholder="-Nkds82k12..." />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default JoinRoomModalForm
