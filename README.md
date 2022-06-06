<!-- README original -->
<!-- https://github.com/othneildrew/Best-README-Template -->
<!-- RAW https://raw.githubusercontent.com/othneildrew/Best-README-Template/master/README.md -->
<br />
<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="src/logo.svg" alt="Logo" width="80" height="80">
  </a>

  <h2 align="center">Bora Marcar</h2>

  <p align="center">
    Encontre e visualize horários em comum para o seu grupo. Fácil e rápido de usar.
    <br />
    <a href="https://boramarcar.vercel.app">Veja funcionando</a>
    ·
    <a style="pointer-events: none; display: inline-block; color: grey;" href="#">
      Achou um bug? Clique aqui</a>
    ·
    <a style="pointer-events: none; display: inline-block; color: grey;" href="#">
      Mais funcionalidades</a>
  </p>
</div>

<br />

## Visão geral

![Bora Marcar](docs/app-screenshot.png)

**Bora Marcar** é uma aplicação para ajudar você e seu grupo a encontrar os
melhores horários para uma reunião ou um rolê qualquer.

### Tecnologias

- React + TypeScript
- Firebase (Realtime Database)
- Vite

## Rodar em ambiente de desenvolvimento

Clone o repositório e entre nele:

```sh
git clone https://github.com/yudi-azvd/heatmap-schedule.git
cd heatmap-schedule
```

Esse projeto usa o Realtime Database (RTDB) do Firebase e necessita de algumas 
configurações. Como é desejável emular uma instância do RTDB localmente,
é necessário instalar a ferramenta CLI do Firebase:

```sh
npm i -g firebase-tools
```

As configurações do Firebase ficam nos arquivos `.firebaserc`, 
`database.rules.json` e `firebase.json`.

```sh
cp firebase.example.json firebase.json
```

Preencha o arquivo `firebase.json` com os seus dados de IP na propriedade
`firebase.emulators.database`. Prefira usar um IP 
como `192.1165.71.67` em vez de `localhost` ou `127.0.0.0`. Assim será possível 
interagir com a aplicação de outros dispositivos diferentes do seu computador de
desenvolvimento (exemplo: outros computadores e celulares). Faça o mesmo para
a variável `VITE_FIREBASE_DB_HOST` no arquivo `.env`:

```
cp .env.example .env
```

Crie um conta no Firebase, crie um projeto e copie os dados dele nas variáveis
do `.env` (pra ser sincero, não sei se deveria precisar de tudo isso só pra 
emular o RTDB localmente. Depois eu descubro).

Instale as dependências do projeto:

```sh
yarn 
```

Inicie o RTDB e a aplicação em janelas de terminal diferentes.

```sh
yarn db
# em outra janela de terminal:
yarn dev
```

Se deu tudo certo, você pode interagir com a aplicação digitando esse endereço
no seu navegador http://localhost:3000.

## Notas de desenvolvimento

Se você quiser o que se passa na minha cabeça durante o desenvolvimento desse
projeto, você pode ler o [devnotes](./docs/devnotes.md).

## Agradecimentos

@Edmundo-Ribeiro pelo nome do projeto. Nome simples, curto e fácil de entender.
