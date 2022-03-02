import { createContext, useCallback, useContext, useState } from "react";
import { io, Socket } from 'socket.io-client'

const SERVER_ADDRESS = import.meta.env.VITE_SERVER_ADDRESS || 'http://localhost'
const PORT = import.meta.env.VITE_SERVER_PORT || 5000

interface CreateRoomData {
  username: string
  roomId: string
  timeboxDuration: string
  daysStartAt: string
  daysEndAt: string
  weekendDays: boolean
}

interface JoinRoomData {
  username: string
  roomId: string,
}

interface JoinRoomCallbacks {
  onSuccess: () => void
  onFailure: () => void
}

interface SocketContextInterface {
  user: User | null
  createRoom(createRoomData: CreateRoomData): void
  joinRoom(joinRoomData: JoinRoomData): void
  registerJoinRoomCallbacks: (callbacks: JoinRoomCallbacks) => void
}

interface User {
  name: string
  id: string
  isOwner: boolean
}

const SocketContext = createContext<SocketContextInterface>(
  {} as SocketContextInterface
)

const SocketProvider: React.FC = ({ children }) => {
  let registeredJoinRoomSuccess = false
  let registeredJoinRoomFailure = false

  const [user, setUser] = useState<User>({id: 'no-id', isOwner: false, name: 'no-name'})

  // const [socket, setSocket] = useState<Socket>(
  //   // if socket ja n foi criado... entao crie
  // )

  const sssocket = io(`${SERVER_ADDRESS}:${PORT}`, { transports: ['websocket'] })
  console.log('creating socket');
  // const socket = io(`${SERVER_ADDRESS}:${PORT}`, { transports: ['websocket', 'polling'] })
  sssocket.on('connect', () => {
    console.log('socket created', sssocket.id)
  })

  const createRoom = useCallback((createRoomData: CreateRoomData) => {
    sssocket.emit('room:create', createRoomData)
    setUser({
      name: createRoomData.username,
      id: sssocket.id,
      isOwner: true
    })
  }, [])

  const joinRoom = useCallback((joinRoomData: JoinRoomData) => {
    sssocket.emit('room:join', joinRoomData)
    setUser({
      name: joinRoomData.username,
      id: sssocket.id,
      isOwner: false
    })

    console.log('socket emit join room');
  }, [])

  const registerJoinRoomCallbacks = useCallback((callbacks: JoinRoomCallbacks) => {
    console.log('imma register?');

    if (callbacks.onSuccess !== undefined && !registeredJoinRoomSuccess) {
      sssocket.on('room:join-success', callbacks.onSuccess)
      registeredJoinRoomSuccess = true
      console.log('register on join sucess ');
    }
    if (callbacks.onFailure !== undefined && !registeredJoinRoomFailure) {
      sssocket.on('error:room-does-not-exist', callbacks.onFailure)
      registeredJoinRoomFailure = true
      console.log('register on join FAILURE');
    }
  }, [])

  return (
    <SocketContext.Provider value={{ createRoom, joinRoom, registerJoinRoomCallbacks, user }}>
      {children}
    </SocketContext.Provider>
  )
}

function useSocket(): SocketContextInterface {
  const context = useContext(SocketContext)

  if (!context) {
    throw new Error('useSocket must be used within SocketProvider')
  }

  return context
}

export { SocketProvider, useSocket }