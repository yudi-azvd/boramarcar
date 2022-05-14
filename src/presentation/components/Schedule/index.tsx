import { ScheduleRepository } from "@/contracts"
import { Day, DayTime, Time, TimeBoxValue } from "@/types"
import { useEffect, useState } from "react"
import { Container, Timebox } from "./styles"

interface ScheduleProps {
  userId: string
  roomId: string
  times: Time[]
  days: Day[]
  scheduleRepository: ScheduleRepository
}

const dict: {
  [key in Day]: string
} = {
  'Sunday': 'Domingo',
  'Monday': 'Segunda',
  'Tuesday': 'Terça',
  'Wednesday': 'Quarta',
  'Thursday': 'Quinta',
  'Friday': 'Sexta',
  'Saturday': 'Sábado'
}

const Schedule: React.FC<ScheduleProps> = ({ days, times, roomId, userId, scheduleRepository }) => {
  const [values, setValues] = useState({} as {
    [key in DayTime]?: TimeBoxValue
  })

  async function setTimeBoxValue(dayTime: DayTime): Promise<void> {
    const oldValue = values[dayTime]
    let newValue: TimeBoxValue = undefined

    if (oldValue === 'available')
      newValue = 'busy'
    if (oldValue === 'busy')
      newValue = undefined
    if (oldValue === undefined)
      newValue = 'available'

    // Se não tiver await o teste falha. Parece que o testes de Schedule.spec.tsx 
    // intererem uns nos outros.
    await scheduleRepository.update({ roomId, userId, dayTime, timeboxValue: newValue })
    setValues({ ...values, [dayTime]: newValue })
  }

  useEffect(() => {
    async function getAll() {
      const timeboxes = await scheduleRepository.getAll({ roomId, userId })
      setValues(timeboxes)
    }

    getAll()
  }, [])

  return (
    <Container cols={days.length + 1} rows={times.length + 1} visible>
      <div id="top-left" />

      {days.map(day => (
        <div className="day" key={`sch-${day}`}> {dict[day][0]} </div>
      ))}

      {times.map(time => (
        [<div className="time" key={`sch-${time}`} > {time} </div>].concat(
          days.map(day => {
            const dayTime: DayTime = `${day}-${time}`
            return (
              <Timebox
                onClick={() => setTimeBoxValue(dayTime)}
                // Precisa dessa classe para os testes. Ou escolhe outro seletor 
                // mais fácil lá em Schedule.spec/makeSut 
                className="timebox"
                id={`sch-${dayTime}`}
                key={`sch-${dayTime}`}
                value={values[dayTime] ?? undefined}
              />
            )
          })
        )
      ))}
    </Container>
  )
}

export default Schedule