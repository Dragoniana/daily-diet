import { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
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
  CheckWrapper,
  CheckShort,
  CheckLong,
  XWrapper,
  XLineLeft,
  XLineRight,
} from './styles';

type NavigationProps = NativeStackNavigationProp<AppRoutesParamList>;
type RouteProps = NativeStackScreenProps<AppRoutesParamList, 'Feedback'>['route'];

export function Feedback() {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<RouteProps>();

  const { isOnDiet } = route.params;

  const scale = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const rotate = useRef(new Animated.Value(0)).current;

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
      Animated.timing(rotate, {
        toValue: 1,
        duration: 450,
        easing: Easing.out(Easing.back(1.3)),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const rotation = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['-15deg', '0deg'],
  });

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
            transform: [{ scale }, { rotate: rotation }],
          }}
        >
          <IconCircle isOnDiet={isOnDiet}>
            {isOnDiet ? (
              <CheckWrapper>
                <CheckShort />
                <CheckLong />
              </CheckWrapper>
            ) : (
              <XWrapper>
                <XLineLeft />
                <XLineRight />
              </XWrapper>
            )}
          </IconCircle>
        </Animated.View>

        <Button title="Ir para a página inicial" onPress={handleGoHome} />
      </Content>
    </Container>
  );
}