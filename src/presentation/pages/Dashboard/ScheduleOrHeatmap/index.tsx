import Heatmap, { HeatmapUser } from '@/presentation/components/Heatmap'
import Schedule from '@/presentation/components/Schedule'
import FakeScheduleRepository from '@/repositories/FakeScheduleRepository'
import { Day, DayTime, Time, TimeboxValue } from '@/types'
import { Container } from './style'

import { Tabs } from 'antd'
import { useEffect, useState } from 'react'
import { GetUserScheduleDTO, UpdateScheduleDTO } from '@/contracts'
const { TabPane } = Tabs

const currentUserSchedule:
  { [key in DayTime]?: TimeboxValue } = {
  'Sunday-08h': 'available',
  'Sunday-09h': 'busy',
  'Tuesday-08h': 'available',
  'Tuesday-09h': 'busy',
  'Monday-08h': 'available',
  'Wednesday-19h': 'busy'
}

const fakeScheduleRepository = new FakeScheduleRepository(currentUserSchedule)

const ScheduleOrHeatmap: React.FC = () => {
  const roomId = 'test-room-id'
  const user: HeatmapUser = {
    name: 'Euzinho',
    id: 'test-user-id',
    schedule: currentUserSchedule
  }
  const days: Day[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const times: Time[] = ['08h', '09h', '10h', '11h', '12h', '13h', '14h', '15h', '16h', '17h', '18h', '19h', '20h', '21h']
  const [users, setUsers] = useState<HeatmapUser[]>([])

  async function getUserSchedule(getUserScheduleInfo: GetUserScheduleDTO): Promise<{ [key in DayTime]?: TimeboxValue }> {
    return await fakeScheduleRepository.getAll(getUserScheduleInfo)
  }

  async function updateUserSchedule(updateScheduleInfo: UpdateScheduleDTO): Promise<void> {
    const currentUser = users.find(u => u.id === updateScheduleInfo.userId) as HeatmapUser
    const otherUsers = users.filter(u => u.id !== updateScheduleInfo.userId)
    currentUser.schedule = {
      ...currentUser.schedule,
      [updateScheduleInfo.dayTime]: updateScheduleInfo.timeboxValue
    }
    setUsers([currentUser, ...otherUsers])
    await fakeScheduleRepository.update(updateScheduleInfo)
  }

  useEffect(() => {
    async function loadUsers() {
      setUsers([
        user,
        {
          name: 'Maria',
          id: 'user-2',
          schedule: {
            'Sunday-08h': 'available',
            'Sunday-09h': 'busy',
            'Tuesday-08h': 'available',
            'Tuesday-09h': 'busy',
            "Friday-08h": 'available',
            'Monday-08h': 'available',
            'Wednesday-19h': 'busy',
          }
        },
        {
          name: 'João',
          id: 'user-3',
          schedule: {
            'Sunday-08h': 'available',
            'Sunday-09h': 'busy',
            'Monday-08h': 'busy',
            'Tuesday-08h': 'available',
            'Tuesday-09h': 'busy',
            "Friday-08h": 'available',
            'Wednesday-19h': 'busy',
          }
        },
        {
          name: 'Ana',
          id: 'user-4',
          schedule: {
            'Sunday-08h': 'available',
            'Sunday-09h': 'busy',
            'Tuesday-08h': 'busy',
            'Tuesday-09h': 'available',
            'Monday-08h': 'busy',
            "Friday-08h": 'available',
            'Wednesday-19h': 'busy',
          }
        }
      ])
    }

    loadUsers()
  }, [])

  return (
    <Container>
      <Tabs defaultActiveKey="1" size="large">
        <TabPane tab="Cronograma" key="1">
          <Schedule
            days={days}
            times={times}
            roomId={roomId}
            userId={user.id}
            getUserScheduleInThisRoom={getUserSchedule}
            updateUserScheduleInThisRoom={updateUserSchedule}
          />
        </TabPane>

        <TabPane tab="Mapa de calor" key="2">
          <Heatmap
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