import styled from "styled-components";

interface ContainerProps {
  cols: number
  rows: number
}

export const Container = styled.div<ContainerProps>`
  display: grid;
  grid-template-columns: repeat(${props => props.cols}, 1fr);
  grid-template-rows: repeat(${props => props.rows}, 1fr);

  > div {
    border: 1px solid #77777778;
  }

  .times-days {
    background: red;
  }
`

interface TimeboxProps {
  value: 'busy' | 'available' | undefined
}

const valueToColor = {
  busy: 'red',
  available: 'green',
}

export const Timebox = styled.div<TimeboxProps>`
  background: ${props => props.value 
  ? valueToColor[props.value]
  : 'white'};
`
