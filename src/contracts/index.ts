import { DayTime, TimeBoxValue as TimeboxValue } from "@/types";

export interface UpdateScheduleDTO {
  userId: string
  dayTime: DayTime
  timeboxValue: TimeboxValue
}

export interface ScheduleRepository {
  update: (updateSchedule: UpdateScheduleDTO) => Promise<void>
  getAll: (userId: string) => Promise<{ [key in DayTime]?: TimeboxValue }>
}
