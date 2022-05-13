import { Day, DayTime, Time, TimeBoxValue } from "@/types"
import { Timebox } from "./styles"

interface ScheduleProps {
  times: Time[]
  days: Day[]
  values: { [key in DayTime]?: TimeBoxValue }
}

const Schedule: React.FC<ScheduleProps> = ({ days, times, values }) => {
  return (
    <div>
      <div id="top-left"></div>

      {days.map(day => (
        <div className="day" key={`sch-${day}`}> {day} </div>
      ))}

      {times.map(time => (
        [<div className="time" key={`sch-${time}`} > {time} </div>].concat(
          days.map(day => {
            const dayTime: DayTime = `${day}-${time}`
            return <Timebox
              className="timebox"
              id={`sch-${dayTime}`}
              key={`sch-${dayTime}`}
              value={values[dayTime]}
            />
          })
        )
      ))}
    </div>
  )
}

export default Schedule