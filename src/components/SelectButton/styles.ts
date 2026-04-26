import styled, { css } from 'styled-components/native';

type SelectButtonStyleProps = {
  type: 'yes' | 'no';
  isActive?: boolean;
};

export const Container = styled.TouchableOpacity<SelectButtonStyleProps>`
  flex: 1;
  height: 50px;

  flex-direction: row;
  align-items: center;
  justify-content: center;

  border-radius: 6px;

  background-color: ${({ theme }) => theme.colors.gray_600};

  ${({ theme, type, isActive }) =>
    isActive &&
    css`
      background-color: ${type === 'yes'
        ? theme.colors.green_light
        : theme.colors.red_light};

      border: 1px solid
        ${type === 'yes' ? theme.colors.green_dark : theme.colors.red_dark};
    `}
`;

export const Indicator = styled.View<SelectButtonStyleProps>`
  width: 8px;
  height: 8px;

  border-radius: 4px;

  margin-right: 8px;

  background-color: ${({ theme, type }) =>
    type === 'yes' ? theme.colors.green_dark : theme.colors.red_dark};
`;

export const Title = styled.Text`
  font-size: ${({ theme }) => theme.font_size.sm}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.gray_100};
`;