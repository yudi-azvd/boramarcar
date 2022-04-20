import styled from 'styled-components'

const timeboxColors: {
  [key: string]: string
} = {
  notdefined: 'transparent',
  available: '#18DC86',
  busy: '#E95F63',
}

interface TimeboxProps {
  value: 'notdefined' | 'available' | 'busy'
}

export const Timebox = styled.div<TimeboxProps>`
  background: ${props => timeboxColors[props.value] ?? 'transparent'};
`
