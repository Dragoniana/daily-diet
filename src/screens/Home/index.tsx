import { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, SectionList } from 'react-native';
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
  FilterRow,
  FilterButton,
  FilterButtonText,
} from './styles';

type NavigationProps = NativeStackNavigationProp<AppRoutesParamList>;

type MealSection = {
  title: string;
  data: Meal[];
};

type FilterType = 'all' | 'onDiet' | 'offDiet';

export function Home() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');

  const navigation = useNavigation<NavigationProps>();

  const fadeAnimation = useRef(new Animated.Value(0)).current;
  const slideAnimation = useRef(new Animated.Value(24)).current;

  function parseDate(date: string) {
    const [day, month, year] = date.split('/').map(Number);
    return new Date(year, month - 1, day).getTime();
  }

  function parseTime(time: string) {
    const [hour, minute] = time.split(':').map(Number);
    return hour * 60 + minute;
  }

  function getFilteredMeals() {
    if (filter === 'onDiet') {
      return meals.filter((meal) => meal.isOnDiet);
    }

    if (filter === 'offDiet') {
      return meals.filter((meal) => !meal.isOnDiet);
    }

    return meals;
  }

  function getSections(): MealSection[] {
    const filteredMeals = getFilteredMeals();

    const groupedMeals = filteredMeals.reduce<Record<string, Meal[]>>(
      (acc, meal) => {
        if (!acc[meal.date]) {
          acc[meal.date] = [];
        }

        acc[meal.date].push(meal);

        return acc;
      },
      {}
    );

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

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnimation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnimation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const percentage = getDietPercentage();
  const sections = getSections();

  return (
    <Container>
      <Animated.View
        style={{
          opacity: fadeAnimation,
          transform: [{ translateY: slideAnimation }],
        }}
      >
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
      </Animated.View>

      <Content>
        <NewMealTitle>Refeições</NewMealTitle>

        <FilterRow>
          <FilterButton
            isActive={filter === 'all'}
            filterType="all"
            onPress={() => setFilter('all')}
          >
            <FilterButtonText isActive={filter === 'all'}>
              Todas
            </FilterButtonText>
          </FilterButton>

          <FilterButton
            isActive={filter === 'onDiet'}
            filterType="onDiet"
            onPress={() => setFilter('onDiet')}
          >
            <FilterButtonText isActive={filter === 'onDiet'}>
              Dentro
            </FilterButtonText>
          </FilterButton>

          <FilterButton
            isActive={filter === 'offDiet'}
            filterType="offDiet"
            onPress={() => setFilter('offDiet')}
          >
            <FilterButtonText isActive={filter === 'offDiet'}>
              Fora
            </FilterButtonText>
          </FilterButton>
        </FilterRow>

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
            <EmptyText>Nenhuma refeição encontrada.</EmptyText>
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