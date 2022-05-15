import { GetUserScheduleDTO, UpdateScheduleDTO } from '@/contracts'
import HeatmapBoard from '@/presentation/components/HeatmapBoard'
import ScheduleBoard from '@/presentation/components/ScheduleBoard'
import FakeScheduleRepository from '@/repositories/FakeScheduleRepository'
import { DayTime, Schedule, TimeboxValue, User } from '@/types'
import { fakeUsers, userFakeSchedule } from '@/util/fakedata'
import { Container } from './style'

import { Tabs } from 'antd'
import { FormEvent, useEffect, useState } from 'react'
import { days, times } from '@/domain/daystimes'
const { TabPane } = Tabs

const fakeScheduleRepository = new FakeScheduleRepository(userFakeSchedule)

const ScheduleOrHeatmap: React.FC = () => {
  const [username, setUsername] = useState('')
  const roomId = 'test-room-id'
  const user: User = {
    name: username,
    id: 'test-user-id',
    schedule: userFakeSchedule
  }
  const [users, setUsers] = useState<User[]>([])

  async function getCurrentUserSchedule(): Promise<Schedule> {
    return await fakeScheduleRepository.getAll({ roomId, userId: user.id })
  }

  async function updateCurrentUserSchedule(updateScheduleInfo: [DayTime, TimeboxValue]): Promise<void> {
    const [dayTime, timeboxValue] = updateScheduleInfo
    const currentUser = users.find(u => u.id === user.id) as User
    const otherUsers = users.filter(u => u.id !== user.id)
    currentUser.schedule = {
      ...currentUser.schedule,
      [dayTime]: timeboxValue
    }
    setUsers([currentUser, ...otherUsers])
    await fakeScheduleRepository.update({ dayTime, roomId, userId: user.id, timeboxValue })
  }

  function handleChangeUsername(event: FormEvent<HTMLInputElement>) {
    event.preventDefault()
    setUsername(event.currentTarget.value)
  }

  function updateUsername(username: string) {
    const currentUser = users.find(u => u.id === user.id) as User
    const otherUsers = users.filter(u => u.id !== user.id)
    currentUser.name = username
    setUsers([currentUser, ...otherUsers])
  }

  useEffect(() => {
    async function loadUsers() {
      setUsers([user, ...fakeUsers])
    }

    loadUsers()
  }, [])

  return (
    <Container>
      <div>
        Bem vindo, <input
          size={25}
          onChange={handleChangeUsername}
          onBlur={() => updateUsername(username)}
          placeholder={'Clique aqui para mudar seu nome'}
          value={user.name}
          type="text"
          name="name"
          id="user-name" />
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
            users={users}
          />
        </TabPane>
      </Tabs>
    </Container>
  )
}


export default ScheduleOrHeatmap