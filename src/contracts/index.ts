import { DayTime, Schedule, TimeboxValue as TimeboxValue } from "@/types";

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
  getAll: (getAllSchedule: GetUserScheduleDTO) => Promise<Schedule>
}

export interface GetCurrentUserSchedule {
  (): Promise<Schedule>
}

export interface UpdateCurrentUserSchedule {
  // (updateCurrentUserScheduleDTO: { dayTime: DayTime, timeboxValue: TimeboxValue }): Promise<void>
  (updateCurrentUserScheduleDTO: [ DayTime, TimeboxValue ]): Promise<void>
}