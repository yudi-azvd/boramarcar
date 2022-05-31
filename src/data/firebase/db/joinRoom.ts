/* eslint-disable camelcase */
import {
  child, get, ref, update,
} from 'firebase/database';
import { JoinRoom } from '@/contracts';
import { Room } from '@/domain/types';

import { database } from './index'

export const firebaseJoinRoom: JoinRoom = async (
  roomId: string,
  userId: string,
): Promise<Room> => {
  const roomsRef = ref(database, 'rooms/')
  const existingRoomSnapshot = await get(child(roomsRef, roomId))
  if (!existingRoomSnapshot) throw new Error(`Sala com ID ${roomId} não encontrado`)

  const roomObject = existingRoomSnapshot.val()
  const room: Room = {
    id: roomId,
    name: roomObject.name,
    status: roomObject.status,
    ownerId: roomObject.ownerId,
  }
  const userAlreadyJoined = Object.keys(roomObject.users)
    .find((user_id) => user_id === userId) !== undefined

  if (userAlreadyJoined) {
    throw new Error(`Usuário já está na sala ${roomId}: ${room.name}`)
  }

  if (room.status !== 'Ativo') {
    throw new Error('Não é possível entrar na sala porque ela não está ativa')
  }

  // `push` cria uma nova "entidade" com o seu próprio ID.
  // É update mesmo que eu quero.
  update(child(roomsRef, `${roomId}/users`), {
    [userId]: true,
  })

  return room
}
