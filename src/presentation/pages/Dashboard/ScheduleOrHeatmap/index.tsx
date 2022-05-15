import { GetUserScheduleDTO, UpdateScheduleDTO } from '@/contracts'
import Heatmap from '@/presentation/components/Heatmap'
import Schedule from '@/presentation/components/Schedule'
import FakeScheduleRepository from '@/repositories/FakeScheduleRepository'
import { Day, DayTime, Time, TimeboxValue, User } from '@/types'
import { Container } from './style'

import { Tabs } from 'antd'
import { useEffect, useState } from 'react'
import { useAuth } from '@/presentation/hooks/auth'
import { getUsers, listenToScheduleChangesInRoom, theOnlyRoomId, updateUserScheduleInRoom } from '@/db'
const { TabPane } = Tabs

const days: Day[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const times: Time[] = ['08h', '09h', '10h', '11h', '12h', '13h', '14h', '15h', '16h', '17h', '18h', '19h', '20h', '21h']

const fakeScheduleRepository = new FakeScheduleRepository({})

const ScheduleOrHeatmap: React.FC = () => {
  const roomId = theOnlyRoomId
  const { user } = useAuth()
  const [users, setUsers] = useState<User[]>([user])


  async function getUserSchedule(getUserScheduleInfo: GetUserScheduleDTO): Promise<{ [key in DayTime]?: TimeboxValue }> {
    return await fakeScheduleRepository.getAll(getUserScheduleInfo)
  }

  async function updateUserSchedule(updateScheduleInfo: UpdateScheduleDTO): Promise<void> {
    const currentUser = users.find(u => u.id === updateScheduleInfo.userId) as User
    const otherUsers = users.filter(u => u.id !== updateScheduleInfo.userId)
    console.log({user});
    
    currentUser.schedule = {
      ...currentUser.schedule,
      [updateScheduleInfo.dayTime]: updateScheduleInfo.timeboxValue
    }
    setUsers([currentUser, ...otherUsers])
    await fakeScheduleRepository.update(updateScheduleInfo)
    await updateUserScheduleInRoom(updateScheduleInfo)
  }

  function handleUsersScheduleChange(schedules: {
    [key: string]: { [key in DayTime]?: TimeboxValue }
  }) {
    // https://firebase.google.com/docs/database/web/read-and-write#web_value_events
    // onValue, na primeira chamada 
    if (schedules === null)
      return
    console.log({ users }, { schedules });

    const updatedUsers = Object.keys(schedules)
      .map(user_id => {
        const userToChange = users.find(u => u.id === user_id) as User
        userToChange.schedule = schedules[user_id]
        return userToChange as User
      })
    setUsers(updatedUsers)
  }

  useEffect(() => {
    async function loadUsers() {
      const loadedUsers = await getUsers(roomId)
      console.log(loadedUsers);
      setUsers(loadedUsers)
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