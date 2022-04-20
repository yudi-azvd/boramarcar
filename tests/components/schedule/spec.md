## Timebox
Subcomponente de Schedule.

- OK Quando o seu valor for **notdefined**, sua cor deve ser tranparente
- OK Quando o seu valor for **available**, deve mostrar uma cor verde
- OK Quando o seu valor for **busy**, deve mostrar uma cor vermelha

## Schedule

Daqui pra frente referido por "componente".

- OK O componente deve mostrar os dias (segunda a sexta) e horários (das 8h às 22h)
em blocos de 1 hora.

- OK Timeboxes devem iniciar transparentes

- Clicar em um timebox com valor **notdefined** deve mudar
  - o seu valor para **available** 
  - mudar para a sua cor correspondente
  - chamar o serviço de atualização remota de timebox com o valor **available**

- Clicar em um timebox com valor **available** deve mudar
  - o seu valor para **busy** 
  - mudar para a sua cor correspondente
  - chamar o serviço de atualização remota de timebox com o valor **busy**

- Clicar em um timebox com valor **busy** deve mudar
  - o seu valor para **notdefined** 
  - mudar para a sua cor correspondente
  - chamar o serviço de atualização remota de timebox com o valor **notdefined**

- Clicar em um timebox várias vezes em **intervalos menores que 50ms**
  - deve mudar o valor do timebox correspondente
  - deve mudar a cor do timebox correspondente
  - chamar o serviço de atualização remota de timebox com o **último** valor definido no último clique

- Deve ser visível por padrão (vai fazer mais sentido quando existir o Heatmap)
(talvez nem seja um teste unitário pra fazer aqui)