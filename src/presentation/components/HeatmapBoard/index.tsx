import { Day, DayTime, Time, User } from "@/types"
import { Popover } from "antd"
import { Container, HeatmapTimebox } from "./styles"

interface HeatmapBoardProps {
  times: Time[]
  days: Day[]
  roomId: string
  users: User[]
}

const colorStops = {
  available: [
    '#D7FFED',
    '#ADFDDB',
    '#46F8B6',
    '#18DC86',
  ],
  busy: [
    '#FFDBDC',
    '#FAA6A9',
    '#FF777B',
    '#E95F63',
  ]
}

/**
 * Diferença entre usuários disponíveis e ocupados, necessariamente
 * nessa ordem. Se existem mais usuários disponíveis, `difference`
 * deve ser positivo. Se existem mais usuários disponíveis, `difference`
 * deve ser negativo.
 */
function differenceToColor(available: number, busy: number, total: number) {
  if (available === 0 && busy === 0)
    return '#FFFFFF'
    
  const difference = available - busy
  if (difference === 0)
    return '#DDDDDD'
  if (difference > 0) {
    const availablePercent = difference / total
    return colorStops.available[Math.floor(availablePercent * 4) - 1]
  }
  const busyPercent = -difference / total
  return colorStops.busy[Math.floor(busyPercent * 4) - 1]
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

const HeatmapBoard: React.FC<HeatmapBoardProps> = ({ days, times, users }) => {
  const idPrefix = 'heat'
  const totalUsers = users.length

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
            const availableUsers = users.filter(u => u.schedule[dayTime] === 'available')
            const busyUsers = users.filter(u => u.schedule[dayTime] === 'busy')
            const nobodyClickedThisTimeDay = availableUsers.length === 0 && busyUsers.length === 0
            const color = differenceToColor(availableUsers.length, busyUsers.length, totalUsers)
            return (
              <Popover key={`popover-${dayTime}`} trigger="click" content={
                (
                  <div>
                    {nobodyClickedThisTimeDay && <p>Ninguém clicou aqui</p>}
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