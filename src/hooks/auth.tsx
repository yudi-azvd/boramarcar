import api from "@/api";
import CreateRoomRequest from "@/data/CreateRoomRequest";
import { CreateRoomResponse } from "@/data/CreateRoomResponse";
import JoinRoomRequest from "@/data/JoinRoomRequest";
import Room from "@/data/Room";
import User from "@/data/User";
import { AxiosResponse } from "axios";
import { createContext, useCallback, useContext, useState } from "react";

interface JoinRoomResponse {
  user: User
  room: Room
}

interface AuthContextInterface {
  user: User 
  room: Room
  createRoom(createRoomData: CreateRoomRequest): Promise<void>
  joinRoom(joinRoomData: JoinRoomRequest): Promise<void>
}

const AuthContext = createContext<AuthContextInterface>(
  {} as AuthContextInterface
)

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User>({ id: 'no-id', isOwner: false, name: 'no-name' })
  const [room, setRoom] = useState<Room>({ id: 'no-id', name: 'no-name', ownerId: 'no-id', ownerName: 'no-name' })

  const createRoom = useCallback(async (createRoomRequest: CreateRoomRequest): Promise<void> => {
    const { data: { room, user } } = await api.post<CreateRoomRequest, AxiosResponse<CreateRoomResponse>>('/create-room', createRoomRequest)
    setUser(user)
    setRoom(room)

    console.log(room, user);
    
  }, [])

  const joinRoom = useCallback(async (joinRoomRequest: JoinRoomRequest): Promise<void> => {
    const { data: { room, user } } = await api.post<JoinRoomRequest, AxiosResponse<JoinRoomResponse>>('/join-room', joinRoomRequest)
    console.log('explodiu');
    setUser(user)
    setRoom(room)
  }, [])

  return (
    <AuthContext.Provider value={{ createRoom, joinRoom, user, room }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth(): AuthContextInterface {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useSocket must be used within SocketProvider')
  }

  return context
}

export { AuthProvider, useAuth }