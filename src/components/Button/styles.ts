import styled, { css } from 'styled-components/native';

type ButtonStyleProps = {
  variant: 'solid' | 'outline';
};

export const Container = styled.TouchableOpacity<ButtonStyleProps>`
  width: 100%;
  min-height: 50px;
  max-height: 50px;

  border-radius: 6px;

  align-items: center;
  justify-content: center;

  ${({ theme, variant }) =>
    variant === 'solid'
      ? css`
          background-color: ${theme.colors.gray_200};
        `
      : css`
          background-color: transparent;
          border: 1px solid ${theme.colors.gray_100};
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
          color: ${theme.colors.gray_100};
        `}
`;