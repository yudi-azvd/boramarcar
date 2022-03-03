import Schedule, { Day, ScheduleProps, TimeboxValue } from "@/components/Schedule"
import { useSocket } from "@/hooks/socket"
import { Tooltip } from "antd"
import { useState } from "react"

const times = [
  '08h00',
  '09h00',
  '10h00',
  '11h00',
  '12h00',
  '13h00',
  '14h00',
  '15h00',
  '16h00',
  '17h00',
  '18h00',
  '19h00',
  '20h00',
]

const days = [
  'Monday',
  'Tuesday',
  'Wednesday'
] as Day[]

const values = {
  'Monday-08h00': 'available' as 'available' | 'busy' | undefined,
  'Monday-09h00': 'busy' as 'available' | 'busy' | undefined
}

const Dashboard: React.FC = () => {
  const { user } = useSocket()
  const [values, setValues] = useState<{[key: string]: TimeboxValue}>({})

  // const {room} = useRoom()
  /**
   * room: {
   *  id: string
   *  owner: User | string (username|id)
   *  participants: User[]
   *  linkToShare: string
   * }
   */

  return (
    <div>
      <h1>Heatmap-Schedule</h1>
      <Tooltip title={user?.id}>
        <p>{user?.name} seu ID é {user?.id}</p>
        {user?.isOwner ?? <span>Você é o dono da sala</span>}
      </Tooltip>

      <Schedule data={{ days, times, values }} />
    </div>
  )
}

export default Dashboard