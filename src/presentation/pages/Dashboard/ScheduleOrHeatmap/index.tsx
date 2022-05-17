import { Schedule, User, Timebox } from '@/types'
import HeatmapBoard from '@/presentation/components/HeatmapBoard'
import ScheduleBoard from '@/presentation/components/ScheduleBoard'
import { days, times } from '@/domain/daystimes'
import { Container } from './style'

import { Tabs } from 'antd'
import { useEffect, useState } from 'react'
import { useAuth } from '@/presentation/hooks/auth'
import { getUsers, listenToOtherUsersScheduleUpdates, theOnlyRoomId, emitUserScheduleUpdate, getUserById } from '@/db'
import { Link, useNavigate } from 'react-router-dom'

const { TabPane } = Tabs

interface ScheduleOrHeatmap {
  
}

const ScheduleOrHeatmap: React.FC = () => {
  const roomId = 'theOnlyRoomId'
  const navigate = useNavigate()
  const { user: currentUser, signout } = useAuth()
  const [user, setUser] = useState(currentUser)
  const [otherUsers, setOtherUsers] = useState<User[]>([])

  async function getCurrentUserSchedule(): Promise<Schedule> {
    const gotUser = await getUserById(user.id)
    return gotUser.schedule
  }

  async function updateCurrentUserSchedule(timeboxUpdate: Timebox): Promise<void> {
    await emitUserScheduleUpdate({ roomId, userId: user.id, timebox: timeboxUpdate })
    // const newSchedule: Schedule = { 
    //   ...user.schedule, 
    //   [timeboxUpdate.dayAndTime]: timeboxUpdate.availability 
    // }
    // setUser({ ...user, schedule: newSchedule })
  }

  function handleUsersScheduleUpdate(usersWithNewSchedules: User[]) {
    const thisUser = usersWithNewSchedules.find(u => u.id === user.id)
    const _otherUsers = usersWithNewSchedules.filter(u => u.id !== user.id)
    setUser(thisUser as User)
    setOtherUsers(_otherUsers)
  }

  useEffect(() => {
    async function loadUsers() {
      const loadedUsers = await getUsers(roomId)
      setUser(loadedUsers.find(u => u.id === user.id) as User)
      setOtherUsers(loadedUsers.filter(u => u.id !== user.id))
    }

    loadUsers()
    const unsubscribe = listenToOtherUsersScheduleUpdates(roomId,
      handleUsersScheduleUpdate)
    return () => unsubscribe()
  }, [])

  async function handleUserLogout() {
    await signout()
    navigate('/')
  }

  return (
    <Container>
      <div>
        <p>
          <Link to="/" onClick={handleUserLogout}>
            Sair e voltar para a página principal
          </Link>
        </p>
      </div>

      <div>
        <p>
          Bem vindo, {user.name}
        </p>
      </div>

      <Tabs defaultActiveKey="1" size="large">
        <TabPane tab="Cronograma" key="1">
          <ScheduleBoard
            days={days}
            times={times}
            getCurrentUserSchedule={getCurrentUserSchedule}
            updateCurrentUserSchedule={updateCurrentUserSchedule}
          />
        </TabPane>

        <TabPane tab="Mapa de calor" key="2">
          <HeatmapBoard
            days={days}
            times={times}
            users={[user, ...otherUsers]}
          />
        </TabPane>
      </Tabs>
    </Container>
  )
}


export default ScheduleOrHeatmap