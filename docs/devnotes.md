
## 2022-05-14 
Em nenhuma ordem em particular.

### Objetivos desse projeto 
...

### Desenvolvimento incremental
- Primeiro fiz apenas o Schedule funcionando com dias e horários hard coded.


### Mudanças em geral
Fazer mudanças com testes unitários é uma beleza. É paz e tranquilidade na 
consciência do desenvolvedor. Se ele errar qualquer coisa ele será notificado
pela execução dos testes. 

### Mudanças em algumas interfaces
As interfaces são as partes mais importantes do projeto. Mudei ela uma vez e a 
mudança repercutiu em "muitos" outros lugares.

Minha **primeira abordagem** foi de passar um repositório de cronograma (`ScheduleRepository`)
como depedência para o componente `Schedule`. De cara estranhei um pouco essa abordagem
porque parece muito coisa de backend. O componente `Schedule` usava dois métodos do 
repositório: `getAll` pra pegar o cronograma do usuário e `updateAlgumaCoisa` pra
atualizar um horário do usuário quando ele clica num quadradinho.

Na hora do desenvolvimento, acabei percebendo que tinha que atualizar
o componente `Heatmap` quando o usuário clica em algum quadradinho do `Schedule`.
Uma chamada de método dentro de `Schedule` deveria causar uma mudança de estado
em `Heatmap`. Lembrando que `Schedule` e `Heatmap` são componentes filhos de
`ScheduleOrHeatmap` mais ou menos assim:

```jsx
<ScheduleOrHeatmap>
  <Schedule scheduleRepository={fakeScheduleRepository} {/* ... */} />
  <Heatmap users={users} {/* ... */} />
</ScheduleOrHeatmap>
```

Como a única atualização do cronograma do usuário é feita por 
`fakeScheduleRepository.update` eu teria que acrescentar uma lógica de atualização
de estado de `Heatmap` _dentro_ de `FakeScheduleRepository`. Isso me pareceu muita
bagunça mesmo pra uma implementação em "protótipo". Além disso, eu acreditava que
essa abordagem não refletiria um fluxo de dados que lembraria o fluxo de dados
em produção. Vou chamar essa abordagem de **abordagem baguncinha**.

Então acabei trocando o repositório por duas funções. Elas são 
`GetUserScheduleInThisRoom` e `UpdateUserScheduleInThisRoom` e aceitam os mesmos
argumentos que os métodos do antigo repositório. Essas funções têm as seguintes
assinaturas:

```ts
export interface GetUserScheduleInThisRoom {
  (getAllSchedule: GetUserScheduleDTO): Promise<{ [key in DayTime]?: TimeboxValue }>
}

export interface UpdateUserScheduleInThisRoom {
  (updateSchedule: UpdateScheduleDTO): Promise<void>
}
```

Acho que a vantangem dessa **segunda abordagem** é que eu posso usar qualquer 
implentação de `UpdateUserScheduleInThisRoom` e passar para `Schedule`. 
Incluindo uma implementação que chama `fakeScheduleRepository.update`. Mas agora
o componente `Schedule` depende apenas das funções e não de um repositório.

Uma **terceira abordagem** de fazer isso, ainda parecida coma **segunda 
abordagem**, seria substituir essas funções por objetos de classe de serviço ou 
classe de caso de uso que implementam as seguintes interfaces:

```ts
interface UpdateUserScheduleInThisRoomService {
  run: (updateSchedule: UpdateScheduleDTO) => Promise<void>
}

interface GetUserScheduleInThisRoom {
  run: (getAllSchedule: GetUserScheduleDTO) => 
    Promise<{ [key in DayTime]?: TimeboxValue }>
}
```

E na "main" eu teria algo como `FakeUpdateUserScheduleInThisRoomService`, que
implmenratia `UpdateUserScheduleInThisRoomService` e cujo método `run` executaria
uma função que causaria uma mudança de estado em `Heatmap`.

Se você parar pra pensar, a **terceira abordagem** não é _tão_ diferente da 
**abordagem baguncinha**. Tanto o repositório fake da **abordagem baguncinha**
quanto os serviços fake da **abordagem baguncinha** implementam uma  interface 
da qual `Schedule` depende. Nessas duas abordagens, `Schedule` depende de métodos
que executam um rotina qualquer. A maior diferença é que as operações `get` e 
`update` estão separadas em interfaces diferentes, o que está mais condizente com o 
[Interface Segregation Principle](https://en.wikipedia.org/wiki/Interface_segregation_principle)
do [SOLID](https://en.wikipedia.org/wiki/SOLID). 

Acho que essa mudança de nomes foi, na verdade, o meu subconsciente me guiando
para longe da ideia nomes com `Repository` no frontend. Vai saber.


### Testes
- O que eu achei de TDD, Jest e tempo de execução dos testes
devagar
- Talvez TDD não valha à pena. Talvez seja melhor testes E2E
- Preciso aprender mais sobre snapshot do Jest e `waitFor` e `act` do React Testing
library.

### "Espaço" de desenvolvimento
Puxar um pouco das ideias de desenvolvimentos de jogos:
pequenos laboraórios dentro projeto, assim como cenas no Godot. O jogo principal,
a "main" ainda existe ao lado desses pequenos laboratórios. No Godot é possível
executar cada um desses laboratórios individual e isoladamente.

**Ideia**: usar variáveis ambiente (`.env`) para o app saber qual "laboratório"
ele deve executar. Essa estratégia também deve funcionar no pipeline de CI (?).