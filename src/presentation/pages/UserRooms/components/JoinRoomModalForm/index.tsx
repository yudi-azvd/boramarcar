import { JoinRoom } from "@/contracts"
import { Button, Form, Input, Modal } from "antd"

interface JoinRoomModalFormProps {
  visible: boolean
  userId: string
  joinRoom: JoinRoom
  onCancel: ((e: React.MouseEvent<HTMLElement, MouseEvent>) => void) | undefined
}

const JoinRoomModalForm: React.FC<JoinRoomModalFormProps> = ({ 
  visible = false,
  userId,
  onCancel,
  joinRoom
}) => {

  async function handleFinish({ roomId }: { roomId: string }) {
    console.log('>>> handle finissh');
    await joinRoom(roomId, userId)
  }

  return (
    <Modal
      title="Entrar em sala"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button form="join-room" type="primary" key="submit" htmlType="submit">
          Entrar
        </Button>
      ]}
    >
      <Form
        name="join-room"
        layout="vertical"
        onFinish={handleFinish}
      >
        <Form.Item name="roomId" label="ID da sala" rules={[{ required: true }]}>
          <Input type="text" placeholder="-Nkds82k12" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default JoinRoomModalForm