import styled from "styled-components";

export const Container = styled.div`
  margin: 0 auto;
  max-width: 90%;

  button {
    margin-bottom: 16px;
  }
`
export const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column-reverse;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`

export const RoomInfo = styled.aside`
  margin-top: 32px;
  
  @media (min-width: 768px) {
    max-width: 30%;
    margin-top: 0;
  }
`

export const UsersList = styled.ul`
  margin-top: 16px;
  list-style: none;
`