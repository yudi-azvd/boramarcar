import styled from 'styled-components'

export const Container = styled.div`
  margin: auto;
  margin-top: 16px;
  width: 90%;
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
  align-items: center;
  justify-content: space-between;
`

export const RoomInfo = styled.aside`
  grid-area: R;

  li {
    list-style: decimal;
  }
`
