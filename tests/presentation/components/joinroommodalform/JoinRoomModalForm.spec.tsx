/* eslint-disable no-console */
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { JoinRoom } from '@/contracts'
import { Room } from '@/domain/types'
import JoinRoomModalForm from '@/presentation/pages/UserRooms/components/JoinRoomModalForm'

interface SutParams {
  joinRoomSpy?: JoinRoom
}

describe('JoinRoomModalForm', () => {
  const userId = 'user-id'
  const roomIdToJoin = 'room-id'
  const roomNameToJoin = 'Room Name'
  let joinedRoom: Room
  let joinRoomSpy: JoinRoom
  const addRoomSpy = jest.fn(() => { })

  const defaultJoinRoomSpy: JoinRoom = jest.fn(
    // eslint-disable-next-line no-unused-vars
    async (roomId: string, _userId: string): Promise<Room> => {
      joinedRoom = {
        id: roomIdToJoin,
        name: 'Fake Room Name',
        ownerId: '',
        status: 'Ativo',
      }
      return joinedRoom
    },
  )

  function makeSut(params?: SutParams) {
    if (params && params.joinRoomSpy) {
      joinRoomSpy = params.joinRoomSpy
    } else {
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
      submitButton: screen.getByText(/^entrar$/i),
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

  // Esses testes que testam o erro mostrado na notifica????o me parecem um tanto
  // sup??rfluos. A n??o ser que a implementa????o tratasse especificamente desses
  // diferentes erros .
  it('should not allow user to join a room they already joined', async () => {
    joinRoomSpy = jest.fn(async () => {
      throw new Error(`Usu??rio j?? est?? na sala ${roomIdToJoin}: ${roomNameToJoin}`)
    })

    const { submitButton, user, input } = makeSut({ joinRoomSpy })

    await user.type(input, roomIdToJoin)
    await user.click(submitButton)

    expect(joinRoomSpy).toHaveBeenCalled()
    expect(screen.getByText(/Usu??rio j?? est?? na sala/)).toBeTruthy()
  })

  it('should show notification error if room is not found', async () => {
    joinRoomSpy = jest.fn(async () => {
      throw new Error('A sala de ID n??o existe')
    })

    const { submitButton, user, input } = makeSut({ joinRoomSpy })

    await user.type(input, roomIdToJoin)
    await user.click(submitButton)

    expect(joinRoomSpy).toHaveBeenCalled()
    expect(screen.getByText(/A sala de ID n??o existe/)).toBeTruthy()
  })

  // Considerando que v??o ter os status
  // Ativo/Open -> Fechado -> To be Deleted?
  // Naquele per??odo depois
  it.todo('should not allow user to enter room with status closed')
})
