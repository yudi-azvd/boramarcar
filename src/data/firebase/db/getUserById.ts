import { User } from '@/domain/types'
import { child, get, ref } from 'firebase/database'

import { database } from './populate'

export async function firebaseGetUserById(id: string): Promise<User> {
  const dbRef = ref(database)
  let user: User = {} as User
  try {
    const userSnapshot = await get(child(dbRef, `users/${id}`))
    if (userSnapshot.exists()) {
      user = {
        id, // porque eu preciso desse ID aqui mesmo?
        ...userSnapshot.val(),
        schedule: {},
      }
    }
  } catch (error) {
    throw new Error(`User not found. User ID: ${id}`)
  }

  return user
}
