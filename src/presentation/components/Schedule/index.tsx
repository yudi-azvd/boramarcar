import { Day, DayTime, Time, TimeBoxValue } from "@/types"
import { useState } from "react"
import { Container, Timebox } from "./styles"

interface ScheduleProps {
  times: Time[]
  days: Day[]
  values: { [key in DayTime]?: TimeBoxValue }
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

const Schedule: React.FC<ScheduleProps> = ({ days, times, values }) => {
  const [copyValues, setCopyValues] = useState(() => values)
  // console.log(values);
  // console.log(copyValues);

  function setTimeBoxValue(dayTime: DayTime): void {
    const oldValue = copyValues[dayTime]
    let newValue: TimeBoxValue = undefined

    if (oldValue === 'available')
      newValue = 'busy'
    if (oldValue === 'busy')
      newValue = undefined
    if (oldValue === undefined)
      newValue = 'available'

    setCopyValues({ ...copyValues, [dayTime]: newValue })
  }

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
                className="timebox"  // precisa para os testes. Ou escolhe outro seletor mais fácil lá
                id={`sch-${dayTime}`}
                key={`sch-${dayTime}`}
                value={copyValues[dayTime]}
              />
            )
          })
        )
      ))}
    </Container>
  )
}

export default Schedule