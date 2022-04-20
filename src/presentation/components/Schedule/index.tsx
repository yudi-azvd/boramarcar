import { Timebox } from "./styles"

interface ScheduleProps {
  times: string[]
  days: string[]
  values: { [key: string]: 'notdefined' | 'available' | 'busy' }
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
            const dayTime = `${day}-${time}`
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