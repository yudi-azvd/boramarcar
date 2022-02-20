import { useState } from 'react'
import { Button, notification } from 'antd'

import { Container, Content } from './styles'

import logo from '@/assets/heatmap-schedule.png'
import JoinRoomForm, { JoinRoomData } from '../../components/JoinRoomForm'
import JoinRoomService from '@/services/JoinRoomService'
import CreateRoomForm, { CreateRoomData } from '@/components/CreateRoomForm'
import CreateRoomService from '@/services/CreateRoomService'

const Home: React.FC = () => {
  const [isJoinRoomFormVisible, setIsJoinRoomFormVisible] = useState(false)
  const [isCreateRoomFormVisible, setIsCreateRoomFormVisible] = useState(false)

  const toggleJoinRoomModalVisibility = () =>
    setIsJoinRoomFormVisible(!isJoinRoomFormVisible)

  const toggleCreateRoomModalVisibility = () =>
    setIsCreateRoomFormVisible(!isCreateRoomFormVisible)

  const handleCreateRoomCancel = () =>
    setIsCreateRoomFormVisible(false)

  const handleJoinRoomCancel = () =>
    setIsJoinRoomFormVisible(false)

  const handleJoinSubmit = (values: JoinRoomData) => {
    notification['success']({
      message: 'Information to be sent:',
      description: JSON.stringify(values)
    })
  }

  const handleCreateSubmit = (values: CreateRoomData) => {
    notification['success']({
      message: 'Information to be sent:',
      description: JSON.stringify(values)
    })
  }

  return (
    <Container>
      <Content>
        <img src={logo} width={150} />

        <h1>Heatmap Schedule</h1>

        <div>
          <Button onClick={toggleJoinRoomModalVisibility}>
            Join room
          </Button>

          <Button onClick={toggleCreateRoomModalVisibility}>
            Create room
          </Button>
        </div>

      </Content>

      <JoinRoomForm
        visible={isJoinRoomFormVisible}
        onCancel={handleJoinRoomCancel}
        onSubmit={handleJoinSubmit}
        joinRoomService={new JoinRoomService("api")}
      />

      <CreateRoomForm
        visible={isCreateRoomFormVisible}
        onCancel={handleCreateRoomCancel}
        onSubmit={handleCreateSubmit}
        createRoomService={new CreateRoomService("api")}
      />
    </Container>
  )
}

export default Home