import { Link } from 'react-router-dom'
import ScheduleOrHeatmap from './ScheduleOrHeatmap'
import { Container } from './style'

const Dashboard: React.FC = () => {

  return (
    <Container>
      <h1>Dashboard</h1>
      <ScheduleOrHeatmap />
    </Container>
  )
}

export default Dashboard