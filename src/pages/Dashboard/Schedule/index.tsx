import Day from "@/types/Day"
import DayTime from "@/types/DayTime"
import Time from "@/types/Time"
import TimeboxValue from "@/types/TimeboxValue"
import { useSocket } from "@/hooks/socket"
import { notification } from "antd"
import React, { useState } from "react"
import { Container, Timebox } from "./style"


export interface ScheduleProps {
  visible: boolean
  data: {
    times: Time[],
    days: Day[]
    values: {
      [key in DayTime]: TimeboxValue
    }
  }
}


const Schedule: React.FC<ScheduleProps> = ({ data, visible }) => {
  const { days, times } = data
  const { socket } = useSocket()
  const [step, setStep] = useState(1)
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

  const onMouseDown = (dayTime: DayTime) => {
    notification.error({
      message: dayTime
    })
  }
  
  const onMouseUp = (dayTime: DayTime) => {
    notification.error({
      message: dayTime
    })
  }

  const onTouchStart = (dayTime: DayTime) => {
    notification.success({
      message: dayTime,
      description: 'touch START'
    })
  }

  const onTouchEnd = (dayTime: DayTime) => {
    notification.success({
      message: dayTime,
      description: 'touch END'
    })
  }

  return (
    <>
      <Container cols={days.length + 1} rows={times.length + 1} visible={visible} >
        <div id="top-left">Horário \ Dia </div>

        {days.map(day => (
          // se a tela for muito pequena, mostrar apenas a primeira letra
          <div className="day" key={`day-${day}`}> {day[0]} </div>
        ))}

        {times.map(time => {
          return (
            [<div className="time" key={time}> {time} </div>]
              .concat(days.map(day => {
                const dayTime = `${day}-${time}` as DayTime
                return (
                  <Timebox
                    onMouseDown={() => onMouseDown(dayTime)}
                    onMouseUp={() => onMouseUp(dayTime)}
                    onTouchStart={() => onTouchStart(dayTime)}
                    onTouchEnd={() => onTouchEnd(dayTime)}
                    onClick={() => setTimeBoxValue(dayTime)}
                    onDoubleClick={() => console.log('double click')}
                    key={dayTime}
                    value={values[dayTime]}
                  />
                )
              })))
        })}
      </Container>
    </>
  )
}

export default Schedule