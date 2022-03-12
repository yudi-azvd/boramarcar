import { useState } from 'react'
import { Button, notification } from 'antd'

import { Container, Content } from './styles'

import logo from '@/assets/heatmap-schedule.png'
import JoinRoomForm, { JoinRoomData } from '../../components/JoinRoomForm'
import JoinRoomService from '@/services/JoinRoomService'
import CreateRoomForm from '@/components/CreateRoomForm'
import { useAuth } from '@/hooks/auth'
import { useNavigate } from 'react-router-dom'
import CreateRoomRequest from '@/data/CreateRoomRequest'

const Home: React.FC = () => {
  const navigate = useNavigate()
  const { createRoom, joinRoom } = useAuth()
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

  const handleJoinSubmit = async (joinRoomRequest: JoinRoomData) => {
    try {
      await joinRoom(joinRoomRequest)
      navigate('/dashboard')
    } catch (error) {
      notification.error({
        message: 'aconteceu alguma coisa de errado',
        description: 'oi'
      })
    }
  }

  const handleCreateSubmit = async (createRoomRequest: CreateRoomRequest) => {
    await createRoom(createRoomRequest)
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
      />
    </Container>
  )
}

export default Home