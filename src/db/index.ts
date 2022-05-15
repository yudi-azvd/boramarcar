import { UpdateScheduleDTO } from '@/contracts'
import { DayTime, TimeboxValue, User } from '@/types'
import { getDatabase, ref, child, set, get, push, update, remove, onValue, DataSnapshot, off } from 'firebase/database'

const database = getDatabase()

export const theOnlyRoomId = 'theOnlyRoomId'

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

export async function updateUserScheduleInRoom({ dayTime, timeboxValue, roomId, userId }: UpdateScheduleDTO) {
  const userScheduleInRoomRef = ref(database, `schedules/${roomId}/${userId}`)

  console.log(timeboxValue);

  if (timeboxValue !== undefined)
    update(userScheduleInRoomRef, {
      [dayTime]: timeboxValue
    })
  else
    remove(child(userScheduleInRoomRef, dayTime))
}

/// Achei que precisaria, mas não
interface ScheduleChangeHandler {
  (schedules: {
    [key: string]: {
      [key in DayTime]?: TimeboxValue
    }
  }): void
}

export function listenToScheduleChangesInRoom(roomId: string, scheduleChangeHandler: ScheduleChangeHandler) {
  const schedulesInRoomRef = ref(database, `schedules/${roomId}`)
  
  const unsubscribe = onValue(schedulesInRoomRef, (snapshot: DataSnapshot) => {
    const schedules = snapshot.val()

    // Object.keys(schedules).map(userId => )
    scheduleChangeHandler(schedules)
    console.log('db users schedules changed');
  })

  return unsubscribe
}


export function writeUserData(userId: string, name: string, email: string, imageURL: string) {
  set(ref(database, 'users/' + userId), {
    useraname: name,
    email,
    profile_picture: imageURL
  })
}

export async function getUserById(id: string): Promise<User | undefined> {
  const dbRef = ref(database)
  try {
    const userSnapshot = await get(child(dbRef, `users/${id}`))

    if (userSnapshot.exists()) {
      console.log(userSnapshot.val());
      return userSnapshot.val() as User
    }
  } catch (error) {
    console.log(error);
  }
}


export async function getUsers(roomId: string): Promise<User[]> {
  const dbRef = ref(database)
  let users: User[] = []
  try {
    const usersSnapshot = await get(child(dbRef, 'users'))
    const usersSchedulesSnapshot = await get(child(dbRef, `schedules/${roomId}`))

    if (usersSnapshot.exists()) {
      const usersObject = usersSnapshot.val()
      const schedulesObjects = usersSchedulesSnapshot.val()
      users = Object.keys(usersObject)
        .map<User>(user_id => ({
          id: user_id,
          name: usersObject[user_id].name,
          schedule: schedulesObjects
            ? schedulesObjects[user_id]
            : {}
        }))
    }
    else
      console.log('no data available');
  } catch (error) {
    console.log(error);
  }

  return users
}
