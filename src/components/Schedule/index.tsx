import React, { useState } from "react"
import { Container, Timebox } from "./style"

export type Day = 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday'

export type TimeboxValue = 'available' | 'busy' | undefined

export interface ScheduleProps {
  data: {
    times: string[], // 08h, 09h, 10h, ..., 22h
    days: Day[]
    values: {
      // segunda-08h00: busy, segunda-09h00: available, ...
      [key: string]: TimeboxValue
    }
  }
}


const Schedule: React.FC<ScheduleProps> = ({ data }) => {
  const { days, times } = data
  const [values, setValues] = useState(data.values)

  const setTimeBoxValue = (dayTime: string) => {
    // chamar função que atualiza valor do timebox globalmente    
    const oldValue = values[dayTime]
    let newValue: TimeboxValue = undefined
    if (oldValue === 'available')
      newValue = 'busy'
    if (oldValue === 'busy')
      newValue = undefined
    if (oldValue === undefined)
      newValue = 'available'

    setValues({ ...values, [`${dayTime}`]: newValue })
  }

  return (
    <>
      <h1>Schedule</h1>

      <Container cols={days.length + 1} rows={times.length}>
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
                  onClick={() => setTimeBoxValue(`${day}-${time}`)}
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