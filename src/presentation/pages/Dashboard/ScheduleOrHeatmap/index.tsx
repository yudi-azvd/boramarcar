import { CurrentUserScheduleUpdateEmitter, GetCurrentUserSchedule } from '@/contracts'
import HeatmapBoard from '@/presentation/components/HeatmapBoard'
import ScheduleBoard from '@/presentation/components/ScheduleBoard'
import { days, times } from '@/domain/daystimes'
import { User } from '@/types'

import { Container } from './style'
import { Tabs } from 'antd'

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
  currentUserScheduleUpdateEmitter
}) => {
  return (
    <Container>
      <div>
        <p>
          Bem vindo, {user.name}
        </p>
      </div>

      <Tabs defaultActiveKey="1" size="large">
        <TabPane tab="Cronograma" key="1">
          <ScheduleBoard
            days={days}
            times={times}
            getCurrentUserSchedule={getCurrentUserSchedule}
            currentUserScheduleUpdateEmitter={currentUserScheduleUpdateEmitter}
          />
        </TabPane>

        <TabPane tab="Mapa de calor" key="2">
          <HeatmapBoard
            days={days}
            times={times}
            users={[user, ...otherUsers]}
          />
        </TabPane>
      </Tabs>
    </Container>
  )
}


export default ScheduleOrHeatmap