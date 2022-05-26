import { Room } from "@/domain/types"
import { useAuth } from "@/presentation/hooks/auth"
import { GetUserRooms } from "@/contracts"
import { Container, Content } from "./styles"

import CreateRoomModalForm from "./components/CreateRoomModal"

import { useEffect, useState } from "react"
import { Button, Space, Table } from "antd"
import { ColumnsType } from "antd/lib/table"
import { Link } from "react-router-dom"

type RoomRowType = Room & {
  key: string
}

interface UserRoomsProps {
  getUserRooms: GetUserRooms
}

const UserRooms: React.FC<UserRoomsProps> = ({ getUserRooms }) => {
  const { user } = useAuth()
  const [isCreateRoomModalVisible, setIsCreateRoomModalVisible] = useState(false)
  const [rooms, setRooms] = useState<Room[]>([])

  const dataSource: RoomRowType[] = rooms.map(room => (
    {
      id: room.id,
      key: room.id,
      name: room.name,
      status: room.status
    }
  ))

  const columns: ColumnsType<RoomRowType> = [
    {
      title: 'Nome da sala',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status'
    },
    {
      title: 'Ações',
      key: 'action',
      render: (_: any, record: RoomRowType) => (
        <Space size="middle">
          <Link to={`/r/${record.key}`}> Entrar </Link>
          <a className="leave" onClick={
            () => handleLeaveRoomPermanentely(record)}> Sair permanentemente </a>
        </Space>
      )
    }
  ]

  function handleLeaveRoomPermanentely(room: Room) {
    return
    console.log(room);
    const wantsToLeave = window.confirm(`Tem certeza que deseja sair permanentemente da sala ${room.name}?`)

    if (wantsToLeave) {
      // await removeUserFromRoom(room.id)
      // setRooms(rooms.filter(r => r.id !== room.id))
    }
  }

  function openCreateRoomModal() {
    console.log('create room function modal');
    setIsCreateRoomModalVisible(true)
  }

  useEffect(() => {
    async function getRooms() {
      const r = await getUserRooms(user.id)
      setRooms(r)
    }

    getRooms()
  }, [])

  return (
    <Container>
      <p>Bem vindo, <strong>{user.name}</strong> </p>

      <CreateRoomModalForm
        visible={isCreateRoomModalVisible}
        onCancel={() => setIsCreateRoomModalVisible(false)}
      />

      <Content>
        {rooms.length === 0 ? (
          <>
            <p>Parece que você não está participando de nenhuma sala.
              Comece criando ou entrando em uma sala clicando nos botões.</p>
          </>
        ) : (
          <Table dataSource={dataSource} columns={columns} pagination={false} />
        )}

        <div>
          <Button type="primary" size="large">
            Entrar em sala com link
          </Button>
          <Button onClick={openCreateRoomModal} size="large">
            Criar sala
          </Button>
        </div>
      </Content>
    </Container>
  )
}

export default UserRooms