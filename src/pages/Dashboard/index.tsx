import ScheduleOrHeatmap from "@/components/ScheduleOrHeatmap"
import { useAuth } from "@/hooks/auth"
import Header from "@/components/Header"
import { Button, Tooltip } from "antd"
import { Container, Content, RoomInfo, UsersList } from "./style"

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
      <Header />

      <Content>
        {/* Saber se está em celular */}
        {/* https://stackoverflow.com/questions/39435395/reactjs-how-to-determine-if-the-application-is-being-viewed-on-mobile-or-deskto */}
        {/* Fazer RoomInfo um menu lateral retrátil à esquerda em desktop */}
        {/* Em mobile, esse menu deve ser escondido por padrão. É aberto clicando */}
        {/* em um hamburguer à esquerda */}
        <RoomInfo>
          <p><strong>Sala: {room.name}</strong></p>
          <Tooltip title={user.id}>
            <p>
              <strong>{user.name}</strong>, {' '}
              <span>
                {user.isOwner
                  ? 'você é o dono da sala.'
                  : `o dono da sala é ${room.ownerName}.`
                }
              </span>
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
        </RoomInfo>

        <ScheduleOrHeatmap />
      </Content>
    </Container>
  )
}

export default Dashboard