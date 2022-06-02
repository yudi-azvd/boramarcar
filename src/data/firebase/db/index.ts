/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */
/* eslint-disable camelcase */
import {
  getDatabase,
  child,
  ref,
  get,
  push,
  update,
  remove,
  onValue,
  DataSnapshot,
} from 'firebase/database'
import { CurrentUserScheduleUpdateEmitter, ScheduleChangeHandler } from '@/contracts'
import { Timebox, User } from '@/domain/types'

import './populate'

export const database = getDatabase()

export async function firebaseDeleteUser(userId: string) {
  const userRef = ref(database, `users/${userId}`)
  // const userInRoomsRef = ref(database, `rooms/${roomId}/users/${userId}`)
  // const userScheduleRef = ref(database, `schedules/${roomId}/${userId}`)

  remove(userRef)
  // remove(userInRoomsRef)
  // remove(userScheduleRef)
}

export async function firebaseCreateUser(username: string) {
  const usersRef = ref(database, 'users')
  const newUserRef = push(usersRef, {
    name: username,
  })

  return {
    name: username,
    id: newUserRef.key,
    schedule: {},
  } as User
}

export class FirebaseCurrentUserScheduleUpdateEmitter implements CurrentUserScheduleUpdateEmitter {
  constructor(
    private readonly roomId: string,
    private readonly userId: string,
  ) { }

  emit(timebox: Timebox): void {
    const userScheduleInRoomRef = ref(database, `schedules/${this.roomId}/${this.userId}`)
    const { dayAndTime, availability } = timebox

    if (timebox.availability !== undefined) {
      update(userScheduleInRoomRef, {
        [dayAndTime]: availability,
      })
    } else remove(child(userScheduleInRoomRef, dayAndTime))
  }
}

export function firebaseListenToOtherUsersScheduleUpdates(
  roomId: string,
  scheduleChangeHandler: ScheduleChangeHandler,
) {
  const dbRef = ref(database)

  const schedulesInRoomRef = ref(database, `schedules/${roomId}`)

  const unsubscribe = onValue(schedulesInRoomRef, async (schedulesSnapshot: DataSnapshot) => {
    const usersInRoomSnapshot = await get(child(dbRef, `rooms/${roomId}/users`))
    const usersSnapshot = await get(child(dbRef, 'users'))
    const usersObject = usersSnapshot.val()
    const usersByIdInRoomObject = usersInRoomSnapshot.val()

    const schedulesByUserIdObject = schedulesSnapshot.val()
    const users = convertToUsers(usersObject, schedulesByUserIdObject)
    // FIXME: Quanto mais pessoas cadastradas, pior vai ficar esse filtro
    const usersInRoom = users.filter((u) => usersByIdInRoomObject[u.id])
    scheduleChangeHandler(usersInRoom)
  })

  return unsubscribe
}

export async function firebaseGetUserInRoomById(roomId: string, id: string): Promise<User> {
  const dbRef = ref(database)
  let user: User = {} as User
  try {
    const userSnapshot = await get(child(dbRef, `users/${id}`))
    const scheduleSnapshot = await get(child(dbRef, `schedules/${roomId}/${id}`))
    if (userSnapshot.exists()) {
      user = {
        ...userSnapshot.val(),
        schedule: scheduleSnapshot.val() ?? {},
      }
    }
  } catch (error) {
    throw new Error(`User not found. User ID: ${id}`)
  }

  return user
}

export async function firebaseGetUsers(roomId: string): Promise<User[]> {
  const dbRef = ref(database)
  let users: User[] = []
  try {
    const usersSnapshot = await get(child(dbRef, 'users'))
    const usersSchedulesSnapshot = await get(child(dbRef, `schedules/${roomId}`))
    const usersInRoomSnapshot = await get(child(dbRef, `rooms/${roomId}/users`))

    if (usersSnapshot.exists()) {
      const usersObject = usersSnapshot.val()
      const schedulesByUserIdObject = usersSchedulesSnapshot.val()
      const usersByIdInRoomObject = usersInRoomSnapshot.val()
      users = convertToUsers(usersObject, schedulesByUserIdObject)
      // FIXME: Quanto mais pessoas cadastradas, pior vai ficar esse filtro
      users = users.filter((u) => usersByIdInRoomObject[u.id])
    } else console.log('no data available');
  } catch (error) {
    console.log(error);
  }

  return users
}

function convertToUsers(usersObject: any, schedulesByUserIdObject: any) {
  const users = Object.keys(usersObject)
    .map<User>((user_id) => {
      // Se é o primeiro acesso da sala, schedulesByUserIdObject é null
      // Se é um usuário que veio depois, schedulesByUserIdObject[user_id] é null
      const userSchedule = schedulesByUserIdObject
        ? schedulesByUserIdObject[user_id]
          ? schedulesByUserIdObject[user_id]
          : {}
        : {}
      const user = {
        id: user_id,
        name: usersObject[user_id].name,
        schedule: userSchedule,
      }
      return user
    })

  return users
}

export * from './getUserRooms'
export * from './createRoom'
