import { useEffect, useState } from 'react'
import {
  CurrentUserScheduleUpdateEmitter, GetCurrentUserSchedule,
} from '@/contracts'
import { englishWeekdaysToPortuguese } from '@/domain/weekdays'
import {
  Day, DayAndTime, Schedule, Time, Availability,
} from '@/domain/types'
import { Container, TimeboxItem } from './styles'

interface ScheduleTabProps {
  times: Time[]
  days: Day[]
  getCurrentUserSchedule: GetCurrentUserSchedule
  currentUserScheduleUpdateEmitter: CurrentUserScheduleUpdateEmitter
}

const ScheduleTab: React.FC<ScheduleTabProps> = ({
  days,
  times,
  getCurrentUserSchedule,
  currentUserScheduleUpdateEmitter,
}) => {
  const [schedule, setSchedule] = useState<Schedule>({})

  async function setTimeBoxValue(dayAndTime: DayAndTime): Promise<void> {
    const old = schedule[dayAndTime]
    let newAvailability: Availability

    if (old === 'available') { newAvailability = 'busy' }
    if (old === 'busy') { newAvailability = undefined }
    if (old === undefined) { newAvailability = 'available' }

    const timebox = { dayAndTime, availability: newAvailability }
    currentUserScheduleUpdateEmitter.emit(timebox)
    setSchedule({ ...schedule, [dayAndTime]: newAvailability })
  }

  useEffect(() => {
    async function getAll() {
      const userSchedule = await getCurrentUserSchedule()
      setSchedule(userSchedule)
    }

    getAll()
  }, [])

  return (
    <Container cols={days.length + 1} rows={times.length + 1} visible>
      <div id="top-left" />

      {days.map((day) => (
        <div className="day" key={`sch-${day}`}>
          {englishWeekdaysToPortuguese[day][0]}
        </div>
      ))}

      {times.map((time) => (
        [
          <div className="time" key={`sch-${time}`}>
            {time}
          </div>,
        ].concat(
          days.map((day) => {
            const dayTime: DayAndTime = `${day}-${time}`
            return (
              <TimeboxItem
                onClick={() => setTimeBoxValue(dayTime)}
                // Precisa dessa classe para os testes. Ou escolhe outro seletor
                // mais fácil lá em Schedule.spec/makeSut
                className="timebox"
                id={`sch-${dayTime}`}
                key={`sch-${dayTime}`}
                availability={schedule[dayTime] ?? undefined}
              />
            )
          }),
        )
      ))}
    </Container>
  )
}

export default ScheduleTab
