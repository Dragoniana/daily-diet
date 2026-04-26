import AsyncStorage from '@react-native-async-storage/async-storage';

import { Meal } from '../types/meal';

const MEALS_STORAGE_KEY = '@daily-diet:meals';

export async function getAllMeals(): Promise<Meal[]> {
  const storage = await AsyncStorage.getItem(MEALS_STORAGE_KEY);

  if (!storage) {
    return [];
  }

  return JSON.parse(storage);
}

export async function saveMeals(meals: Meal[]): Promise<void> {
  await AsyncStorage.setItem(MEALS_STORAGE_KEY, JSON.stringify(meals));
}

export async function createMeal(meal: Meal): Promise<void> {
  const meals = await getAllMeals();

  const updatedMeals = [...meals, meal];

  await saveMeals(updatedMeals);
}

export async function getMealById(id: string): Promise<Meal | null> {
  const meals = await getAllMeals();

  const meal = meals.find((item) => item.id === id);

  return meal ?? null;
}

export async function updateMeal(updatedMeal: Meal): Promise<void> {
  const meals = await getAllMeals();

  const updatedMeals = meals.map((meal) =>
    meal.id === updatedMeal.id ? updatedMeal : meal
  );

  await saveMeals(updatedMeals);
}

export async function deleteMeal(id: string): Promise<void> {
  const meals = await getAllMeals();

  const updatedMeals = meals.filter((meal) => meal.id !== id);

  await saveMeals(updatedMeals);
}