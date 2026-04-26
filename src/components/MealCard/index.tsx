import { TouchableOpacityProps } from 'react-native';

import { Meal } from '../../types/meal';
import { Container, Divider, Name, Status, Time } from './styles';

type Props = TouchableOpacityProps & {
  meal: Meal;
};

export function MealCard({ meal, ...rest }: Props) {
  return (
    <Container activeOpacity={0.7} {...rest}>
      <Time>{meal.time}</Time>

      <Divider />

      <Name numberOfLines={1}>{meal.name}</Name>

      <Status isOnDiet={meal.isOnDiet} />
    </Container>
  );
}