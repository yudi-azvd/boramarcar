import styled from 'styled-components'

interface HeatmapTimeboxProps {
  color: string
}

export const HeatmapTimebox = styled.div<HeatmapTimeboxProps>`
  background: ${({ color }) => color};
  border: 1px solid rgba(0, 0, 0, 0.1);
  
  & {
    transition: all 0.2s ease;
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

  ${HeatmapTimebox} {
    opacity: ${props => props.visible ? 1 : 0};
  }
`