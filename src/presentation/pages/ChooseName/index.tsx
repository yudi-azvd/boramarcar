import { useAuth } from "@/presentation/hooks/auth"
import { notification } from "antd"
import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Container } from './styles'

const ChooseName: React.FC = () => {
  const navigate = useNavigate()
  const { signup } = useAuth()
  const [username, setUsername] = useState('')

  function handleChangeUsername(event: FormEvent<HTMLInputElement>) {
    setUsername(event.currentTarget.value)
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (username.length < 4) {
      notification.error({
        message: 'Nome inválido',
        description: 'Escolha um nome com pelo menos 4 letras'
      })
      return
    }

    try {
      await signup(username)
      navigate('/dashboard')
    } catch (error) {
      notification.error({
        message: 'Alguma coisa deu errado',
        description: String(error)
      })
    }
  }

  return (
    <Container>
      Bem vindo
      <form onSubmit={handleSubmit}>
        <input

          size={25}
          onChange={handleChangeUsername}
          placeholder={'Clique aqui para mudar seu nome'}
          value={username}
          type="text"
          name="name"
          id="user-name"
        />
        <br />
        <button type="submit">
          Entrar
        </button>
      </form>
    </Container>
  )
}

export default ChooseName