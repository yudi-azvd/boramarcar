import { DayAndTime, Schedule, Availability as Availability } from "@/types";

export interface UpdateScheduleDTO {
  roomId: string
  userId: string
  dayTime: DayAndTime
  timeboxValue: Availability
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
  (updateCurrentUserScheduleDTO: [ DayAndTime, Availability ]): Promise<void>
}