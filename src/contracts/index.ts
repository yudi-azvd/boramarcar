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
  getAll: (getAllSchedule: GetUserScheduleDTO) => Promise<Schedule>
}

export interface GetUserScheduleInThisRoom {
  (getAllSchedule: GetUserScheduleDTO): Promise<Schedule>
}

export interface UpdateUserScheduleInThisRoom {
  (updateSchedule: UpdateScheduleDTO): Promise<void>
}