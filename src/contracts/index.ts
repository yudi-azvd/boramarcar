import { DayTime, TimeBoxValue as TimeboxValue } from "@/types";

export interface UpdateScheduleDTO {
  userId: string
  dayTime: DayTime
  timeboxValue: TimeboxValue
}

export interface GetAllScheduleDTO {
  userId: string
}

export interface ScheduleRepository {
  update: (updateSchedule: UpdateScheduleDTO) => Promise<void>
  getAll: (getAllSchedule: GetAllScheduleDTO) => Promise<{ [key in DayTime]?: TimeboxValue }>
}
