import { CreateRoom } from "@/contracts"
import { Room } from "@/domain/types"

import { push, ref } from "firebase/database"
import { database } from './index'

export const firebaseCreateRoom: CreateRoom = async (
  roomname: string,
  ownerId: string
): Promise<Room> => {
  const roomsRef = ref(database, 'rooms/')

  const newRoom = await push(roomsRef, {
    users: { [ownerId]: true },
    ownerId,
    status: 'Ativo',
    name: roomname
  })

  return {
    name: roomname,
    id: newRoom.key
  } as Room
}
