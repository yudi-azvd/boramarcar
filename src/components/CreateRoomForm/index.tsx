import CreateRoomRequest from "@/data/CreateRoomRequest"
import { Button, Col, Form, Input, Modal, notification, Row, Select, Switch } from "antd"
import { useState } from "react"
import Spin from "@/components/Spin"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/hooks/auth"
const { Option } = Select

interface Props {
  visible: boolean
  onCancel: ((e: React.MouseEvent<HTMLElement, MouseEvent>) => void) | undefined
  onSubmit: (values: CreateRoomRequest) => Promise<void>
}

const CreateRoomForm: React.FC<Props> = ({ visible, onCancel }: Props) => {
  const navigate = useNavigate()
  const { createRoom } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (createRoomRequest: CreateRoomRequest) => {
    try {
      if (isLoading)
        return // evita enviar o formulário novamente

      setIsLoading(true)
      await createRoom(createRoomRequest)
      navigate('/dashboard')
    } catch (error) {
      if (error instanceof Error) {
        setIsLoading(false)
        notification.error({
          message: error.message,
          description: error.stack
        })
      }
    }
  }

  return (
    <Modal
      title="Create Room"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="create-room-footer-spin" type="text">
          <Spin spinning={isLoading} />
        </Button>,
        <Button disabled={isLoading} form="create-room" key="submit" htmlType="submit">Create</Button>
      ]}
    >
      <Form
        name="create-room"
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ timeboxDuration: '1h', daysStartAt: '8h', daysEndAt: '22h', roomName: 'War Room' }}
      >
        <Row>
          <Col className="gutter-row" span={12}>
            <Form.Item style={{ paddingRight: '8px' }} name="userName" label="Your name" rules={[{ required: true, message: 'A name is required!' }]}>
              <Input placeholder="Tanjiro Kamado" />
            </Form.Item>
          </Col>

          <Col className="gutter-row" span={12}>
            <Form.Item style={{ paddingLeft: '8px' }} name="roomName" label="Room name" rules={[{ max: 16 }]}>
              <Input placeholder="War Room" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item name="timeboxDuration" label="Timebox Duration">
          <Select disabled>
            <Option value="30min" > 30min </Option>
            <Option value="1h" > 1h </Option>
            <Option value="2h" > 2h </Option>
          </Select>
        </Form.Item>

        <Row>
          <Col className="gutter-row" span={12}>
            <Form.Item style={{ paddingRight: '8px' }} name="daysStartAt" label="Days start at">
              <Select disabled>
                <Option value="07h"> 07h </Option>
                <Option value="08h"> 08h </Option>
                <Option value="09h"> 09h </Option>
                <Option value="10h"> 10h </Option>
              </Select>
            </Form.Item>
          </Col>

          <Col className="gutter-row" span={12}>
            <Form.Item style={{ paddingLeft: '8px' }} name="daysEndAt" label="Days end at">
              <Select disabled>
                <Option value="20h"> 20h </Option>
                <Option value="21h"> 21h </Option>
                <Option value="22h"> 22h </Option>
                <Option value="00h"> 00h </Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item name="weekendDays" label="Weekend Days?" labelAlign="left" valuePropName="checked">
          <Switch disabled />
        </Form.Item>

      </Form>
    </Modal>
  )
}

export default CreateRoomForm