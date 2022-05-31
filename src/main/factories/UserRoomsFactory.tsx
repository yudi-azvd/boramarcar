import { firebaseCreateRoom, firebaseGetUserRooms } from '@/data/firebase/db'
import { firebaseJoinRoom } from '@/data/firebase/db/joinRoom'
import UserRooms from '@/presentation/pages/UserRooms'

const makeUserRooms = () => (
  <UserRooms
    getUserRooms={firebaseGetUserRooms}
    createRoom={firebaseCreateRoom}
    joinRoom={firebaseJoinRoom}
  />
)

export default makeUserRooms
