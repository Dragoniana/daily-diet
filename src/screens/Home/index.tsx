import { useCallback, useState } from 'react';
import { SectionList } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Button } from '../../components/Button';
import { MealCard } from '../../components/MealCard';
import { getAllMeals } from '../../storage/mealsStorage';
import { Meal } from '../../types/meal';
import { AppRoutesParamList } from '../../routes/app.routes';

import {
  Container,
  Header,
  Logo,
  PercentCard,
  PercentTitle,
  PercentSubtitle,
  Content,
  NewMealTitle,
  SectionTitle,
  EmptyText,
} from './styles';

type NavigationProps = NativeStackNavigationProp<AppRoutesParamList>;

type MealSection = {
  title: string;
  data: Meal[];
};

export function Home() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const navigation = useNavigation<NavigationProps>();

  function parseDate(date: string) {
    const [day, month, year] = date.split('/').map(Number);
    return new Date(year, month - 1, day).getTime();
  }

  function parseTime(time: string) {
    const [hour, minute] = time.split(':').map(Number);
    return hour * 60 + minute;
  }

  function getSections(): MealSection[] {
    const groupedMeals = meals.reduce<Record<string, Meal[]>>((acc, meal) => {
      if (!acc[meal.date]) {
        acc[meal.date] = [];
      }

      acc[meal.date].push(meal);

      return acc;
    }, {});

    return Object.keys(groupedMeals)
      .sort((a, b) => parseDate(b) - parseDate(a))
      .map((date) => ({
        title: date,
        data: groupedMeals[date].sort(
          (a, b) => parseTime(b.time) - parseTime(a.time)
        ),
      }));
  }

  function getDietPercentage() {
    if (meals.length === 0) {
      return 0;
    }

    const mealsOnDiet = meals.filter((meal) => meal.isOnDiet).length;

    return (mealsOnDiet / meals.length) * 100;
  }

  async function loadMeals() {
    const storedMeals = await getAllMeals();
    setMeals(storedMeals);
  }

  function handleOpenStatistics() {
    navigation.navigate('Statistics');
  }

  function handleCreateMeal() {
    navigation.navigate('MealForm');
  }

  function handleOpenMealDetails(mealId: string) {
    navigation.navigate('MealDetails', { mealId });
  }

  useFocusEffect(
    useCallback(() => {
      loadMeals();
    }, [])
  );

  const percentage = getDietPercentage();
  const sections = getSections();

  return (
    <Container>
      <Header>
        <Logo>Daily Diet</Logo>
      </Header>

      <PercentCard
        activeOpacity={0.7}
        isOnDiet={percentage >= 50}
        onPress={handleOpenStatistics}
      >
        <PercentTitle>{percentage.toFixed(2).replace('.', ',')}%</PercentTitle>
        <PercentSubtitle>das refeições dentro da dieta</PercentSubtitle>
      </PercentCard>

      <Content>
        <NewMealTitle>Refeições</NewMealTitle>

        <Button title="+ Nova refeição" onPress={handleCreateMeal} />

        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <MealCard
              meal={item}
              onPress={() => handleOpenMealDetails(item.id)}
            />
          )}
          renderSectionHeader={({ section }) => (
            <SectionTitle>{section.title}</SectionTitle>
          )}
          ListEmptyComponent={
            <EmptyText>Nenhuma refeição cadastrada ainda.</EmptyText>
          }
          contentContainerStyle={{
            paddingBottom: 32,
            flexGrow: 1,
          }}
          showsVerticalScrollIndicator={false}
        />
      </Content>
    </Container>
  );
}