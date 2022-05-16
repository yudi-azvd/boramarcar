import { Day, DayTime, Time, TimeboxValue, User } from "@/types"
import { Popover } from "antd"
import { Container, HeatmapTimebox } from "./styles"
import { differenceToColor } from "@/domain/heatmap"
import { englishWeekdaysToPortuguese } from "@/domain/weekdays"


interface HeatmapBoardProps {
  times: Time[]
  days: Day[]
  roomId: string
  users: User[]
}

const HeatmapBoard: React.FC<HeatmapBoardProps> = ({ days, times, users }) => {
  const idPrefix = 'heat'
  const totalUsers = users.length
  
  return (
    <Container cols={days.length + 1} rows={times.length + 1} visible>
      <div id="top-left" />

      {days.map(day => (
        <div className="day" key={`${idPrefix}-${day}`}> {englishWeekdaysToPortuguese[day][0]} </div>
      ))}

      {times.map(time => (
        [<div className="time" key={`${idPrefix}-${time}`} > {time} </div>].concat(
          days.map(day => {
            const dayTime: DayTime = `${day}-${time}`
            const availableUsers = users.filter(u => u.schedule[dayTime] === 'available')
            const busyUsers = users.filter(u => u.schedule[dayTime] === 'busy')
            const nobodyClickedThisDayTime = availableUsers.length === 0 && busyUsers.length === 0
            const color = differenceToColor(availableUsers.length, busyUsers.length, totalUsers)

            return (
              <Popover key={`popover-${dayTime}`} trigger="click" content={
                (
                  <div>
                    {nobodyClickedThisDayTime && <p>Ninguém clicou aqui</p>}
                    {availableUsers.length > 0 && <p><strong> Disponíveis </strong></p>}
                    {availableUsers.map(u => (
                      <p key={`available-popover-${dayTime}-${u.id}`}>{u.name}</p>
                    ))}

                    {busyUsers.length > 0 && <p><strong> Ocupados </strong></p>}
                    {busyUsers.map(u => (
                      <p key={`busy-popover-${dayTime}-${u.id}`} >{u.name}</p>
                    ))}
                  </div>
                )
              }>
                <HeatmapTimebox
                  // essa classe é igual à classe dos timeboxes em 
                  // Schedule. Vai dar problema?
                  className="timebox"
                  id={`${idPrefix}-${dayTime}`}
                  key={`${idPrefix}-${dayTime}`}
                  color={color}
                />
              </Popover>
            )
          })
        )
      ))}
    </Container>
  )
}

export default HeatmapBoard