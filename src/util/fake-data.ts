import { DayTime, TimeboxValue, User } from "@/types"

export const currentUserSchedule:
  { [key in DayTime]?: TimeboxValue } = {
  'Sunday-08h': 'available',
  'Sunday-09h': 'busy',
  'Tuesday-08h': 'available',
  'Tuesday-09h': 'busy',
  'Monday-08h': 'available',
  'Wednesday-19h': 'busy'
}


const fakeUsers: User[] =[
  {
    name: 'Maria',
    id: 'user-2',
    schedule: {
      'Sunday-08h': 'available',
      'Sunday-09h': 'busy',
      'Tuesday-08h': 'available',
      'Tuesday-09h': 'busy',
      "Friday-08h": 'available',
      'Monday-08h': 'available',
      'Wednesday-19h': 'busy',
    }
  },
  {
    name: 'João',
    id: 'user-3',
    schedule: {
      'Sunday-08h': 'available',
      'Sunday-09h': 'busy',
      'Monday-08h': 'busy',
      'Tuesday-08h': 'available',
      'Tuesday-09h': 'busy',
      "Friday-08h": 'available',
      'Wednesday-19h': 'busy',
    }
  },
  {
    name: 'Ana',
    id: 'user-4',
    schedule: {
      'Sunday-08h': 'available',
      'Sunday-09h': 'busy',
      'Tuesday-08h': 'busy',
      'Tuesday-09h': 'available',
      'Monday-08h': 'busy',
      "Friday-08h": 'available',
      'Wednesday-19h': 'busy',
    }
  }
]

export default fakeUsers