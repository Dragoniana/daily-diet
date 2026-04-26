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
  ImagePlaceholder,
} from './styles';

type NavigationProps = NativeStackNavigationProp<AppRoutesParamList>;
type RouteProps = NativeStackScreenProps<AppRoutesParamList, 'Feedback'>['route'];

export function Feedback() {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<RouteProps>();

  const { isOnDiet } = route.params;

  function handleGoHome() {
    navigation.navigate('Home');
  }

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

        <ImagePlaceholder isOnDiet={isOnDiet}>
          {isOnDiet ? 'Dentro da dieta' : 'Fora da dieta'}
        </ImagePlaceholder>

        <Button title="Ir para a página inicial" onPress={handleGoHome} />
      </Content>
    </Container>
  );
}