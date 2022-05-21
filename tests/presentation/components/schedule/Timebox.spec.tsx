import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import 'jest-styled-components'

import { TimeboxItem } from '@/presentation/components/ScheduleTab/styles'
import { Availability } from '@/types'

interface SutProps {
  availability?: Availability
}

interface Sut {
  sut: HTMLDivElement
}

function makeSut({ availability }: SutProps): Sut {
  const { container } = render(<TimeboxItem id="timebox-id" availability={availability} />)
  return { sut: container.querySelector('#timebox-id') as HTMLDivElement }
}

describe('Timebox', () => {
  it('should be grey when its value is undefined', () => {
    const { sut } = makeSut({ availability: undefined })

    expect(sut).toMatchSnapshot()
    expect(sut).toHaveStyle(`background: #FFFFFF`)
  })

  it('should be green when its value is available', () => {
    const { sut } = makeSut({ availability: 'available' })
    
    expect(sut).toMatchSnapshot()
    expect(sut).toHaveStyle(`background: #18DC86`)
  })
  
  it('should be red when its value is busy', () => {
    const { sut } = makeSut({ availability: 'busy' })

    expect(sut).toMatchSnapshot()
    expect(sut).toHaveStyle(`background: #E95F63`)
  })
})
