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

export type DayTime = `${Day}-${Time}`

export type TimeBoxValue = undefined | 'available' | 'busy'