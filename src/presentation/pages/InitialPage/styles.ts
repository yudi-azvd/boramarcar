import styled from 'styled-components'

export const Container = styled.div`
  width: 90%;
  height: 100vh;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > img {
    margin-bottom: 18px;
  }

  > div {
    display: flex;
    flex-direction: column;
  }

  > div button {
    width: 100%;
  }

  > div a + a {
    margin-top: 18px;
  }

  input {
    font-weight: bold;
    background: transparent;
    border: 1px solid grey;
    border: none;
    width: fit-content;
  }
`
