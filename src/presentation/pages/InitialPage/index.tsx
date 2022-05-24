import { useAuth } from "@/presentation/hooks/auth"
import { Button, Form, Input, notification } from "antd"
import { FormEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Container, Content } from './styles'

import logo from '@/presentation/assets/logo.svg'

const InitialPage: React.FC = () => {
  return (
    <Container>
      <Content>
        <img width={120} src={logo} alt="Logo" />

        <div>
          <Link to="/signup">
            <Button size="large" type="primary">
              Criar conta
            </Button>
          </Link>
          <Link to="/signin">
            <Button size="large" type="default">
              Entrar
            </Button>
          </Link>
        </div>
      </Content>
    </Container>
  )
}

export default InitialPage