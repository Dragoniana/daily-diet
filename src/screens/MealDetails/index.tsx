import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { AppRoutesParamList } from '../../routes/app.routes';
import { deleteMeal, getMealById } from '../../storage/mealsStorage';
import { Meal } from '../../types/meal';

import {
  Container,
  Content,
  MealName,
  MealDescription,
  InfoLabel,
  InfoText,
  StatusContainer,
  StatusIndicator,
  StatusText,
  Footer,
} from './styles';

type NavigationProps = NativeStackNavigationProp<AppRoutesParamList>;
type RouteProps = NativeStackScreenProps<AppRoutesParamList, 'MealDetails'>['route'];

export function MealDetails() {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<RouteProps>();

  const { mealId } = route.params;

  const [meal, setMeal] = useState<Meal | null>(null);

  async function loadMeal() {
    const storedMeal = await getMealById(mealId);

    if (!storedMeal) {
      Alert.alert('Refeição', 'Refeição não encontrada.');
      navigation.navigate('Home');
      return;
    }

    setMeal(storedMeal);
  }

  function handleEditMeal() {
    navigation.navigate('MealForm', { mealId });
  }

  function handleDeleteMeal() {
    Alert.alert(
      'Excluir refeição',
      'Deseja realmente excluir essa refeição?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            await deleteMeal(mealId);
            navigation.navigate('Home');
          },
        },
      ]
    );
  }

  useFocusEffect(
    useCallback(() => {
      loadMeal();
    }, [mealId])
  );

  if (!meal) {
    return null;
  }

  return (
    <Container>
      <Header title="Refeição" />

      <Content>
        <MealName>{meal.name}</MealName>

        <MealDescription>{meal.description}</MealDescription>

        <InfoLabel>Data e hora</InfoLabel>
        <InfoText>
          {meal.date} às {meal.time}
        </InfoText>

        <StatusContainer>
          <StatusIndicator isOnDiet={meal.isOnDiet} />
          <StatusText>
            {meal.isOnDiet ? 'Dentro da dieta' : 'Fora da dieta'}
          </StatusText>
        </StatusContainer>
      </Content>

      <Footer>
        <Button title="Editar refeição" onPress={handleEditMeal} />

        <Button
          title="Excluir refeição"
          variant="outline"
          onPress={handleDeleteMeal}
        />
      </Footer>
    </Container>
  );
}