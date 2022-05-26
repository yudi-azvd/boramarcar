import styled from "styled-components";

export const Container = styled.div`
  width: 90%;
  margin: 0 auto;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }

  > div {
    height: 100%;
    display: flex;
    flex-direction: column;

    button + button {
      margin-top: 16px;
    }
  }

  a.leave {
    color: #ff4d4f;
    color: grey;
    cursor: not-allowed;
  }
`
