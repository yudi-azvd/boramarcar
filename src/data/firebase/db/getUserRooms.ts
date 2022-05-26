import { GetUserRooms } from "@/contracts";
import { Room } from "@/domain/types";
import { get, ref } from "firebase/database";

import { database } from './index'

type FirebaseRawRoom = Room & {
  users: {
    [key: string]: boolean // userId: true
    // exemplo: { '-Nkl29sn': true, ... }
  }
}

export const firebaseGetUserRooms: GetUserRooms = async (userId: string) => {
  let rooms: Room[] = []

  const roomsRef = ref(database, 'rooms/')
  const roomsSnapshot = await get(roomsRef)
  if (!roomsSnapshot.exists())
    return rooms

  const roomsArrayByRoomId = roomsSnapshot.val()

  const allRooms: FirebaseRawRoom[] = Object.keys(roomsArrayByRoomId)
    .map<FirebaseRawRoom>(roomId => ({
      id: roomId,
      name: roomsArrayByRoomId[roomId].name,
      status: roomsArrayByRoomId[roomId].status,
      users: roomsArrayByRoomId[roomId].users
    }))

  const userRooms = allRooms.filter(room => 
    // A sala pode ter nenhum usuário? Pelo menos em ambiente de desenvolvimento sim
    room.users && room.users[userId] !== undefined)

  return userRooms
}