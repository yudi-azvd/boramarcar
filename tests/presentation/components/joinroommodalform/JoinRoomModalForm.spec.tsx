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
  let joinedRoom: Room
  let joinRoomSpy: JoinRoom
  const defaultJoinRoomSpy = jest.fn(
    async (roomId: string, userId: string): Promise<Room> => {
      joinedRoom = {
        id: roomId,
        name: 'Fake Room Name',
        ownerId: '',
        status: 'Ativo'
      }
      return joinedRoom
    })

  function makeSut(params?: SutParams) {
    joinRoomSpy = params && params.joinRoomSpy || defaultJoinRoomSpy

    const renderResult = render(<JoinRoomModalForm
      userId={userId}
      joinRoom={joinRoomSpy}
    />)
    
    return {
      user: userEvent.setup(),
      ...renderResult,
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

  it('should show notification error if room is not found', async () => {
    joinRoomSpy = jest.fn(async () => {
      console.log('>>> joinRoomSpy');
      
      throw new Error('A sala de ID não existe')
    })
    
    const { submitButton, user } = makeSut({
      joinRoomSpy
    })

    await user.click(submitButton)

    // await waitFor(() => {
      expect(screen.getByText(/A sala de/)).toBeTruthy()
    // })
  })

  it.todo('should redirect user to target room')
  it.todo('should add room to user rooms')
  // Considerando que vão ter os status
  // Ativo/Open -> Fechado -> To be Deleted?
  // Naquele período depois 
  it.todo('should not allow user to enter room with status closed and show notification about it')
})
