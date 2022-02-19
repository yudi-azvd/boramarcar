import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 60px;
  align-items: center;
  width: 100%;

  > img, > h1 {
    margin-bottom: 116px;
  }

  div {
    display: flex;
    flex-direction: column;

    button + button {
      margin-top: 30px;
    }
  }
`