import Schedule from "../Schedule"
import Day from '@/data/Day'
import TimeboxValue from '@/data/TimeboxValue'
import { Container, Menu } from "./style"
import { Button } from "antd"
import { useState } from "react"
import Heatmap from "../Heatmap"
import DayTime from "@/data/DayTime"
import Time from "@/data/Time"
import HeatmapData from "@/data/HeatmapData"

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

const heatmapData: HeatmapData = {
  'Friday-08h00': {
    available: 8,
    busy: 2,
    undefined: 4
  },
  'Monday-12h00': {
    available: 12,
    busy: 0,
    undefined: 2
  }
}

const timeboxValues = {
  'Monday-08h00': 'available',
  'Monday-09h00': 'busy',
} as { [key in DayTime]: TimeboxValue }

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
        <Heatmap heatmapData={heatmapData} data={{ days, times }} visible={selectedTab === 'heatmap'} />
      </div>
    </Container>
  )
}

export default ScheduleOrHeatmap