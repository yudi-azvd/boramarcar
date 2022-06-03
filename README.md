# Bora Marcar 

Encontre e visualize horários em comum para o seu grupo. Fácil e rápido de usar.

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

Preencha o arquivo `firebase.json` com os seus dados de IP. Prefira usar um IP 
como `192.1165.71.67` em vez de `localhost` ou `127.0.0.0`. Assim será possível 
interagir com a aplicação de outros dispositivos diferentes do seu computador de
desenvolvimento (exemplo: outros computadores e celulares).

```
cp .env.example .env
```

Criar um conta no Firebase, criar um projeto e copiar os dados dele nas variáveis
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
