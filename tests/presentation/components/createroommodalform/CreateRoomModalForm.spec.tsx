import { CreateRoom } from "@/contracts"
import { Room } from "@/domain/types"
import CreateRoomModalForm from "@/presentation/pages/UserRooms/components/CreateRoomModalForm"
import { render, screen } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

describe('CreateRoomModalForm', () => {
  const userId = 'test-user-id'
  let randomRoomname = 'Random Room Name'
  let createdRoom: Room;

  let addRoomSpy = jest.fn(() => { })
  let createRoomSpy: CreateRoom = jest.fn(
    async (roomname: string, ownerId: string): Promise<Room> => {
      createdRoom = {
        id: 'ROOM_ID',
        name: roomname,
        ownerId,
        status: 'Ativo'
      }
      return createdRoom
    })

  function makeSut() {
    const renderResult = render(
      <CreateRoomModalForm
        visible
        userId={userId}
        randomRoomname={randomRoomname}
        createRoom={createRoomSpy}
        addRoom={addRoomSpy}
        onCancel={() => { }}
      />
    )
    return {
      user: userEvent.setup(),
      ...renderResult,
      input: screen.getByRole('textbox'),
      submitButton: screen.getByText(/^criar$/i)
    }
  }

  beforeEach(() => {
    console.warn = jest.fn()
  })

  it('should present random room name in input placeholder', () => {
    const { input } = makeSut()

    expect(input).toBeTruthy()
  })

  it('should create room with random name given user did not enter name into input', async () => {
    const { user, submitButton } = makeSut()

    await user.click(submitButton)

    expect(createRoomSpy).toHaveBeenCalledTimes(1)
    expect(createRoomSpy).toHaveBeenCalledWith(
      randomRoomname,
      userId
    )
  })

  it('should create room with the name the user typed and call addRoom with created room', async () => {
    const { user, input, submitButton } = makeSut()

    const newRoomname = 'Silicon Valley'

    await user.type(input, newRoomname)
    await user.click(submitButton)

    expect(createRoomSpy).toHaveBeenCalledWith(
      newRoomname,
      userId
    )
    expect(addRoomSpy).toHaveBeenCalledWith(createdRoom)
  })

  it('should not allow room name with less than 4 characters or more than 16 characters', async () => {
    const { user, input, submitButton } = makeSut()

    await user.type(input, 'Roo')
    await user.click(submitButton)

    expect(createRoomSpy).toHaveBeenCalledTimes(0)

    await user.type(input, 'really loong name')
    await user.click(submitButton)

    expect(createRoomSpy).toHaveBeenCalledTimes(0)
  })
})
