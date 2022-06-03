import styled from 'styled-components'

export const Container = styled.div`
  width: 90%;
  margin: 0 auto;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column-reverse;
  
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }

  > div.buttons {
    height: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 16px;

    /* button + button {
      margin-top: 16px;
    } */
    button {
      margin-bottom: 16px;
    }
  }

  @media (min-width: 768px) {
    > div.buttons {
      margin: 0 auto;
    }
  }

  .ant-space .ant-space-item {
    button {
      padding-left: 0;
    }

    button.leave {
      color: #ff4d4f;
      color: grey;
      cursor: not-allowed;
    }
  }
`
