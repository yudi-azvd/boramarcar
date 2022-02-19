import { useState } from 'react'
import { Button, notification } from 'antd'

import { Container, Content } from './styles'

import logo from '../../assets/heatmap-schedule.png'
import JoinRoomForm, { JoinRoomData } from '../../components/JoinRoomForm'

const Home: React.FC = () => {
  const [isJoinRoomFormVisible, setIsJoinRoomFormVisible] = useState(false)

  const toggleJoinRoomModalVisibility = () => {
    setIsJoinRoomFormVisible(!isJoinRoomFormVisible)
  }

  const handleJoinRoomCancel = () => {
    setIsJoinRoomFormVisible(false)
  }

  const handleSubmit = (values: JoinRoomData) => {
    console.log(values);
    notification['success']({
      message: 'Information sent:',
      description: JSON.stringify(values) + "\nnot really"
    })
  }

  return (
    <Container>
      <Content>
        <img src={logo} width={150} />

        <h1>Heatmap Schedule</h1>

        <div>
          <Button disabled > Create room </Button>

          <Button onClick={toggleJoinRoomModalVisibility}>
            Join room
          </Button>
        </div>

      </Content>

      <JoinRoomForm 
        visible={isJoinRoomFormVisible}
        onCancel={handleJoinRoomCancel}
        onSubmit={handleSubmit}
      />
    </Container>
  )
}

export default Home