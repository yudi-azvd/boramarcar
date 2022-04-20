import Schedule from "@/presentation/components/Schedule"
import { render } from "@testing-library/react"
import '@testing-library/jest-dom'

import 'jest-styled-components'

const times = ['09h', '10h', '11h']
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday']

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
      expect(t).toHaveStyleRule('background', 'transparent')
    })
  })
})
