import { TouchableOpacityProps } from 'react-native';

import { Container, Title } from './styles';

type Props = TouchableOpacityProps & {
  title: string;
  variant?: 'solid' | 'outline';
};

export function Button({ title, variant = 'solid', ...rest }: Props) {
  return (
    <Container variant={variant} activeOpacity={0.7} {...rest}>
      <Title variant={variant}>{title}</Title>
    </Container>
  );
}