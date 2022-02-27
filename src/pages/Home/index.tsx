import { useState } from 'react'
import { Button, notification } from 'antd'

import { Container, Content } from './styles'

import logo from '@/assets/heatmap-schedule.png'
import JoinRoomForm, { JoinRoomData } from '../../components/JoinRoomForm'
import JoinRoomService from '@/services/JoinRoomService'
import CreateRoomForm, { CreateRoomData } from '@/components/CreateRoomForm'
import CreateRoomService from '@/services/CreateRoomService'
import { useSocket } from '@/hooks/socket'
import { useNavigate } from 'react-router-dom'

const Home: React.FC = () => {
  const navigate = useNavigate()
  const { createRoom, joinRoom, registerJoinRoomCallbacks } = useSocket()
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

  registerJoinRoomCallbacks({
    onSuccess: () => {
      navigate('/dashboard')
    },
    onFailure: () => {
      notification.error({
        message: 'Room does not exist',
        description: 'Check the room ID with the owner'
      })
    }
  })

  const handleJoinSubmit = (joinRoomData: JoinRoomData) => {
    joinRoom(joinRoomData)
  }

  const handleCreateSubmit = (values: CreateRoomData) => {
    createRoom(values)
    navigate('/dashboard')
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