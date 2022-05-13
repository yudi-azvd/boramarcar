import Schedule from '@/presentation/components/Schedule'
import { Day, DayTime, Time, TimeBoxValue } from '@/types'

const days: Day[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
const times: Time[] = ['08h', '09h', '10h', '11h', '12h', '13h', '14h']
const values: {
  [key in DayTime]?: TimeBoxValue
} = {
  'Sunday-08h': 'available'
}

const Dashboard: React.FC = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <Schedule
        days={days}
        times={times}
        values={values}
      />
    </div>
  )
}

export default Dashboard