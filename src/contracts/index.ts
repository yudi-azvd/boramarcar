import { Room, Schedule, Timebox, User } from "@/domain/types";

export interface UpdateScheduleDTO {
  roomId: string
  userId: string
  timebox: Timebox
}

export interface GetUserScheduleDTO {
  roomId: string
  userId: string
}

export interface GetUserRooms {
  (userId: string): Promise<Room[]>
}

export interface CreateRoom {
  (roomname: string, ownerId: string): Promise<Room>
}

export interface JoinRoom {
  (roomId: string, userId: string): Promise<Room>
}

export interface ScheduleRepository {
  update: (updateSchedule: UpdateScheduleDTO) => Promise<void>
  getAll: (getAllSchedule: GetUserScheduleDTO) => Promise<Schedule>
}

export interface CurrentUserScheduleUpdateEmitter {
  emit: (timebox: Timebox) => void
}

export interface ScheduleChangeHandler {
  (usersWithNewSchedules: User[]): void
}


export interface GetCurrentUserSchedule {
  (): Promise<Schedule>
}

export interface UpdateCurrentUserSchedule {
  (updateCurrentUserScheduleDTO: Timebox): Promise<void>
}