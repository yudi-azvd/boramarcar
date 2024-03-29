import { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import {
  FirebaseCurrentUserScheduleUpdateEmitter,
  firebaseGetUserInRoomById,
  firebaseGetUsers,
  firebaseListenToOtherUsersScheduleUpdates,
} from '@/data/firebase/db'
import { useAuth } from '@/presentation/hooks/auth'
import { Room, Schedule, User } from '@/domain/types'

import { List } from 'antd'
import { LeftOutlined } from '@ant-design/icons'
import ScheduleOrHeatmap from './ScheduleOrHeatmap'
import {
  Container, Content, RoomInfo, Top,
} from './style'

const RoomDashboard: React.FC = () => {
  const { state: { room } } = useLocation() as { state: { room: Room } }
  const { roomId } = useParams() as { roomId: string }
  const { user: currentUser } = useAuth()
  const [user, setUser] = useState(currentUser)
  const [otherUsers, setOtherUsers] = useState<User[]>([])

  const emitter = new FirebaseCurrentUserScheduleUpdateEmitter(
    roomId,
    user.id,
  )

  async function getCurrentUserSchedule(): Promise<Schedule> {
    const gotUser = await firebaseGetUserInRoomById(roomId, user.id)
    return gotUser.schedule
  }

  function handleUsersScheduleUpdate(usersWithNewSchedules: User[]) {
    const thisUser = usersWithNewSchedules.find((u) => u.id === user.id)
    const _otherUsers = usersWithNewSchedules.filter((u) => u.id !== user.id)
    setUser(thisUser as User)
    setOtherUsers(_otherUsers)
  }

  useEffect(() => {
    async function loadUsers() {
      const loadedUsers = await firebaseGetUsers(roomId)
      setUser(loadedUsers.find((u) => u.id === user.id) as User)
      setOtherUsers(loadedUsers.filter((u) => u.id !== user.id))
    }

    loadUsers()
    const unsubscribe = firebaseListenToOtherUsersScheduleUpdates(
      roomId,
      handleUsersScheduleUpdate,
    )
    return () => unsubscribe()
  }, [])

  return (
    <Container>
      <Link to="/rooms">
        <LeftOutlined />
        {/* TODO: arranjar nome melhor  */}
        Voltar para as minhas salas
      </Link>

      <Content>
        <Top>
          <div>
            <h1>
              Sala: <strong>{room.name}</strong>
            </h1>
            <h2>ID da sala: {room.id}</h2>
            <p>Compartilhe o ID da sala para que outras pessoas também entrem aqui</p>
          </div>
          <div>
            <p />
          </div>
        </Top>

        <ScheduleOrHeatmap
          user={user}
          otherUsers={otherUsers}
          currentUserScheduleUpdateEmitter={emitter}
          getCurrentUserSchedule={getCurrentUserSchedule}
        />

        <RoomInfo>
          <List
            locale={{ emptyText: 'Não há outros participantes nessa sala' }}
            header={<h3>Participantes</h3>}
            dataSource={otherUsers.map((u) => u.name)}
            renderItem={(item: string) => (
              <List.Item>
                {item}
              </List.Item>
            )}
          />
        </RoomInfo>
      </Content>
    </Container>
  )
}

export default RoomDashboard
