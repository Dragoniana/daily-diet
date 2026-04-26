import styled from 'styled-components/native';

type TextInputStyleProps = {
  isMultiline: boolean;
};

export const Container = styled.View`
  width: 100%;
  margin-bottom: 16px;
`;

export const Label = styled.Text`
  font-size: ${({ theme }) => theme.font_size.sm}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.gray_200};

  margin-bottom: 4px;
`;

export const TextInput = styled.TextInput<TextInputStyleProps>`
  width: 100%;

  min-height: ${({ isMultiline }) => (isMultiline ? 120 : 48)}px;
  max-height: ${({ isMultiline }) => (isMultiline ? 120 : 48)}px;

  border: 1px solid ${({ theme }) => theme.colors.gray_500};
  border-radius: 6px;

  padding: 12px;

  font-size: ${({ theme }) => theme.font_size.md}px;
  color: ${({ theme }) => theme.colors.gray_100};
`;