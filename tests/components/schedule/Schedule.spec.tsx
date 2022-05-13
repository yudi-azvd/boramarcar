import Schedule from "@/presentation/components/Schedule"
import { fireEvent, render } from "@testing-library/react"
import '@testing-library/jest-dom'

import 'jest-styled-components'
import { Day, Time } from "@/types"

const times: Time[] = ['09h', '10h', '11h']
const days: Day[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday']

function makeSut() {
  const { container } = render(<Schedule days={days} times={times} values={{}} />)
  const timeboxes = [...container.querySelectorAll('.timebox')]
  return {
    container: container as HTMLDivElement,
    timeboxes
  }
}

describe('Schedule', () => {
  it('should display 1 hour timeboxes Sunday through Wednesday, from 09h to 11h', () => {
    const { container, timeboxes } = makeSut()

    expect(timeboxes).toHaveLength(12)

    const presentDaysTimes = ['Sunday-09h', 'Sunday-11h', 'Wednesday-09h', 'Wednesday-11h']
    presentDaysTimes.forEach(dayTime => {
      expect(container.querySelector(`#sch-${dayTime}`)).toBeTruthy()
    })

    const absentDaysTimes = ['Sunday-12h', 'Wednesday-20h', 'Saturday-15h']
    absentDaysTimes.forEach(dayTime => {
      expect(container.querySelector(`#sch-${dayTime}`)).toBeFalsy()
    })
  })

  it('should initially display all timeboxes with transparent color', () => {
    const { timeboxes } = makeSut()

    timeboxes.forEach(t => {
      expect(t).toMatchSnapshot()
      expect(t).toHaveStyleRule('background', '#DDDDDD')
    })
  })

  it('should change Timebox value from undefined to available on first click', () => {
    const { container } = makeSut()

    const timeboxToClick = container.querySelector('#sch-Sunday-09h') as HTMLDivElement
    fireEvent.click(timeboxToClick)

    expect(timeboxToClick).toHaveStyleRule('background', '#18DC86')
  })

  it('should change Timebox value from available to busy on second click', () => {
    const { container } = makeSut()

    const timeboxToClick = container.querySelector('#sch-Sunday-09h') as HTMLDivElement
    fireEvent.click(timeboxToClick)
    fireEvent.click(timeboxToClick)

    expect(timeboxToClick).toHaveStyleRule('background', '#E95F63')
  })

  it('should change Timebox value from busy color to undefined color on third click', () => {
    const { container } = makeSut()

    const timeboxToClick = container.querySelector('#sch-Sunday-09h') as HTMLDivElement
    fireEvent.click(timeboxToClick)
    fireEvent.click(timeboxToClick)
    fireEvent.click(timeboxToClick)

    expect(timeboxToClick).toHaveStyleRule('background', '#DDDDDD')
  })
})
