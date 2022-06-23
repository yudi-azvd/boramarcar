# Montar ambiente de desenvolvimento

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
