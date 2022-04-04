import Day from "@/data/Day"
import DayTime from "@/data/DayTime"
import HeatmapData from "@/data/HeatmapData"
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
  }
  heatmapData: HeatmapData
}


const Heatmap: React.FC<Props> = ({ data, visible, heatmapData }) => {
  const { days, times } = data

  return (
    <>
      <Container cols={days.length + 1} rows={times.length + 1} visible={visible}>
        <div id="top-left">Horário \ Dia </div>

        {days.map(day => (
          <div className="day" key={`day-${day}`}> {day[0]} </div>
        ))}

        {times.map(time => {
          return (
            [<div className="time" key={time}> {time} </div>]
              .concat(days.map(day => (
                <Timebox
                  key={`${day}-${time}`}
                  // availableUsersCount={Math.floor(Math.random()*100)}
                  // busyUsersCount={Math.floor(Math.random()*100)}
                />
              ))))
        })}
      </Container>
    </>
  )
}

export default Heatmap