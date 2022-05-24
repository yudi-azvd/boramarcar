import { Button, Form, Input, Modal, Spin } from "antd"
import { useState } from "react"

interface CreateRoomModalProps {
  visible: boolean
  onCancel: ((e: React.MouseEvent<HTMLElement, MouseEvent>) => void) | undefined
}

const CreateRoomModalForm: React.FC<CreateRoomModalProps> = ({ visible = false, onCancel }) => {
  const [isLoading, setIsLoading] = useState(false)
  // https://github.com/yudi-azvd/heatmap-schedule/blob/caa64d8c11100d1a1828983b6a373d7ba663942a/src/components/CreateRoomForm/index.tsx
  // https://github.com/yudi-azvd/heatmap-schedule/blob/caa64d8c11100d1a1828983b6a373d7ba663942a/src/pages/Home/index.tsx
  return (
    <Modal
      title="Criar sala"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button form="create-room" type="primary" key="submit" htmlType="submit">
          Criar sala
        </Button>
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

export default CreateRoomModalForm