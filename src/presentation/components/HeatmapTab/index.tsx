import { Day, DayAndTime, Time, Availability, User } from "@/domain/types"
import { Popover } from "antd"
import { Container, HeatmapTimeboxItem } from "./styles"
import { differenceToColor } from "@/domain/heatmap"
import { englishWeekdaysToPortuguese } from "@/domain/weekdays"


interface HeatmapTabProps {
  times: Time[]
  days: Day[]
  users: User[]
}

const HeatmapTab: React.FC<HeatmapTabProps> = ({ days, times, users }) => {
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
            const dayAndTime: DayAndTime = `${day}-${time}`
            const availableUsers = users.filter(u => u.schedule[dayAndTime] === 'available')
            const busyUsers = users.filter(u => u.schedule[dayAndTime] === 'busy')
            const nobodyClickedThisDayTime = availableUsers.length === 0 && busyUsers.length === 0
            const color = differenceToColor(availableUsers.length, busyUsers.length, totalUsers)

            return (
              <Popover key={`popover-${dayAndTime}`} trigger="click" content={
                (<div>
                  {nobodyClickedThisDayTime && <p>Ninguém clicou aqui</p>}
                  {availableUsers.length > 0 && <p><strong> Disponíveis </strong></p>}
                  {availableUsers.map(u => (
                    <p key={`available-popover-${dayAndTime}-${u.id}`}>{u.name}</p>
                  ))}

                  {busyUsers.length > 0 && <p><strong> Ocupados </strong></p>}
                  {busyUsers.map(u => (
                    <p key={`busy-popover-${dayAndTime}-${u.id}`} >{u.name}</p>
                  ))}
                </div>)
              }>
                <HeatmapTimeboxItem
                  className="timebox"
                  id={`${idPrefix}-${dayAndTime}`}
                  key={`${idPrefix}-${dayAndTime}`}
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

export default HeatmapTab