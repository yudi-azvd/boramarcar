import {
  Button, Form, Input, Modal, notification,
} from 'antd'
import { CreateRoom } from '@/contracts'
import { Room } from '@/domain/types'

interface CreateRoomModalProps {
  userId: string
  visible: boolean
  randomRoomname: string
  onCancel: ((e: React.MouseEvent<HTMLElement, MouseEvent>) => void) | undefined
  createRoom: CreateRoom
  addRoom: (room: Room) => void
}

interface CreateRoomFormValues {
  name: string
}

const CreateRoomModalForm: React.FC<CreateRoomModalProps> = ({
  userId,
  visible = false,
  randomRoomname,
  onCancel,
  createRoom,
  addRoom,
}) => {
  // const [isLoading, setIsLoading] = useState(false)
  const randomName = randomRoomname
  async function handleFinish(values: CreateRoomFormValues) {
    const roomname = values.name || randomName

    try {
      const newRoom = await createRoom(roomname, userId)
      addRoom(newRoom)
      notification.success({
        message: 'Sala criada com sucesso!',
        description: `Você já pode entrar na sala ${newRoom.name}`,
      })
    } catch (error) {
      notification.error({
        message: 'Aconteceu algum erro :(',
        description: String(error),
      })
    }
  }
  // https://github.com/yudi-azvd/heatmap-schedule/blob/caa64d8c11100d1a1828983b6a373d7ba663942a/src/components/CreateRoomForm/index.tsx
  // https://github.com/yudi-azvd/heatmap-schedule/blob/caa64d8c11100d1a1828983b6a373d7ba663942a/src/pages/Home/index.tsx
  return (
    <Modal
      title="Criar sala"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button form="create-room" type="primary" key="submit" htmlType="submit">
          Criar
        </Button>,
      ]}
    >
      <Form
        name="create-room"
        layout="vertical"
        onFinish={handleFinish}
      >
        <Form.Item name="name" label="Nome da sala" rules={[{ min: 4, max: 16 }]}>
          <Input type="text" placeholder={randomName} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreateRoomModalForm
