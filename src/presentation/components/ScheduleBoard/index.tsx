import { GetCurrentUserSchedule, ScheduleRepository, UpdateCurrentUserSchedule } from "@/contracts"
import { englishWeekdaysToPortuguese } from "@/domain/weekdays"
import { Day, DayAndTime, Schedule, Time, Availability } from "@/types"
import { useEffect, useState } from "react"
import { Container, TimeboxItem } from "./styles"

interface ScheduleBoardProps {
  times: Time[]
  days: Day[]
  getCurrentUserSchedule: GetCurrentUserSchedule
  updateCurrentUserSchedule: UpdateCurrentUserSchedule
}

const ScheduleBoard: React.FC<ScheduleBoardProps> = ({
  days,
  times,
  getCurrentUserSchedule,
  updateCurrentUserSchedule,
}) => {
  const [schedule, setSchedule] = useState({} as Schedule)

  async function setTimeBoxValue(dayAndTime: DayAndTime): Promise<void> {
    const oldValue = schedule[dayAndTime]
    let newValue: Availability = undefined

    if (oldValue === 'available')
      newValue = 'busy'
    if (oldValue === 'busy')
      newValue = undefined
    if (oldValue === undefined)
      newValue = 'available'

    // Se não tiver await o teste falha. Parece que o testes de Schedule.spec.tsx 
    // intererem uns nos outros.
    // await updateUserScheduleInThisRoom({ roomId, userId, dayTime, timeboxValue: newValue })
    await updateCurrentUserSchedule({ dayAndTime, availability: newValue })
    setSchedule({ ...schedule, [dayAndTime]: newValue })
  }

  useEffect(() => {
    async function getAll() {
      const schedule = await getCurrentUserSchedule()
      setSchedule(schedule)
    }

    getAll()
  }, [])

  return (
    <Container cols={days.length + 1} rows={times.length + 1} visible>
      <div id="top-left" />

      {days.map(day => (
        <div className="day" key={`sch-${day}`}> {englishWeekdaysToPortuguese[day][0]} </div>
      ))}

      {times.map(time => (
        [<div className="time" key={`sch-${time}`} > {time} </div>].concat(
          days.map(day => {
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
          })
        )
      ))}
    </Container>
  )
}

export default ScheduleBoard