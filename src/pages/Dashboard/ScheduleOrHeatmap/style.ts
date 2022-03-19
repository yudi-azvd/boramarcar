import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  
  @media (min-width: 768px) {
    height: auto;
  }
  
  div.schedule-or-heatmap {
    position: relative;
    width: 100%;
    height: 100vh;
  }
`

export const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;

  @media (min-width: 768px) {
    display: block;
    
    button + button {
      margin-left: 32px;
    }
  }
`