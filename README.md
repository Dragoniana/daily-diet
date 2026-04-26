# Daily Diet

Aplicativo mobile desenvolvido em React Native para registrar e acompanhar refeições diárias, auxiliando no controle de uma dieta.

## Como executar o projeto

 - Clone o repositório: git clone https://github.com/Dragoniana/daily-diet.git
 - Acesse a pasta do projeto: cd daily-diet
 - Instale as dependências: npm install
 - Caso tenha problema com os ícones, instale manualmente: npx expo install @expo/vector-icons
 - Execute o projeto: npx expo start
 

## Objetivo

O objetivo do aplicativo é permitir que o usuário cadastre, visualize, edite e exclua refeições, além de acompanhar estatísticas sobre o progresso da dieta.

## Funcionalidades

- Cadastro de refeições com nome, descrição, data e horário
- Máscara automática para data no formato dd/mm/aaaa
- Máscara automática para hora no formato hh:mm
- Validação básica dos campos obrigatórios
- Edição de refeições cadastradas
- Exclusão de refeições com confirmação
- Listagem de refeições organizadas por data
- Filtro por refeições:
  - Todas
  - Dentro da dieta
  - Fora da dieta
- Visualização dos detalhes de cada refeição
- Estatísticas da dieta
- Cálculo do percentual de refeições dentro da dieta
- Cálculo da melhor sequência de refeições dentro da dieta
- Feedback informando se a refeição está dentro ou fora da dieta
- Animação na tela inicial
- Animação na tela de feedback com ícone de check ou X
- Salvamento local dos dados no dispositivo

## Tecnologias utilizadas

- React Native
- Expo
- TypeScript
- React Navigation
- Native Stack Navigator
- AsyncStorage
- Styled-components
- React Hooks
- SectionList
- Expo Vector Icons

 ## Telas do aplicativo

 - Tela inicial
 - Tela de estatísticas
 - Tela de detalhes da refeição
 - Tela de cadastro
 - Tela de edição de refeição
 - Tela de feedback

 ## Layout e tema

O aplicativo utiliza uma paleta de cores baseada em tons de lilás e roxo:

#F1E3F5
#E5DAF5
#CDCAF3
#989CED

Além disso, o aplicativo mantém o uso de verde e vermelho para indicar o status da dieta:

Verde: refeição dentro da dieta
Vermelho: refeição fora da dieta

 ## Armazenamento local

Os dados das refeições são armazenados localmente no dispositivo usando AsyncStorage.

Isso permite que as refeições continuem salvas mesmo após fechar e abrir o aplicativo novamente.

## Estrutura do projeto

```txt
src/
  @types/
  components/
    Button/
    Header/
    Input/
    MealCard/
    SelectButton/
  routes/
    app.routes.tsx
  screens/
    Feedback/
    Home/
    MealDetails/
    MealForm/
    Statistics/
  storage/
    mealsStorage.ts
  theme/
    theme.ts
  types/
    meal.ts



  