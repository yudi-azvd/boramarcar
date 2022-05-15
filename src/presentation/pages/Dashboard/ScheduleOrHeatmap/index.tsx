import { GetUserScheduleDTO, UpdateScheduleDTO } from '@/contracts'
import HeatmapBoard from '@/presentation/components/HeatmapBoard'
import ScheduleBoard from '@/presentation/components/ScheduleBoard'
import FakeScheduleRepository from '@/repositories/FakeScheduleRepository'
import { Day, DayTime, Schedule, Time, TimeboxValue, User } from '@/types'
import { fakeUsers, userFakeSchedule } from '@/util/fakedata'
import { Container } from './style'

import { Tabs } from 'antd'
import { FormEvent, useEffect, useState } from 'react'
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
  const days: Day[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const times: Time[] = ['08h', '09h', '10h', '11h', '12h', '13h', '14h', '15h', '16h', '17h', '18h', '19h', '20h', '21h']
  const [users, setUsers] = useState<User[]>([])

  async function getUserSchedule(getUserScheduleInfo: GetUserScheduleDTO): Promise<Schedule> {
    return await fakeScheduleRepository.getAll(getUserScheduleInfo)
  }

  async function updateUserSchedule(updateScheduleInfo: UpdateScheduleDTO): Promise<void> {
    const currentUser = users.find(u => u.id === updateScheduleInfo.userId) as User
    const otherUsers = users.filter(u => u.id !== updateScheduleInfo.userId)
    currentUser.schedule = {
      ...currentUser.schedule,
      [updateScheduleInfo.dayTime]: updateScheduleInfo.timeboxValue
    }
    setUsers([currentUser, ...otherUsers])
    await fakeScheduleRepository.update(updateScheduleInfo)
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
            roomId={roomId}
            userId={user.id}
            getUserScheduleInThisRoom={getUserSchedule}
            updateUserScheduleInThisRoom={updateUserSchedule}
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