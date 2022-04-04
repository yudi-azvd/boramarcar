import Room from "./Room"
import User from "./User"

export default interface JoinRoomResponse {
  user: User
  room: Room
}
