import { Container, Timebox } from "./style"

export type Day = 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday'

export interface ScheduleProps {
  data: {
    times: string[], // 08h, 09h, 10h, ..., 22h
    days: Day[] // segunda, terça, quarta, ...
    values: {
      // segunda-08h00: busy, segunda-09h00: available, ...
      [key: string]: 'available' | 'busy' | undefined
    }
  }
}


const Schedule: React.FC<ScheduleProps> = ({ data }) => {
  const { days, times, values } = data

  return (
    <>
      <h1>Schedule</h1>

      <Container>
        <div id="top-left-corner">Horário \ Dia </div>

        {days.map(day => (
          // se a tela for muito pequena, mostrar apenas a primeira letra
          <div className="day" key={`day-time-${day}`}> {day[0]} </div>
        ))}

        {times.map(time => {
          return (
            [<div className="time" key={time}> {time} </div>]
              .concat(days.map(day => (
                <Timebox
                  key={`${day}-${time}`}
                  value={values[`${day}-${time}`]}
                />
              ))))
        })}
      </Container>
    </>
  )
}

export default Schedule