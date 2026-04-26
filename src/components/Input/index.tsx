import { TextInputProps } from 'react-native';

import { Container, Label, TextInput } from './styles';

type Props = TextInputProps & {
  label: string;
};

export function Input({ label, multiline = false, ...rest }: Props) {
  return (
    <Container>
      <Label>{label}</Label>

      <TextInput
        multiline={multiline}
        textAlignVertical={multiline ? 'top' : 'center'}
        isMultiline={multiline}
        {...rest}
      />
    </Container>
  );
}