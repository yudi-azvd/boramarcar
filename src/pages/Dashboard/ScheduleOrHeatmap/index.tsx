import Schedule from "../Schedule"
import Day from '@/data/Day'
import TimeboxValue from '@/data/TimeboxValue'
import { Container, Menu } from "./style"
import { Button } from "antd"
import { useState } from "react"
import Heatmap from "../Heatmap"
import DayTime from "@/data/DayTime"
import Time from "@/data/Time"

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
] as Time[]

const days: Day[] = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
]

const timeboxValues = {
  'Monday-08h00': 'available',
  'Monday-09h00': 'busy',
} as {
    [key in DayTime]: TimeboxValue
  }

const ScheduleOrHeatmap: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'schedule' | 'heatmap'>('schedule')
  const [values, setValues] = useState(timeboxValues)

  return (
    <Container>
      <Menu>
        <Button onClick={() => setSelectedTab('schedule')} size="large" type={selectedTab === 'schedule' ? 'primary' : 'default'}>
          Cronograma
        </Button>

        <Button onClick={() => setSelectedTab('heatmap')} size="large" type={selectedTab === 'heatmap' ? 'primary' : 'default'}>
          Mapa de calor
        </Button>
      </Menu>

      <div className="schedule-or-heatmap">
        <Schedule data={{ days, times, values }} visible={selectedTab === 'schedule'} />
        <Heatmap data={{ days, times, values }} visible={selectedTab === 'heatmap'} />
      </div>
    </Container>
  )
}

export default ScheduleOrHeatmap