import { DayTime, TimeboxValue as TimeboxValue } from "@/types";

export interface UpdateScheduleDTO {
  roomId: string
  userId: string
  dayTime: DayTime
  timeboxValue: TimeboxValue
}

export interface GetUserScheduleDTO {
  roomId: string
  userId: string
}

export interface ScheduleRepository {
  update: (updateSchedule: UpdateScheduleDTO) => Promise<void>
  getAll: (getAllSchedule: GetUserScheduleDTO) => Promise<{ [key in DayTime]?: TimeboxValue }>
}

export interface GetUserScheduleInThisRoom {
  (getAllSchedule: GetUserScheduleDTO): Promise<{ [key in DayTime]?: TimeboxValue }>
}

export interface UpdateUserScheduleInThisRoom {
  (updateSchedule: UpdateScheduleDTO): Promise<void>
}