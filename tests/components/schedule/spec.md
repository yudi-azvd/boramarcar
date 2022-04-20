## Timebox
Subcomponente de Schedule.

- OK Quando o seu valor for **undefined**, sua cor deve ser tranparente
- OK Quando o seu valor for **available**, deve mostrar uma cor verde
- OK Quando o seu valor for **busy**, deve mostrar uma cor vermelha

## Schedule

Daqui pra frente referido por "componente".

- O componente deve mostrar os dias (segunda a sexta) e horários (das 8h às 22h)
em blocos de 1 hora.

- Clicar em um timebox com valor **undefined** deve mudar
  - o seu valor para **available** 
  - mudar para a sua cor correspondente
  - chamar o serviço de atualização remota de timebox com o valor **available**

- Clicar em um timebox com valor **available** deve mudar
  - o seu valor para **busy** 
  - mudar para a sua cor correspondente
  - chamar o serviço de atualização remota de timebox com o valor **busy**

- Clicar em um timebox com valor **busy** deve mudar
  - o seu valor para **undefined** 
  - mudar para a sua cor correspondente
  - chamar o serviço de atualização remota de timebox com o valor **undefined**

- Clicar em um timebox várias vezes em **intervalos menores que 50ms**
  - deve mudar o valor do timebox correspondente
  - deve mudar a cor do timebox correspondente
  - chamar o serviço de atualização remota de timebox com o **último** valor definido no último clique