import styled from "styled-components";

export const Container = styled.div`
  margin: 0 auto;
  max-width: 90%;
`
export const Content = styled.div`
  display: flex;
  justify-content: space-between;
`

export const RoomInfo = styled.aside`
  display: none;

  @media (min-width: 768px) {
    display: block;
  }
`

export const UsersList = styled.ul`
  margin-top: 16px;
  list-style: none;
`