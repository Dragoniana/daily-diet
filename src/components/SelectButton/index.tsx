import { TouchableOpacityProps } from 'react-native';

import { Container, Indicator, Title } from './styles';

type Props = TouchableOpacityProps & {
  title: string;
  type: 'yes' | 'no';
  isActive: boolean;
};

export function SelectButton({ title, type, isActive, ...rest }: Props) {
  return (
    <Container type={type} isActive={isActive} activeOpacity={0.7} {...rest}>
      <Indicator type={type} />

      <Title>{title}</Title>
    </Container>
  );
}