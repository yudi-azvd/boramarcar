import ScheduleOrHeatmap from "@/components/ScheduleOrHeatmap"
import { useAuth } from "@/hooks/auth"
import { Button, Tooltip } from "antd"
import { Container, Side, UsersList } from "./style"

const Dashboard: React.FC = () => {
  const { user, room } = useAuth()

  const usersInRoom = [
    'Anne',
    'Audrey',
    'Ava',
    'Bella',
    'Bernadette',
    'Carol',
    'Caroline',
    'Carolyn',
    'Chloe',
  ]

  // const {room} = useRoom()
  /**
   * room: {
   *  id: string
   *  owner: User | string (username|id)
   *  participants: User[]
   *  linkToShare: string
   * }
   */

  const copyToClipboard = async () => {
    if ('clipboard' in navigator) {
      await navigator.clipboard.writeText(room.id || '')
    }
    // e se não tiver? kkk
  }

  return (
    <Container>
      {/* Saber se está em celular */}
      {/* https://stackoverflow.com/questions/39435395/reactjs-how-to-determine-if-the-application-is-being-viewed-on-mobile-or-deskto */}
      <Side>
        <Tooltip title={user.id}>
          <p><strong>Sala: {room.name}</strong></p>

          <p>
            <strong>{user.name}</strong>, {user.isOwner ? (
              <>você é o dono da sala </>
            ) : (
              <>o dono da sala é o {room.ownerName} </>
            )}
          </p>

        </Tooltip>

        <div>
          <p> Copie o ID da sala para a àrea de transferência!</p>
          <Button type="primary" onClick={copyToClipboard}>
            Copiar
          </Button>
        </div>

        <UsersList>
          {usersInRoom.map(u => (
            <li key={u} > {u} </li>
          ))}
        </UsersList>
      </Side>

      <ScheduleOrHeatmap />
    </Container>
  )
}

export default Dashboard