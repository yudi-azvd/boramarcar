import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(13, 1fr);

  > div {
    border: 1px solid #77777778;
  }

  .times-days {
    background: red;
  }
`

export interface TimeboxProps {
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
