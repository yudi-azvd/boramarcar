import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import 'jest-styled-components'

import { Timebox } from '@/presentation/components/Schedule/styles'

interface SutProps {
  value: 'notdefined' | 'available' | 'busy'
}

interface Sut {
  sut: HTMLDivElement
}

function makeSut({ value }: SutProps): Sut {
  const { container } = render(<Timebox id="timebox-id" value={value} />)
  return { sut: container.querySelector('#timebox-id') as HTMLDivElement }
}

describe('Timebox', () => {
  it('should be transparent when its value is notdefined', () => {
    const { sut } = makeSut({ value: 'notdefined' })

    expect(sut).toMatchSnapshot()
    expect(sut).toHaveStyle(`background: transparent`)
  })

  it('should be green when its value is available', () => {
    const { sut } = makeSut({ value: 'available' })
    
    expect(sut).toMatchSnapshot()
    expect(sut).toHaveStyle(`background: #18DC86`)
  })
  
  it('should be red when its value is busy', () => {
    const { sut } = makeSut({ value: 'busy' })

    expect(sut).toMatchSnapshot()
    expect(sut).toHaveStyle(`background: #E95F63`)
  })
})