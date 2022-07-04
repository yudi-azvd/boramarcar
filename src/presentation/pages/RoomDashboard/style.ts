import styled from 'styled-components'

export const Container = styled.div`
  margin: auto;
  margin-top: 16px;
  width: 90%;

  > a {
    display: block;
    margin-bottom: 16px;
  }

  > a svg {
    margin-right: 8px;
  }
`

export const Content = styled.div`
  display: grid;
  gap: 16px;
  grid-template-areas: 
    "T"
    "S" // ScheduleOrHeatmap
    "R";
  /* Idealmente a parte R (UserInfo) seria uma barra lateral
  retrátil */
  
  @media (min-width: 768px) {
    grid-template-areas: 
    "T T T T T"
    "R S S S S";
  }

  padding-bottom: 32px;
`

export const Top = styled.div`
  grid-area: T;

  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  justify-content: space-between;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`

export const RoomInfo = styled.aside`
  grid-area: R;

  li {
    list-style: decimal;
  }

  .ant-list-item {
    cursor: pointer;
    display: flex;
    flex-direction: row;
  }

  span {
    padding: 2px 8px;
    border-radius: 8px;
    transition: background 0.2s;
  }

  span.selected {
    /* background: rgba(0, 255, 0, 0.3); */
    background: #18DC86;
  }
`
