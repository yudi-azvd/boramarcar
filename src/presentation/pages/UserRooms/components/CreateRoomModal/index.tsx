import { Button, Form, Input, Modal } from "antd"
import { useState } from "react"

interface CreateRoomModalProps {
  visible: boolean
}

const CreateRoomModal: React.FC<CreateRoomModalProps> = ({ visible = false }) => {
  const [isV, setIsV] = useState(visible)
  return (
    <Modal
      title="Criar sala"
      visible={isV}
      onCancel={() => setIsV(false)}
      footer={[
        <Button form="create-room" type="primary" key="submit" htmlType="submit"> Criar sala </Button>
      ]}
    >
      <Form name="create-room" layout="vertical">
        <Form.Item name="name" label="Nome da sala" rules={[{ min: 4, max: 16, required: true }]}>
          <Input type="text" placeholder="Aldeia da Folha" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreateRoomModal