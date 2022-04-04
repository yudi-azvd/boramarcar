import Room from "./Room"
import User from "./User"

export default interface CreateRoomResponse {
  user: User
  room: Room
}
