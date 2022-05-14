import Heatmap from '@/presentation/components/Heatmap'
import Schedule from '@/presentation/components/Schedule'
import FakeUserTimeboxesRepository from '@/repositories/FakeUserTimeboxesRepository'
import { Day, Time } from '@/types'
import { Container } from './style'

import { Tabs } from 'antd'
const { TabPane } = Tabs

const ScheduleOrHeatmap: React.FC = () => {
  const days: Day[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const times: Time[] = ['08h', '09h', '10h', '11h', '12h', '13h', '14h', '15h', '16h', '17h', '18h', '19h', '20h', '21h']

  return (
    <Container>
      <Tabs defaultActiveKey="1" size="large">
        <TabPane tab="Cronograma" key="1">
          <Schedule
            days={days}
            times={times}
            userTimeboxesRepository={
              new FakeUserTimeboxesRepository('user-id', {
                'Sunday-08h': 'available',
                'Wednesday-19h': 'busy'
              })
            }
          />
        </TabPane>

        <TabPane tab="Mapa de calor" key="2">
          <Heatmap
            days={days}
            times={times}
          />
        </TabPane>
      </Tabs>
    </Container>
  )
}

export default ScheduleOrHeatmap