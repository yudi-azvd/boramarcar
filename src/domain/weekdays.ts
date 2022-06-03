import { Day } from '@/domain/types'

export const englishWeekdaysToPortuguese: {
  [key in Day]: string
} = {
  Sunday: 'Domingo',
  Monday: 'Segunda',
  Tuesday: 'Terça',
  Wednesday: 'Quarta',
  Thursday: 'Quinta',
  Friday: 'Sexta',
  Saturday: 'Sábado',
}
