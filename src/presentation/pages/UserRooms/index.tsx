import { useEffect, useState } from 'react'
import {
  Button, Space, Table, Tooltip,
} from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { useNavigate } from 'react-router-dom'
import { Room } from '@/domain/types'
import { useAuth } from '@/presentation/hooks/auth'
import { CreateRoom, GetUserRooms, JoinRoom } from '@/contracts'
import { Container, Content } from './styles'

import CreateRoomModalForm from './components/CreateRoomModalForm'
import JoinRoomModalForm from './components/JoinRoomModalForm'

type RoomRowType = Room & {
  key: string
}

interface UserRoomsProps {
  getUserRooms: GetUserRooms
  createRoom: CreateRoom
  joinRoom: JoinRoom
}

function getRandomName() {
  const nameOptions = [
    'Vila da Folha',
    'Cidadela dos Ricks',
    'Terra Média',
    'Império Galático',
    'Metrópolis',
    'Quartel General',
  ]
  return nameOptions[Math.floor(Math.random() * nameOptions.length)]
}

const UserRooms: React.FC<UserRoomsProps> = ({ getUserRooms, createRoom, joinRoom }) => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [isCreateRoomModalVisible, setIsCreateRoomModalVisible] = useState(false)
  const [isJoinRoomModalVisible, setIsJoinRoomModalVisible] = useState(false)
  const [rooms, setRooms] = useState<Room[]>([])

  const dataSource: RoomRowType[] = rooms.map((room) => (
    {
      id: room.id,
      key: room.id,
      name: room.name,
      status: room.status,
    }
  ))

  const columns: ColumnsType<RoomRowType> = [
    {
      title: 'Nome da sala',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Ações',
      key: 'action',
      render: (_: any, room: RoomRowType) => (
        <Space size="middle">
          <Button type="link" onClick={() => navigate(`/r/${room.key}`, { state: { room } })}> Entrar </Button>
          {/* <Link to={{ pathname: `/r/${room.key}` }}> Entrar </Link> */}
          <Button
            className="leave"
            type="link"
            onClick={
              // () => handleLeaveRoomPermanently(record)
              () => { }
            }
          >
            Sair permanentemente
          </Button>
        </Space>
      ),
    },
  ]

  function handleLeaveRoomPermanently(room: Room) {
    const wantsToLeave = window.confirm(`Tem certeza que deseja sair permanentemente da sala ${room.name}?`)

    if (wantsToLeave) {
      // await removeUserFromRoom(room.id)
      // setRooms(rooms.filter(r => r.id !== room.id))
    }
  }

  function addRoom(room: Room) {
    setRooms([room, ...rooms])
  }

  function openCreateRoomModal() {
    setIsCreateRoomModalVisible(true)
  }

  function openJoinRoomModal() {
    setIsJoinRoomModalVisible(true)
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
      <p>
        Bem vindo, <strong>{user.name}</strong>
      </p>
      <Tooltip title="Você deve usar o seu ID para logar">
        <p>Seu ID: {user.id} </p>
      </Tooltip>

      <CreateRoomModalForm
        randomRoomname={getRandomName()}
        addRoom={addRoom}
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
        addRoom={addRoom}
      />

      <Content>
        {rooms.length === 0 ? (
          <p>
            Parece que você não está participando de nenhuma sala.
            Comece criando ou entrando em uma sala clicando nos botões.
          </p>
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
