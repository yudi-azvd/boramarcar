import { Tabs } from 'antd'
import { CurrentUserScheduleUpdateEmitter, GetCurrentUserSchedule } from '@/contracts'
import HeatmapTab from '@/presentation/components/HeatmapTab'
import ScheduleTab from '@/presentation/components/ScheduleTab'
import { days, times } from '@/domain/daystimes'
import { User } from '@/domain/types'

import { Container } from './style'

const { TabPane } = Tabs

interface ScheduleOrHeatmapProps {
  user: User
  otherUsers: User[]
  currentUserScheduleUpdateEmitter: CurrentUserScheduleUpdateEmitter
  getCurrentUserSchedule: GetCurrentUserSchedule
}

const ScheduleOrHeatmap: React.FC<ScheduleOrHeatmapProps> = ({
  user,
  otherUsers,
  getCurrentUserSchedule,
  currentUserScheduleUpdateEmitter,
}) => (
  <Container>
    <div>
      <p>
        Bem vindo,
        {user.name}
      </p>
    </div>

    <Tabs defaultActiveKey="1" size="large">
      <TabPane tab="Cronograma" key="1">
        <ScheduleTab
          days={days}
          times={times}
          getCurrentUserSchedule={getCurrentUserSchedule}
          currentUserScheduleUpdateEmitter={currentUserScheduleUpdateEmitter}
        />
      </TabPane>

      <TabPane tab="Mapa de calor" key="2">
        <HeatmapTab
          days={days}
          times={times}
          users={[user, ...otherUsers]}
        />
      </TabPane>
    </Tabs>
  </Container>
)

export default ScheduleOrHeatmap
