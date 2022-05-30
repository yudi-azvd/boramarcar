import { Room } from "@/domain/types"
import { useAuth } from "@/presentation/hooks/auth"
import { CreateRoom, GetUserRooms, JoinRoom } from "@/contracts"
import { Container, Content } from "./styles"

import CreateRoomModalForm from "./components/CreateRoomModalForm"

import { useEffect, useState } from "react"
import { Button, Space, Table } from "antd"
import { ColumnsType } from "antd/lib/table"
import { Link } from "react-router-dom"
import JoinRoomModalForm from "./components/JoinRoomModalForm"

type RoomRowType = Room & {
  key: string
}

interface UserRoomsProps {
  getUserRooms: GetUserRooms
  createRoom: CreateRoom
}

function getRandomName() {
  const nameOptions = [
    'Vila da Folha',
    'Cidadela dos Ricks',
    'Terra Média',
    'Império Galático',
    'Metrópolis',
    'Quartel General'
  ]
  return nameOptions[Math.floor(Math.random() * nameOptions.length)]
}

const UserRooms: React.FC<UserRoomsProps> = ({ getUserRooms, createRoom }) => {
  const { user } = useAuth()
  const [isCreateRoomModalVisible, setIsCreateRoomModalVisible] = useState(false)
  const [isJoinRoomModalVisible, setIsJoinRoomModalVisible] = useState(false)
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
            () => handleLeaveRoomPermanently(record)}> Sair permanentemente </a>
        </Space>
      )
    }
  ]

  function handleLeaveRoomPermanently(room: Room) {
    return
    console.log(room);
    const wantsToLeave = window.confirm(`Tem certeza que deseja sair permanentemente da sala ${room.name}?`)

    if (wantsToLeave) {
      // await removeUserFromRoom(room.id)
      // setRooms(rooms.filter(r => r.id !== room.id))
    }
  }

  function openCreateRoomModal() {
    setIsCreateRoomModalVisible(true)
  }

  function openJoinRoomModal() {
    setIsJoinRoomModalVisible(true)
  }

  const joinRoom: JoinRoom = async () => ({} as Room)

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
        randomRoomname={getRandomName()}
        addRoom={(newRoom: Room) => setRooms([newRoom, ...rooms])}
        userId={user.id}
        visible={isCreateRoomModalVisible}
        onCancel={() => setIsCreateRoomModalVisible(false)}
        createRoom={createRoom}
      />

      <JoinRoomModalForm
        visible={isJoinRoomModalVisible}
        userId={user.id}
        joinRoom={joinRoom}
        onCancel={() => setIsJoinRoomModalVisible(false)}
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
          <Button onClick={openJoinRoomModal} type="primary" size="large">
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