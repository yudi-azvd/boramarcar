import { createUser } from "@/db"
import { User } from "@/types"
import { createContext, useCallback, useContext, useState } from "react"

interface AuthContextInterface {
  user: User
  signup: (username: string) => Promise<void>
}

const AuthContext = createContext<AuthContextInterface>(
  {} as AuthContextInterface
)

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User>(() => {
    const localStorageUser = localStorage.getItem('user') 
    if (!localStorageUser)
      return {} as User
    
    return JSON.parse(localStorageUser) as User
  })

  const signup = useCallback(async (username: string): Promise<void> => {
    const newUser = await createUser(username)
    setUser(newUser)
    localStorage.setItem('user', JSON.stringify(newUser))
  }, [])

  return (
    <AuthContext.Provider value={{ user, signup }}>
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