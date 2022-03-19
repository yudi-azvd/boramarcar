import Day from "@/data/Day"
import DayTime from "@/data/DayTime"
import Time from "@/data/Time"
import { useSocket } from "@/hooks/socket"
import React, { useState } from "react"
import { Container, Timebox } from "./style"

export type TimeboxValue = 'available' | 'busy' | undefined

export interface Props {
  visible: boolean
  data: {
    times: Time[],
    days: Day[]
    values: {
      [key in DayTime]: TimeboxValue
    }
  }
}


const Heatmap: React.FC<Props> = ({ data, visible }) => {
  const { days, times } = data
  const { socket } = useSocket()
  const [values, setValues] = useState(data.values)

  const setTimeBoxValue = (dayTime: DayTime) => {
    // chamar função que atualiza valor do timebox globalmente    
    const oldValue = values[dayTime]
    let newValue: TimeboxValue = undefined
    if (oldValue === 'available')
      newValue = 'busy'
    if (oldValue === 'busy')
      newValue = undefined
    if (oldValue === undefined)
      newValue = 'available'

    const [day, time] = dayTime.split('-') as [Day, Time]
    socket.emit('change-timebox-value', { day, time, newValue })
    setValues({ ...values, [dayTime]: newValue })
  }

  return (
    <>
      <Container cols={days.length + 1} rows={times.length + 1} visible={visible}>
        <div id="top-left">Horário \ Dia </div>

        {days.map(day => (
          // se a tela for muito pequena, mostrar apenas a primeira letra
          <div className="day" key={`day-${day}`}> {day[0]} </div>
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

export default Heatmap