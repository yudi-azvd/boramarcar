import { DayTime, TimeboxValue as TimeboxValue } from "@/types";

export interface UpdateScheduleDTO {
  roomId: string
  userId: string
  dayTime: DayTime
  timeboxValue: TimeboxValue
}

export interface GetAllScheduleDTO {
  roomId: string
  userId: string
}

export interface ScheduleRepository {
  update: (updateSchedule: UpdateScheduleDTO) => Promise<void>
  getAll: (getAllSchedule: GetAllScheduleDTO) => Promise<{ [key in DayTime]?: TimeboxValue }>
}
