import { get, ref } from 'firebase/database'
import { GetUserRooms } from '@/contracts'
import { Room } from '@/domain/types'

import { database } from './index'

type FirebaseRawRoom = Room & {
  users: {
    [key: string]: boolean // userId: true
    // exemplo: { '-Nkl29sn': true, ... }
  }
}

export const firebaseGetUserRooms: GetUserRooms = async (userId: string) => {
  const rooms: Room[] = []

  const roomsRef = ref(database, 'rooms/')
  const roomsSnapshot = await get(roomsRef)
  if (!roomsSnapshot.exists()) return rooms

  const roomsArrayByRoomId = roomsSnapshot.val()

  const allRooms: FirebaseRawRoom[] = Object.keys(roomsArrayByRoomId)
    .map<FirebaseRawRoom>((roomId) => ({
      id: roomId,
      name: roomsArrayByRoomId[roomId].name,
      status: roomsArrayByRoomId[roomId].status,
      users: roomsArrayByRoomId[roomId].users,
    }))

  // A sala pode ter nenhum usuário? Pelo menos em ambiente de desenvolvimento sim
  const userRooms = allRooms.filter((room) => room.users && room.users[userId] !== undefined)

  return userRooms
}
