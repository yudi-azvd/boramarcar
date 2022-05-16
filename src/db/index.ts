import { UpdateScheduleDTO } from '@/contracts'
import { User } from '@/types'
import {
  getDatabase,
  child,
  ref,
  get,
  push,
  update,
  remove,
  onValue,
  DataSnapshot
} from 'firebase/database'

const database = getDatabase()

export const theOnlyRoomId = 'theOnlyRoomId'

export async function deleteUser(userId: string) {
  const userRef = ref(database, `users/${userId}`)
  const userInRoomsRef = ref(database, `rooms/${theOnlyRoomId}/users/${userId}`)
  const userScheduleRef = ref(database, `schedules/${theOnlyRoomId}/${userId}`)

  remove(userRef)
  remove(userInRoomsRef)
  remove(userScheduleRef)
}

export async function createUser(username: string) {
  const usersRef = ref(database, 'users')
  const roomsRef = ref(database, `rooms/${theOnlyRoomId}/users`)
  const newUserRef = push(usersRef, {
    name: username
  })

  update(roomsRef, {
    [newUserRef.key as string]: true
  })

  return {
    name: username,
    id: newUserRef.key,
    schedule: {}
  } as User
}

export async function emitUserScheduleUpdate({ dayTime, timeboxValue, roomId, userId }: UpdateScheduleDTO) {
  const userScheduleInRoomRef = ref(database, `schedules/${roomId}/${userId}`)

  if (timeboxValue !== undefined)
    update(userScheduleInRoomRef, {
      [dayTime]: timeboxValue
    })
  else
    remove(child(userScheduleInRoomRef, dayTime))
}

interface ScheduleChangeHandler {
  (usersWithNewSchedules: User[]): void
}

export function listenToOtherUsersScheduleChangesInRoom(roomId: string, scheduleChangeHandler: ScheduleChangeHandler) {
  const schedulesInRoomRef = ref(database, `schedules/${roomId}`)
  const dbRef = ref(database)

  const unsubscribe = onValue(schedulesInRoomRef, async (schedulesSnapshot: DataSnapshot) => {
    const usersSnapshot = await get(child(dbRef, 'users'))
    const usersObject = usersSnapshot.val()
    const schedulesByUserIdObject = schedulesSnapshot.val()
    const users = convertToUsers(usersObject, schedulesByUserIdObject)
    scheduleChangeHandler(users)
  })

  return unsubscribe
}


export async function getUserById(id: string): Promise<User> {
  const dbRef = ref(database)
  let user: User = {} as User
  try {
    const userSnapshot = await get(child(dbRef, `users/${id}`))
    const scheduleSnapshot = await get(child(dbRef, `schedules/${theOnlyRoomId}/${id}`))
    if (userSnapshot.exists()) {
      user = {
        ...userSnapshot.val(),
        schedule: scheduleSnapshot.val() ?? {}
      }
    }
  } catch (error) {
    throw new Error('User not found. User ID: ' + id)
  }

  return user
}


export async function getUsers(roomId: string): Promise<User[]> {
  const dbRef = ref(database)
  let users: User[] = []
  try {
    const usersSnapshot = await get(child(dbRef, 'users'))
    const usersSchedulesSnapshot = await get(child(dbRef, `schedules/${roomId}`))

    if (usersSnapshot.exists()) {
      const usersObject = usersSnapshot.val()
      const schedulesByUserIdObject = usersSchedulesSnapshot.val()
      users = convertToUsers(usersObject, schedulesByUserIdObject)
    }
    else
      console.log('no data available');
  } catch (error) {
    console.log(error);
  }

  return users
}

function convertToUsers(usersObject: any, schedulesByUserIdObject: any) {
  const users = Object.keys(usersObject)
    .map<User>(user_id => {
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
