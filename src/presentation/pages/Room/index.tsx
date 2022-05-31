import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  FirebaseCurrentUserScheduleUpdateEmitter,
  firebaseGetUserById,
  firebaseGetUsers,
  firebaseListenToOtherUsersScheduleUpdates,
} from '@/data/firebase/db'
import { useAuth } from '@/presentation/hooks/auth'
import { Schedule, User } from '@/domain/types'

import ScheduleOrHeatmap from './ScheduleOrHeatmap'
import { Container } from './style'

const Room: React.FC = () => {
  const { roomId } = useParams() as { roomId: string }
  const { user: currentUser } = useAuth()
  const [user, setUser] = useState(currentUser)
  const [otherUsers, setOtherUsers] = useState<User[]>([])

  const emitter = new FirebaseCurrentUserScheduleUpdateEmitter(
    roomId,
    user.id,
  )

  async function getCurrentUserSchedule(): Promise<Schedule> {
    const gotUser = await firebaseGetUserById(roomId, user.id)
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
      <h1>Dashboard</h1>
      <div>
        <p>
          <Link to="/rooms">
            Voltar para as minhas salas
          </Link>
        </p>
      </div>

      <ScheduleOrHeatmap
        user={user}
        otherUsers={otherUsers}
        currentUserScheduleUpdateEmitter={emitter}
        getCurrentUserSchedule={getCurrentUserSchedule}
      />
    </Container>
  )
}

export default Room
