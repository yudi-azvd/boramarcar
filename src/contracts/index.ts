import { DayAndTime, Schedule, Availability as Availability, Timebox } from "@/types";

export interface UpdateScheduleDTO {
  roomId: string
  userId: string
  timebox: Timebox
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
  (updateCurrentUserScheduleDTO: Timebox): Promise<void>
}