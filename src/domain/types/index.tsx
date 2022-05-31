export type User = {
  name: string
  id: string
  schedule: Schedule
}

export type Room = {
  id: string
  name: string
  status: string
  ownerId?: string
}

export type Day = 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday'

export type Time =
  '08h' |
  '09h' |
  '10h' |
  '11h' |
  '12h' |
  '13h' |
  '14h' |
  '15h' |
  '16h' |
  '17h' |
  '18h' |
  '19h' |
  '20h' |
  '21h'

export type DayAndTime = `${Day}-${Time}`

export type Availability = undefined | 'available' | 'busy'

export type Timebox = {
  dayAndTime: DayAndTime,
  availability: Availability
}

export type Schedule = { [key in DayAndTime]?: Availability }
