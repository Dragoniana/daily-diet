import { useNavigation } from '@react-navigation/native';

import { BackButton, BackButtonText, Container, Title } from './styles';

type Props = {
  title: string;
  showBackButton?: boolean;
};

export function Header({ title, showBackButton = true }: Props) {
  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <Container>
      {showBackButton && (
        <BackButton onPress={handleGoBack}>
          <BackButtonText>{'<'}</BackButtonText>
        </BackButton>
      )}

      <Title>{title}</Title>
    </Container>
  );
}