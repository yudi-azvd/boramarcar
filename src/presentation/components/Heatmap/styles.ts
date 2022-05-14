import { TimeBoxValue } from '@/types'
import styled from 'styled-components'

export const timeboxColors: {
  [key in 'available' | 'busy']: string
} = {
  // undefined: #DDDDDD
  available: '#18DC86',
  busy: '#E95F63',
}

interface TimeboxProps {
  value?: TimeBoxValue
}

export const Timebox = styled.div<TimeboxProps>`
  background: ${props => props.value ? timeboxColors[props.value] : '#DDDDDD'};
  cursor: pointer;
  
  & {
    transition: all 0.2s ease;
  }

  &:hover {
    -webkit-filter: brightness(90%);
    filter: brightness(90%);
  }
`

interface ContainerProps {
  cols: number
  rows: number
  visible: boolean
}

export const Container = styled.div<ContainerProps>`
  width: 100%;
  height: 90vh;
  display: grid;
  grid-template-columns: repeat(${props => props.cols}, 1fr);
  grid-template-rows: repeat(${props => props.rows}, 1fr);
  column-gap: 4px;
  row-gap: 4px;

  > div {
    user-select: none;
    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -o-user-select: none;
    border-radius: 4px;
  }

  > div#top-left {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    border-right: 1px solid rgba(0, 0, 0, 0.1);
  }

  > div.day {
    position: relative;

    &::after {
      position: absolute;
      content: '';
      background: rgba(0, 0, 0, 0.1);
      height: 100%;
      width: 1px;
      right: -3px;
    }
  }

  > div.time {
    position: relative;

    &::after {
      position: absolute;
      content: '';
      background: rgba(0, 0, 0, 0.1);
      height: 1px;
      width: 100%;
      bottom: -3px;
    }
  }

  > div#top-left, > div.time, > div.day {
    border-radius: 5px;
  }

  > div.day, div.time {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  ${Timebox} {
    opacity: ${props => props.visible ? 1 : 0};
  }
`