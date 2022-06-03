/* eslint-disable no-console */
import { Room, User } from '@/domain/types'
import {
  getDatabase, ref, update,
} from 'firebase/database'

// FIXME: Isso me parece perigoso. Dá brecha pra apagar o banco de dados
// em produção.
export const database = getDatabase()

let usersCount = 0
let roomsCount = 0

async function devCeateUser(username: string) {
  usersCount++
  const userId = `u${usersCount}`
  const usersRef = ref(database, 'users')
  update(usersRef, {
    [userId]: {
      name: username,
    },
  })

  return {
    id: userId,
    name: username,
    schedule: {},
  } as User
}

async function devCeateRoom(roomname: string, ownerId: string) {
  roomsCount++
  const roomsRef = ref(database, 'rooms/')
  const roomId = `r${roomsCount}`

  update(roomsRef, {
    [roomId]: {
      users: { [ownerId]: true },
      ownerId,
      status: 'Ativo',
      name: roomname,
    },
  })

  return {
    name: roomname,
    id: roomId,
  } as Room
}

async function populateDevelopmentDatabase() {
  const alvares = await devCeateUser('Alvares')
  const bianca = await devCeateUser('Bianca')
  const caio = await devCeateUser('Caio')
  const daniel = await devCeateUser('Daniel')
  const ellen = await devCeateUser('ellen')
  await devCeateRoom('Sala do Alvares', alvares.id)
  await devCeateRoom('Sala da Bianca', bianca.id)
  await devCeateRoom('Sala do Caio', caio.id)
}

if (import.meta.env.DEV) {
  console.log('populate DB')
  populateDevelopmentDatabase()
}
