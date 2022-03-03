import styled from "styled-components";

interface ContainerProps {
  cols: number
  rows: number
}

export const Container = styled.div<ContainerProps>`
  display: grid;
  grid-template-columns: repeat(${props => props.cols}, 1fr);
  grid-template-rows: repeat(${props => props.rows}, 1fr);
  grid-row-gap: 4px;
  grid-column-gap: 4px;

  > div {
    color: rgba(0, 0, 0, 0.7);
  }

  > div#top-left {
    text-align: center;
    border-bottom: 2px solid rgba(0, 0, 0, 0.05);
    border-right: 2px solid rgba(0, 0, 0, 0.05);
  }
  
  > div.day {
    position: relative;
    /* border-right: 2px solid rgba(0, 0, 0, 0.05); */

    &::after {
      position: absolute;
      content: '';
      background: rgba(0, 0, 0, 0.05);
      height: 100%;
      width: 2px;
      right: -3px;
    }
    /* border-left: 2px solid rgba(0, 0, 0, 0.05); */
    /* border-bottom: 2px solid rgba(0, 0, 0, 0.05); */
  }

  > div.time {
    /* border-top: 2px solid rgba(0, 0, 0, 0.05); */
    /* border-bottom: 2px solid rgba(0, 0, 0, 0.05); */
    /* border-right: 2px solid rgba(0, 0, 0, 0.05); */
    position: relative;

    &::after {
      position: absolute;
      content: '';
      background: rgba(0, 0, 0, 0.05);
      height: 2px;
      width: 100%;
      bottom: -3px;
    }
  }

  > div#top-left, > div.time, > div.day {
    border-radius: 5px;
  }

  > div.day, > div.time {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

interface TimeboxProps {
  value: 'busy' | 'available' | undefined
}

const valueToColor = {
  busy: '#E95F63',
  available: '#18DC86',
}

export const Timebox = styled.div<TimeboxProps>`
  background: ${props => props.value 
    ? valueToColor[props.value]
    : 'white'};

  transition: border 0.2s;
  border: 2px solid rgba(0, 0, 0, 0.0);
  border-radius: 5px;
  
  &:hover {
    border: 2px solid rgba(0, 0, 0, 0.15);
  }
`
