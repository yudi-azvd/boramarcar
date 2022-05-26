import { firebaseGetUserRooms } from "@/data/firebase/db"
import UserRooms from "@/presentation/pages/UserRooms"


const makeUserRooms = () =>
  <UserRooms getUserRooms={firebaseGetUserRooms} />


export default makeUserRooms