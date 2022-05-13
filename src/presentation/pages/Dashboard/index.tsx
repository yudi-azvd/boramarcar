import Schedule from '@/presentation/components/Schedule'
import { Day, DayTime, Time, TimeBoxValue } from '@/types'
import { useEffect, useState } from 'react'

const Dashboard: React.FC = () => {
  const [days, setDays] = useState<Day[]>(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as Day[])
  const [times, setTimes] = useState<Time[]>(['08h', '09h', '10h', '11h', '12h', '13h', '14h', '15h', '16h', '17h', '18h', '19h', '20h', '21h'])
  const [values, setValues] = useState({} as {
    [key in DayTime]?: TimeBoxValue
  })

  useEffect(() => {
    setValues({'Monday-09h': 'available', "Friday-14h": 'busy'})
  }, [])

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Schedule</h2>
      <Schedule
        days={days}
        times={times}
        values={values}
      />
    </div>
  )
}

export default Dashboard