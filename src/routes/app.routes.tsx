import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from '../screens/Home';
import { Statistics } from '../screens/Statistics';
import { MealDetails } from '../screens/MealDetails';
import { MealForm } from '../screens/MealForm';
import { Feedback } from '../screens/Feedback';

export type AppRoutesParamList = {
  Home: undefined;
  Statistics: undefined;
  MealDetails: {
    mealId: string;
  };
  MealForm: {
    mealId?: string;
  } | undefined;
  Feedback: {
    isOnDiet: boolean;
  };
};

const Stack = createNativeStackNavigator<AppRoutesParamList>();

export function AppRoutes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: '#FAFAFA',
          },
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Statistics" component={Statistics} />
        <Stack.Screen name="MealDetails" component={MealDetails} />
        <Stack.Screen name="MealForm" component={MealForm} />
        <Stack.Screen name="Feedback" component={Feedback} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}