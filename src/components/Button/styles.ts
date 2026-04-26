import styled, { css } from 'styled-components/native';

type ButtonStyleProps = {
  variant: 'solid' | 'outline';
};

export const Container = styled.TouchableOpacity<ButtonStyleProps>`
  width: 100%;
  min-height: 50px;
  max-height: 50px;

  border-radius: 10px;

  align-items: center;
  justify-content: center;

  elevation: 2;

  ${({ theme, variant }) =>
    variant === 'solid'
      ? css`
          background-color: ${theme.colors.purple_400};
        `
      : css`
          background-color: ${theme.colors.white};
          border: 1px solid ${theme.colors.purple_400};
        `}
`;

export const Title = styled.Text<ButtonStyleProps>`
  font-size: ${({ theme }) => theme.font_size.sm}px;
  font-weight: bold;

  ${({ theme, variant }) =>
    variant === 'solid'
      ? css`
          color: ${theme.colors.white};
        `
      : css`
          color: ${theme.colors.purple_400};
        `}
`;