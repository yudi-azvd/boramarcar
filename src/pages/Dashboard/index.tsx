import ScheduleOrHeatmap from "@/components/ScheduleOrHeatmap"
import { useSocket } from "@/hooks/socket"
import { Button, Tooltip } from "antd"
import { Container, Side, UsersList } from "./style"

const Dashboard: React.FC = () => {
  const { user } = useSocket()

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
      await navigator.clipboard.writeText('ssss')
    }
    // e se não tiver? kkk
  }

  return (
    <Container>

      <Side>
        <Tooltip title={user?.id}>
          <strong>{user?.name}</strong>
        </Tooltip>

        {user?.isOwner
          ? (<p>Você é o dono da sala</p>)
          : (<p>O dono dessa sala é o fulaninho</p>)}

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