import { Button, Col, Form, Input, Modal, Row, Select, Switch } from "antd"
import { InputGroup } from "./styles"
const { Option } = Select

interface Props {
  visible: boolean
  onCancel: ((e: React.MouseEvent<HTMLElement, MouseEvent>) => void) | undefined
  onSubmit: (values: CreateRoomData) => void
  createRoomService: any
}

export interface CreateRoomData {
  username: string
  roomId: string
  timeboxDuration: string
  daysStartAt: string
  daysEndAt: string
  weekendDays: boolean
}

const CreateRoomForm: React.FC<Props> = ({ visible, onCancel, onSubmit, createRoomService }: Props) => {
  const handleSubmit = (values: CreateRoomData) => {
    onSubmit(values)
  }

  return (
    <Modal
      title="Create Room"
      visible={visible}
      onCancel={onCancel}
      onOk={() => { }}
      footer={[
        <Button form='create-room' key="submit" htmlType='submit'>Create</Button>
      ]}
    >
      <Form
        name="create-room"
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ timeboxDuration: '1h', daysStartAt: '8h', daysEndAt: '22h' }}
      >
        <Form.Item name="username" label="Your name" rules={[{ required: true, message: 'A name is required!' }]}>
          <Input placeholder="Tanjiro Kamado" />
        </Form.Item>

        <Form.Item name="timeboxDuration" label="Timebox Duration">
          <Select>
            <Option value="30min" > 30min </Option>
            <Option value="1h" > 1h </Option>
            <Option value="2h" > 2h </Option>
          </Select>
        </Form.Item>

        <Row>
          <Col className="gutter-row" span={12}>
            <Form.Item style={{ paddingRight: '8px' }} name="daysStartAt" label="Days start at">
              <Select>
                <Option value="07h"> 07h </Option>
                <Option value="08h"> 08h </Option>
                <Option value="09h"> 09h </Option>
                <Option value="10h"> 10h </Option>
              </Select>
            </Form.Item>
          </Col>

          <Col className="gutter-row" span={12}>
            <Form.Item style={{ paddingLeft: '8px' }} name="daysEndAt" label="Days end at">
              <Select>
                <Option value="20h"> 20h </Option>
                <Option value="21h"> 21h </Option>
                <Option value="22h"> 22h </Option>
                <Option value="00h"> 00h </Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item name="weekendDays" label="Weekend Days?" labelAlign="left">
          <Switch />
        </Form.Item>

      </Form>
    </Modal>
  )
}

export default CreateRoomForm