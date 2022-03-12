export default interface CreateRoomRequest {
  userName: string
  roomId: string
  roomName: string
  timeboxDuration: string
  daysStartAt: string
  daysEndAt: string
  weekendDays: boolean
}