import Day from "@/data/Day"
import Time from "@/data/Time"
import TimeboxValue from "@/data/TimeboxValue"
import address from "@/ip"
import { createContext, useContext, useEffect, useState } from "react"
import { io, Socket as SocketIoClient } from "socket.io-client"

type TimeboxChange = {
  time: Time,
  day: Day
  newValue: TimeboxValue
}

interface ClientToServerEvents {
  'change-timebox-value': (timeboxChange: TimeboxChange) => void
}

interface ServerToClientEvents { }

type SocketClient = SocketIoClient<ServerToClientEvents, ClientToServerEvents>

interface SocketContextInterface {
  socket: SocketClient
}

const SocketContext = createContext<SocketContextInterface>(
  {} as SocketContextInterface
)

const SocketProvider: React.FC = ({ children }) => {
  // Quando esse arquivo é salvo em desenvolvimento, o socket é
  // fechado mas não é aberto de novo automaticamente. É necessário
  // atualizar a página /dashboard para uma nova conexão
  const [socket, setSocket] = useState<SocketIoClient>(() => {
    console.log('initializing socket');
    const newSocket = io(address, { transports: ['websocket', 'polling'] })
    newSocket.on('connect', () => console.log('socket connected'))
    return newSocket
  })

  useEffect(() => {
    setSocket(socket)

    return () => {
      console.log('disconnecting socket');
      socket.disconnect()
    }
  }, [])

  return (
    <SocketContext.Provider value={{ socket }} >
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