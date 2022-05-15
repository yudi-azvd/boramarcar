import FakeScheduleRepository from '@/repositories/FakeScheduleRepository'
import { DayTime, Time, TimeboxValue, User } from '@/types'
import HeatmapBoard from '@/presentation/components/HeatmapBoard'
import ScheduleBoard from '@/presentation/components/ScheduleBoard'
import { fakeUsers, fakeUser } from '@/util/fakedata'
import { days, times } from '@/domain/daystimes'
import { Container } from './style'

import { Tabs } from 'antd'
import { useEffect, useState } from 'react'
import { useAuth } from '@/presentation/hooks/auth'
import { getUsers, listenToScheduleChangesInRoom, theOnlyRoomId, updateUserScheduleInRoom } from '@/db'

const { TabPane } = Tabs

const fakeScheduleRepository = new FakeScheduleRepository(fakeUser.schedule)

const ScheduleOrHeatmap: React.FC = () => {
  const roomId = 'test-room-id'
  const user = fakeUser
  const [otherUsers, setOtherUsers] = useState<User[]>([])

  async function getCurrentUserSchedule(): Promise<Schedule> {
    return await fakeScheduleRepository.getAll({ roomId, userId: user.id })
  }

  async function updateCurrentUserSchedule(updateScheduleInfo: [DayTime, TimeboxValue]): Promise<void> {
    const [dayTime, timeboxValue] = updateScheduleInfo
    await fakeScheduleRepository.update({ roomId, userId: user.id, dayTime, timeboxValue })
  }

  useEffect(() => {
    async function loadUsers() {
      const loadedUsers = await getUsers(roomId)
      console.log(loadedUsers);
      setOtherUsers(fakeUsers)
    }
    loadUsers()
    const unsubscribe = listenToScheduleChangesInRoom(roomId, handleUsersScheduleChange)
    return () => unsubscribe()
  }, [])

  return (
    <Container>
      <div>
        Bem vindo, {user.name}
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
            roomId={roomId}
            users={[user, ...otherUsers]}
          />
        </TabPane>
      </Tabs>
    </Container>
  )
}


export default ScheduleOrHeatmap