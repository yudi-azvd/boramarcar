import React from 'react'
import '@testing-library/jest-dom'
import { fireEvent, queryByText, render, screen, waitFor } from '@testing-library/react'
import JoinRoomForm from '@/components/JoinRoomForm'
import IJoinRoomService from '@/contracts/IJoinRoomService'

interface SutType {
  onCancel: ((e: React.MouseEvent<HTMLElement, MouseEvent>) => void) | undefined
  onSubmit: ((values: any) => void) | undefined
  joinRoomService: IJoinRoomService
}

class JoinRoomServiceFake implements IJoinRoomService {
  async run(): Promise<void> {

  }
}

const makeSut = () => {
  const onCancelMock = jest.fn()
  const onSubmitMock = jest.fn()
  const joinRoomServiceFake = new JoinRoomServiceFake()

  const container = render(
    <JoinRoomForm 
      visible 
      onCancel={onCancelMock} 
      onSubmit={onSubmitMock}
      joinRoomService={joinRoomServiceFake} 
    />)

  return {
    container,
    onCancelMock,
  }
}


describe('JoinRoomForm', () => {
  // https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
  // https://stackoverflow.com/questions/39830580/jest-test-fails-typeerror-window-matchmedia-is-not-a-function
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }))
    });
  });

  it('should close if close button is clicked', async () => {
    const { container } = makeSut()
    const input = queryByText(container.container, 'Your name')

    fireEvent.click(screen.getByRole('button', { name: 'Close' }))

    await waitFor(() => {
      expect(input).not.toBeInTheDocument()
    })
  })

  it.todo('should redirect to /heatmap-schedule on successful submission')
})