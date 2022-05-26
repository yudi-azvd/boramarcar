import { Room } from "@/domain/types"
import { push, ref } from "firebase/database"

import { database } from './index'


export async function firebaseCreateRoom(
  roomname: string,
  ownerId: string
): Promise<Room> {
  const roomsRef = ref(database, 'rooms/')

  const newRoom = await push(roomsRef, {
    users: [ownerId]
  })

  return {
    name: roomname,
    id: newRoom.key
  } as Room
}
