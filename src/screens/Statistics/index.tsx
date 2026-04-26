import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import { Header } from '../../components/Header';
import { getAllMeals } from '../../storage/mealsStorage';
import { Meal } from '../../types/meal';

import {
  Container,
  Content,
  PercentTitle,
  PercentSubtitle,
  Card,
  CardTitle,
  CardSubtitle,
  Row,
  HalfCard,
} from './styles';

export function Statistics() {
  const [meals, setMeals] = useState<Meal[]>([]);

  async function loadMeals() {
    const storedMeals = await getAllMeals();
    setMeals(storedMeals);
  }

  function parseDateTime(meal: Meal) {
    const [day, month, year] = meal.date.split('/').map(Number);
    const [hour, minute] = meal.time.split(':').map(Number);

    return new Date(year, month - 1, day, hour, minute).getTime();
  }

  function getMealsOnDiet() {
    return meals.filter((meal) => meal.isOnDiet).length;
  }

  function getMealsOffDiet() {
    return meals.filter((meal) => !meal.isOnDiet).length;
  }

  function getDietPercentage() {
    if (meals.length === 0) {
      return 0;
    }

    return (getMealsOnDiet() / meals.length) * 100;
  }

  function getBestDietSequence() {
    const sortedMeals = [...meals].sort(
      (a, b) => parseDateTime(a) - parseDateTime(b)
    );

    let currentSequence = 0;
    let bestSequence = 0;

    sortedMeals.forEach((meal) => {
      if (meal.isOnDiet) {
        currentSequence += 1;

        if (currentSequence > bestSequence) {
          bestSequence = currentSequence;
        }

        return;
      }

      currentSequence = 0;
    });

    return bestSequence;
  }

  useFocusEffect(
    useCallback(() => {
      loadMeals();
    }, [])
  );

  const percentage = getDietPercentage();

  return (
    <Container isOnDiet={percentage >= 50}>
      <Header title="Estatísticas" />

      <Content>
        <PercentTitle>{percentage.toFixed(2).replace('.', ',')}%</PercentTitle>
        <PercentSubtitle>das refeições dentro da dieta</PercentSubtitle>

        <Card>
          <CardTitle>{getBestDietSequence()}</CardTitle>
          <CardSubtitle>melhor sequência de pratos dentro da dieta</CardSubtitle>
        </Card>

        <Card>
          <CardTitle>{meals.length}</CardTitle>
          <CardSubtitle>refeições registradas</CardSubtitle>
        </Card>

        <Row>
          <HalfCard type="positive">
            <CardTitle>{getMealsOnDiet()}</CardTitle>
            <CardSubtitle>refeições dentro da dieta</CardSubtitle>
          </HalfCard>

          <HalfCard type="negative">
            <CardTitle>{getMealsOffDiet()}</CardTitle>
            <CardSubtitle>refeições fora da dieta</CardSubtitle>
          </HalfCard>
        </Row>
      </Content>
    </Container>
  );
}