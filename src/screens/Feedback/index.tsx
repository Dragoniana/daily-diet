import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import { Button } from '../../components/Button';
import { AppRoutesParamList } from '../../routes/app.routes';

import {
  Container,
  Content,
  Title,
  Subtitle,
  Highlight,
  IconCircle,
} from './styles';

type NavigationProps = NativeStackNavigationProp<AppRoutesParamList>;
type RouteProps = NativeStackScreenProps<AppRoutesParamList, 'Feedback'>['route'];

export function Feedback() {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<RouteProps>();
  const theme = useTheme();

  const { isOnDiet } = route.params;

  const scale = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const iconColor = isOnDiet ? theme.colors.green_dark : theme.colors.red_dark;
  const iconName = isOnDiet ? 'check' : 'x';

  function handleGoHome() {
    navigation.navigate('Home');
  }

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        friction: 4,
        tension: 90,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 450,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Container>
      <Content>
        <Title isOnDiet={isOnDiet}>
          {isOnDiet ? 'Continue assim!' : 'Que pena!'}
        </Title>

        <Subtitle>
          {isOnDiet ? (
            <>
              Você continua <Highlight>dentro da dieta</Highlight>. Muito bem!
            </>
          ) : (
            <>
              Você <Highlight>saiu da dieta</Highlight> dessa vez, mas continue
              se esforçando!
            </>
          )}
        </Subtitle>

        <Animated.View
          style={{
            opacity,
            transform: [{ scale }],
          }}
        >
          <IconCircle isOnDiet={isOnDiet}>
            <Feather name={iconName} size={96} color={iconColor} />
          </IconCircle>
        </Animated.View>

        <Button title="Ir para a página inicial" onPress={handleGoHome} />
      </Content>
    </Container>
  );
}