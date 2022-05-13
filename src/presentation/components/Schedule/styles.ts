import { DayTime, TimeBoxValue } from '@/types'
import styled from 'styled-components'

const timeboxColors: {
  [key in TimeBoxValue]: string
} = {
  notdefined: '#BBBBBB',
  available: '#18DC86',
  busy: '#E95F63',
}

interface TimeboxProps {
  value?: TimeBoxValue
}

export const Timebox = styled.div<TimeboxProps>`
  background: ${props => props.value ? timeboxColors[props.value] : 'transparent'};
`
