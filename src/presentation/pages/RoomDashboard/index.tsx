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
import { CheckOutlined, LeftOutlined } from '@ant-design/icons'
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
  const [selectedUsersToCompare, setSelectedUsersToCompare] = useState<User[]>([])

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

  // TODO: otimizar essa procura. Talvez seja possível usar Set pra lembrar dos
  // usuários selecionados (pelos IDs?). Além disso, ficar duplicando usuário
  // também duplica o schedule dele. E tem mais uma procura lá embaixo na
  // renderização.
  function toggleUserInSelectedUsers(userId: string) {
    const clickedUser = selectedUsersToCompare.find((u) => u.id === userId) as User
    const isClickedUserSelected = !!clickedUser
    if (isClickedUserSelected) {
      setSelectedUsersToCompare(selectedUsersToCompare.filter((u) => u.id !== userId))
    } else {
      const selectedUser = otherUsers.find((u) => u.id === userId) as User
      setSelectedUsersToCompare([selectedUser, ...selectedUsersToCompare])
    }
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
          otherUsers={selectedUsersToCompare.length !== 0 ? selectedUsersToCompare : otherUsers}
          currentUserScheduleUpdateEmitter={emitter}
          getCurrentUserSchedule={getCurrentUserSchedule}
        />

        <RoomInfo>
          <List
            locale={{ emptyText: 'Não há outros participantes nessa sala' }}
            header={<h3>Participantes</h3>}
            dataSource={otherUsers.map((u) => `${u.name}#--${u.id}`)}
            renderItem={(item: string) => {
              const [name, id] = item.split('#--')
              const isSelected = !!selectedUsersToCompare.find((u) => u.id === id)
              return (
                <List.Item
                  onClick={() => toggleUserInSelectedUsers(id)}
                >
                  <span className={`${isSelected ? 'selected' : ''}`}>
                    {name}
                  </span>
                  <CheckOutlined
                    style={{
                      color: isSelected ? 'green' : 'transparent',
                      transition: 'color 0.2s',
                      stroke: 'red',
                      fontSize: 20,
                    }}
                  />
                </List.Item>
              )
            }}
          />
        </RoomInfo>
      </Content>
    </Container>
  )
}

export default RoomDashboard
