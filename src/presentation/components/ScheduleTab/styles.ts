import { Availability } from '@/domain/types'
import styled from 'styled-components'

import { timeboxColors } from '@/domain/schedule/colors'

interface TimeboxItemProps {
  availability?: Availability
}

export const TimeboxItem = styled.div<TimeboxItemProps>`
  background: ${props => props.availability
    ? timeboxColors[props.availability]
    : '#FFFFFF'};
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.1);
  
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

  > div.day, div.time {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  ${TimeboxItem} {
    opacity: ${props => props.visible ? 1 : 0};
  }
`