import { Day, DayTime, Time, TimeBoxValue } from "@/types"
import { useState } from "react"
import { Container, Timebox } from "./styles"

interface ScheduleProps {
  times: Time[]
  days: Day[]
  values: { [key in DayTime]?: TimeBoxValue }
}

const Schedule: React.FC<ScheduleProps> = ({ days, times, values }) => {
  const [copyValues, setCopyValues] = useState(values)

  function setTimeBoxValue(dayTime: DayTime): void {
    const oldValue = copyValues[dayTime]
    let newValue: TimeBoxValue = undefined
    console.log({ oldValue });

    if (oldValue === 'available')
      newValue = 'busy'
    if (oldValue === 'busy')
      newValue = undefined
    if (oldValue === undefined)
      newValue = 'available'

    console.log({ newValue });
    setCopyValues({ ...copyValues, [dayTime]: newValue })
  }

  return (
    <Container cols={days.length + 1} rows={times.length + 1} visible>
      <div id="top-left" />

      {days.map(day => (
        <div className="day" key={`sch-${day}`}> {day} </div>
      ))}

      {times.map(time => (
        [<div className="time" key={`sch-${time}`} > {time} </div>].concat(
          days.map(day => {
            const dayTime: DayTime = `${day}-${time}`
            return (
              <Timebox
                onClick={() => setTimeBoxValue(dayTime)}
                className="timebox"
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