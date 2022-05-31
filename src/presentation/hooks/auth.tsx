/* eslint-disable react/jsx-no-constructed-context-values */
import {
  createContext, useCallback, useContext, useState,
} from 'react'
import { firebaseCreateUser, firebaseDeleteUser } from '@/data/firebase/db'
import { User } from '@/domain/types'
import { firebaseGetUserById } from '@/data/firebase/db/getUserById'

interface AuthContextInterface {
  user: User
  signup: (username: string) => Promise<User>
  signin: (userId: string) => Promise<User>
  signout: () => Promise<void>
}

const AuthContext = createContext<AuthContextInterface>(
  {} as AuthContextInterface,
)

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User>(() => {
    const localStorageUser = localStorage.getItem('user')
    if (!localStorageUser) return {} as User

    return JSON.parse(localStorageUser) as User
  })

  const signup = useCallback(async (username: string): Promise<User> => {
    const newUser = await firebaseCreateUser(username)
    localStorage.setItem('user', JSON.stringify(newUser))
    setUser(newUser)
    return user
  }, [])

  const signin = useCallback(async (userId: string): Promise<User> => {
    const dbUser = await firebaseGetUserById(userId)
    localStorage.setItem('user', JSON.stringify(dbUser))
    setUser(dbUser)
    return dbUser
  }, [])

  const signout = useCallback(async (): Promise<void> => {
    await firebaseDeleteUser(user.id)
    localStorage.setItem('user', JSON.stringify({}))
    setUser({} as User)
  }, [user])

  return (
    <AuthContext.Provider value={{
      user, signup, signin, signout,
    }}
    >
      {children}
    </AuthContext.Provider>
  )
}

function useAuth(): AuthContextInterface {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }

  return context
}

export { AuthProvider, useAuth }
