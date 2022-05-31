import { JoinRoom } from "@/contracts"
import { Room } from "@/domain/types"
import JoinRoomModalForm from "@/presentation/pages/UserRooms/components/JoinRoomModalForm"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from '@testing-library/user-event'

interface SutParams {
  joinRoomSpy?: JoinRoom
}

describe('JoinRoomModalForm', () => {
  const userId = 'user-id'
  const roomIdToJoin = 'room-id'
  const roomNameToJoin = 'Room Name'
  let joinedRoom: Room
  let joinRoomSpy: JoinRoom
  let addRoomSpy = jest.fn(() => {})

  const defaultJoinRoomSpy: JoinRoom = jest.fn(
    async (roomId: string, userId: string): Promise<Room> => {
      joinedRoom = {
        id: roomIdToJoin,
        name: 'Fake Room Name',
        ownerId: '',
        status: 'Ativo'
      }
      return joinedRoom
    })

  function makeSut(params?: SutParams) {
    if (params && params.joinRoomSpy) {
      joinRoomSpy = params.joinRoomSpy
    }
    else {
      joinRoomSpy = defaultJoinRoomSpy
    }

    const renderResult = render(<JoinRoomModalForm
      visible
      userId={userId}
      joinRoom={joinRoomSpy}
      addRoom={addRoomSpy}
      onCancel={() => { }}
    />)

    return {
      user: userEvent.setup(),
      ...renderResult,
      input: screen.getByRole('textbox'),
      submitButton: screen.getByText(/^entrar$/i)
    }
  }

  beforeEach(() => {
    console.warn = jest.fn()
  })

  it('should present an input for room ID', () => {
    makeSut()
    expect(screen.getAllByLabelText('ID da sala')).toBeTruthy()
  })

  it('should not allow empty input', async () => {
    const { submitButton, user } = makeSut()
    await user.click(submitButton)

    expect(joinRoomSpy).toHaveBeenCalledTimes(0)
  })

  it.todo('should redirect user to target room?')

  it('should add room to user rooms', async () => {
    const { submitButton, user, input } = makeSut({ joinRoomSpy })

    await user.type(input, roomIdToJoin)
    await user.click(submitButton)

    expect(addRoomSpy).toHaveBeenCalledWith(joinedRoom)
  })

  // Esses testes que testam o erro mostrado na notificação me parecem um tanto
  // supérfluos. A não ser que a implementação tratasse especificamente desses
  // diferentes erros .
  it('should not allow user to join a room they already joined', async () => {
    const joinRoomSpy: JoinRoom = jest.fn(async () => {
      throw new Error(`Usuário já está na sala ${roomIdToJoin}: ${roomNameToJoin}`)
    })

    const { submitButton, user, input } = makeSut({ joinRoomSpy })

    await user.type(input, roomIdToJoin)
    await user.click(submitButton)

    expect(joinRoomSpy).toHaveBeenCalled()
    expect(screen.getByText(/Usuário já está na sala/)).toBeTruthy()
  })

  it('should show notification error if room is not found', async () => {
    const joinRoomSpy: JoinRoom = jest.fn(async () => {
      throw new Error('A sala de ID não existe')
    })

    const { submitButton, user, input } = makeSut({ joinRoomSpy })

    await user.type(input, roomIdToJoin)
    await user.click(submitButton)

    expect(joinRoomSpy).toHaveBeenCalled()
    expect(screen.getByText(/A sala de ID não existe/)).toBeTruthy()
  })

  // Considerando que vão ter os status
  // Ativo/Open -> Fechado -> To be Deleted?
  // Naquele período depois 
  it.todo('should not allow user to enter room with status closed')
})
