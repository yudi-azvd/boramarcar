import styled from "styled-components";

export const Container = styled.header`
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 60px 0;
  padding-bottom: 80px;

  div {
    display: flex;
    align-items: center;

    img {
      margin-right: 16px;
    }
  
    h2 {
      display: inline;
      margin: 0;
    }
  }
`