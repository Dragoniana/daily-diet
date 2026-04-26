import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
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
  AnimationCircle,
  AnimationIcon,
} from './styles';

type NavigationProps = NativeStackNavigationProp<AppRoutesParamList>;
type RouteProps = NativeStackScreenProps<AppRoutesParamList, 'Feedback'>['route'];

export function Feedback() {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<RouteProps>();

  const { isOnDiet } = route.params;

  const scaleAnimation = useRef(new Animated.Value(0)).current;
  const opacityAnimation = useRef(new Animated.Value(0)).current;

  function handleGoHome() {
    navigation.navigate('Home');
  }

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnimation, {
        toValue: 1,
        friction: 4,
        tension: 80,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnimation, {
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
            opacity: opacityAnimation,
            transform: [{ scale: scaleAnimation }],
          }}
        >
          <AnimationCircle isOnDiet={isOnDiet}>
            <AnimationIcon>{isOnDiet ? '✓' : '×'}</AnimationIcon>
          </AnimationCircle>
        </Animated.View>

        <Button title="Ir para a página inicial" onPress={handleGoHome} />
      </Content>
    </Container>
  );
}