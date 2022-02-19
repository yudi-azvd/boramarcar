import { Button, Form, Input, Modal } from "antd"

interface Props {
  visible: boolean
  onCancel: ((e: React.MouseEvent<HTMLElement, MouseEvent>) => void) | undefined
  onSubmit: ((values: any) => void) | undefined
}

export interface JoinRoomData {
  username: string
  roomId: string
}

const JoinRoomForm: React.FC<Props> = ({ visible, onCancel, onSubmit}: Props) => {
  return (
    <Modal
      title="Join Room"
      visible={visible}
      onCancel={onCancel}
      onOk={() => {}}
      footer={[
        <Button form='join-room' key="submit" htmlType='submit'>Join</Button>
      ]}
    >
      <Form
        name="join-room"
        layout='vertical'
        onFinish={onSubmit}
      >
        <Form.Item name="username" label="Your name" rules={[{ required: true, message: 'A name is required!' }]}>
          <Input placeholder="King Arthur" />
        </Form.Item>

        <Form.Item name="roomId" label="Room ID" rules={[{ required: true, message: 'Don\'t forget the room ID!' }]}>
          <Input placeholder="98asjdb182uAjdsj" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default JoinRoomForm