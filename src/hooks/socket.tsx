import { createContext, useCallback, useContext, useState } from "react";
import { io } from 'socket.io-client'

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
  roomId: string
}

interface JoinRoomCallbacks {
  onSuccess: () => void
  onFailure: () => void
}

interface SocketContextInterface {
  createRoom(createRoomData: CreateRoomData): void
  joinRoom(joinRoomData: JoinRoomData): void
  registerJoinRoomCallbacks: (callbacks: JoinRoomCallbacks) => void
}

const SocketContext = createContext<SocketContextInterface>(
  {} as SocketContextInterface
)

const SocketProvider: React.FC = ({ children }) => {
  let registeredJoinRoomSuccess = false
  let registeredJoinRoomFailure = false
  const socket = io('http://localhost:5000', { transports: ['websocket'] })
  socket.on('connect', () => {
    console.log('socket created', socket.id)
  })

  const createRoom = useCallback((createRoomData: CreateRoomData) => {
    socket.emit('room:create', createRoomData)
  }, [])

  const joinRoom = useCallback((joinRoomData: JoinRoomData) => {
    socket.emit('room:join', joinRoomData)
    console.log('socket emit join room');

  }, [])

  const registerJoinRoomCallbacks = useCallback((callbacks: JoinRoomCallbacks) => {
    if (callbacks.onSuccess !== undefined && !registeredJoinRoomSuccess) {
      socket.on('room:join-success', callbacks.onSuccess)
      registeredJoinRoomSuccess = true
      console.log('register on join sucess ');
    }
    if (callbacks.onFailure !== undefined && !registeredJoinRoomFailure) {
      socket.on('error:room-does-not-exist', callbacks.onFailure)
      registeredJoinRoomFailure = true
      console.log('register on join FAILURE');
    }
  }, [])

  return (
    <SocketContext.Provider value={{ createRoom, joinRoom, registerJoinRoomCallbacks }}>
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