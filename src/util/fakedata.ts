import { Schedule, User } from "@/domain/types";


export const userFakeSchedule: Schedule = {
  'Sunday-08h': 'available',
  'Sunday-09h': 'busy',
  'Tuesday-08h': 'available',
  'Tuesday-09h': 'busy',
  'Monday-08h': 'available',
  'Wednesday-14h': 'busy'
}

export const fakeUser: User = {
  name: 'SEU NOME AQUI',
  id: 'fake-user-id',
  schedule: userFakeSchedule
}


export const fakeUsers: User[] = [
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