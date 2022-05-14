import Heatmap, { HeatmapUser } from '@/presentation/components/Heatmap'
import Schedule from '@/presentation/components/Schedule'
import FakeScheduleRepository from '@/repositories/FakeScheduleRepository'
import { Day, Time } from '@/types'
import { Container } from './style'

import { Tabs } from 'antd'
import { useEffect, useState } from 'react'
const { TabPane } = Tabs

const ScheduleOrHeatmap: React.FC = () => {
  const userId = 'test-user-id'
  const roomId = 'test-room-id'
  const days: Day[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const times: Time[] = ['08h', '09h', '10h', '11h', '12h', '13h', '14h', '15h', '16h', '17h', '18h', '19h', '20h', '21h']
  const [users, setUsers] = useState<HeatmapUser[]>([])
  const fakeScheduleRepository = new FakeScheduleRepository({
    'Sunday-08h': 'available',
    'Sunday-09h': 'busy',
    'Tuesday-08h': 'available',
    'Tuesday-09h': 'busy',
    'Monday-08h': 'available',
    'Wednesday-19h': 'busy'
  })

  useEffect(() => {
    async function loadUsers() {
      setUsers([
        {
          name: 'Euzinho',
          id: 'user-1',
          schedule: await fakeScheduleRepository.getAll({ userId, roomId })
        },
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
            userId={userId}
            scheduleRepository={fakeScheduleRepository}
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