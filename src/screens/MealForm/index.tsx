import { useEffect, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { SelectButton } from '../../components/SelectButton';

import { AppRoutesParamList } from '../../routes/app.routes';
import { createMeal, getMealById, updateMeal } from '../../storage/mealsStorage';
import { Meal } from '../../types/meal';

import {
  Container,
  Content,
  DateTimeRow,
  DateTimeInputWrapper,
  DietTitle,
  SelectRow,
} from './styles';

type NavigationProps = NativeStackNavigationProp<AppRoutesParamList>;
type RouteProps = NativeStackScreenProps<AppRoutesParamList, 'MealForm'>['route'];

export function MealForm() {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<RouteProps>();

  const mealId = route.params?.mealId;
  const isEditing = !!mealId;

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [isOnDiet, setIsOnDiet] = useState<boolean | null>(null);

  function onlyNumbers(value: string) {
    return value.replace(/\D/g, '');
  }

  function formatDate(value: string) {
    const numbers = onlyNumbers(value).slice(0, 8);

    if (numbers.length <= 2) {
      return numbers;
    }

    if (numbers.length <= 4) {
      return `${numbers.slice(0, 2)}/${numbers.slice(2)}`;
    }

    return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}/${numbers.slice(4)}`;
  }

  function formatTime(value: string) {
    const numbers = onlyNumbers(value).slice(0, 4);

    if (numbers.length <= 2) {
      return numbers;
    }

    return `${numbers.slice(0, 2)}:${numbers.slice(2)}`;
  }

  function handleDateChange(value: string) {
    setDate(formatDate(value));
  }

  function handleTimeChange(value: string) {
    setTime(formatTime(value));
  }

  function isValidDate(value: string) {
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;

    if (!dateRegex.test(value)) {
      return false;
    }

    const [day, month, year] = value.split('/').map(Number);
    const parsedDate = new Date(year, month - 1, day);

    return (
      parsedDate.getFullYear() === year &&
      parsedDate.getMonth() === month - 1 &&
      parsedDate.getDate() === day
    );
  }

  function isValidTime(value: string) {
    const timeRegex = /^\d{2}:\d{2}$/;

    if (!timeRegex.test(value)) {
      return false;
    }

    const [hour, minute] = value.split(':').map(Number);

    return hour >= 0 && hour <= 23 && minute >= 0 && minute <= 59;
  }

  async function loadMeal() {
    if (!mealId) {
      return;
    }

    const meal = await getMealById(mealId);

    if (!meal) {
      Alert.alert('Refeição', 'Refeição não encontrada.');
      navigation.goBack();
      return;
    }

    setName(meal.name);
    setDescription(meal.description);
    setDate(meal.date);
    setTime(meal.time);
    setIsOnDiet(meal.isOnDiet);
  }

  function validateFields() {
    if (!name.trim()) {
      Alert.alert('Campo obrigatório', 'Informe o nome da refeição.');
      return false;
    }

    if (!description.trim()) {
      Alert.alert('Campo obrigatório', 'Informe a descrição da refeição.');
      return false;
    }

    if (!date.trim()) {
      Alert.alert('Campo obrigatório', 'Informe a data da refeição.');
      return false;
    }

    if (!isValidDate(date)) {
      Alert.alert('Data inválida', 'Informe uma data válida no formato dd/mm/aaaa.');
      return false;
    }

    if (!time.trim()) {
      Alert.alert('Campo obrigatório', 'Informe o horário da refeição.');
      return false;
    }

    if (!isValidTime(time)) {
      Alert.alert('Hora inválida', 'Informe um horário válido no formato hh:mm.');
      return false;
    }

    if (isOnDiet === null) {
      Alert.alert('Campo obrigatório', 'Informe se está dentro da dieta.');
      return false;
    }

    return true;
  }

  async function handleSaveMeal() {
    if (!validateFields()) {
      return;
    }

    const meal: Meal = {
      id: mealId ?? String(new Date().getTime()),
      name: name.trim(),
      description: description.trim(),
      date: date.trim(),
      time: time.trim(),
      isOnDiet: Boolean(isOnDiet),
    };

    if (isEditing) {
      await updateMeal(meal);
      navigation.navigate('MealDetails', { mealId: meal.id });
      return;
    }

    await createMeal(meal);
    navigation.navigate('Feedback', { isOnDiet: meal.isOnDiet });
  }

  useEffect(() => {
    loadMeal();
  }, [mealId]);

  return (
    <Container>
      <Header title={isEditing ? 'Editar refeição' : 'Nova refeição'} />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Content>
          <Input label="Nome" value={name} onChangeText={setName} />

          <Input
            label="Descrição"
            value={description}
            onChangeText={setDescription}
            multiline
          />

          <DateTimeRow>
            <DateTimeInputWrapper>
              <Input
                label="Data"
                value={date}
                onChangeText={handleDateChange}
                placeholder="dd/mm/aaaa"
                keyboardType="numeric"
                maxLength={10}
              />
            </DateTimeInputWrapper>

            <DateTimeInputWrapper>
              <Input
                label="Hora"
                value={time}
                onChangeText={handleTimeChange}
                placeholder="hh:mm"
                keyboardType="numeric"
                maxLength={5}
              />
            </DateTimeInputWrapper>
          </DateTimeRow>

          <DietTitle>Está dentro da dieta?</DietTitle>

          <SelectRow>
            <SelectButton
              title="Sim"
              type="yes"
              isActive={isOnDiet === true}
              onPress={() => setIsOnDiet(true)}
            />

            <SelectButton
              title="Não"
              type="no"
              isActive={isOnDiet === false}
              onPress={() => setIsOnDiet(false)}
            />
          </SelectRow>

          <Button
            title={isEditing ? 'Salvar alterações' : 'Cadastrar refeição'}
            onPress={handleSaveMeal}
          />
        </Content>
      </KeyboardAvoidingView>
    </Container>
  );
}