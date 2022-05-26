import { firebaseCreateRoom, firebaseGetUserRooms } from "@/data/firebase/db"
import UserRooms from "@/presentation/pages/UserRooms"


const makeUserRooms = () =>
  <UserRooms getUserRooms={firebaseGetUserRooms} createRoom={firebaseCreateRoom} />

export default makeUserRooms