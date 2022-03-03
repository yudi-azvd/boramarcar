import Schedule, { Day, TimeboxValue } from "@/components/Schedule"
import { Menu } from "./style"
import { Button} from "antd"
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
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
] as Day[]

const timeboxValues = {
  'Monday-08h00': 'available',
  'Monday-09h00': 'busy',
} as {
  [key: string]: TimeboxValue
}

const ScheduleOrHeatmap: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'schedule' | 'heatmap'>('schedule')
  const [values, setValues] = useState(timeboxValues)

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
      <Menu>
        <Button size="large" type="text">
          Cronograma
        </Button>

        <Button size="large" type="text" disabled>
          Mapa de calor
        </Button>
      </Menu>
      
      <Schedule data={{ days, times, values }} />
    </div>
  )
}

export default ScheduleOrHeatmap