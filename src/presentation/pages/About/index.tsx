import { Divider } from 'antd'
import { Container } from './styles'

const About: React.FC = () => (
  <Container>
    <h1>Sobre</h1>

    <p>Todo semestre é a mesma coisa: "Que dia vocês tão livre pra gente marcar
      uma reunião?", "Que dia você você pode?", "Eu tô livre às 8h, mas teria
      que sair às 9h", "Ah, legal, e você?", "Pera, que dia você pode mesmo?"
    </p>

    <p>Não mais :D O <strong>Bora Marcar</strong>  facilita a marcação de horários livres e ocupados
      e cria uma visualização muito simples de entender. Em breve vai ficar mais
      fácil ainda.
    </p>

    <Divider />
    <h2>Outras informações:</h2>
    <p>O {' '}
      <a href="https://github.com/yudi-azvd/boramarcar">
        respositório
      </a> {' '}
      desse projeto está hospedado no GitHub.
    </p>

    <p>
      Se você quiser saber o que se passa na minha cabeça enquanto
      desenvolvo esse projeto, você pode ler sobre isso nas {' '}
      <a href="https://github.com/yudi-azvd/boramarcar/blob/main/docs/devnotes.md">
        notas de desenvolvimento
      </a>.
    </p>

    <p>
      Se você quiser ver outros projetos que eu já fiz, clique
      <a href="https://github.com/yudi-azvd">aqui</a>.
    </p>
  </Container>
)

export default About
