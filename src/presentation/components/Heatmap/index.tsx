import { Day, DayTime, Time } from "@/types"
import { Container, Timebox } from "./styles"

interface HeatmapProps {
  times: Time[]
  days: Day[]
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

const Heatmap: React.FC<HeatmapProps> = ({ days, times }) => {
  const idPrefix = 'heat'

  return (
    <Container cols={days.length + 1} rows={times.length + 1} visible>
      <div id="top-left" />

      {days.map(day => (
        <div className="day" key={`${idPrefix}-${day}`}> {dict[day][0]} </div>
      ))}

      {times.map(time => (
        [<div className="time" key={`${idPrefix}-${time}`} > {time} </div>].concat(
          days.map(day => {
            const dayTime: DayTime = `${day}-${time}`
            return (
              <Timebox
                // essa classe é igual à classe dos timeboxes em 
                // Schedule. Vai dar problema?
                className="timebox"
                id={`${idPrefix}-${dayTime}`}
                key={`${idPrefix}-${dayTime}`}
              />
            )
          })
        )
      ))}
    </Container>
  )
}

export default Heatmap