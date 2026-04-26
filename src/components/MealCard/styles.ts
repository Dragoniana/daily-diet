import styled from 'styled-components/native';

type StatusStyleProps = {
  isOnDiet: boolean;
};

export const Container = styled.TouchableOpacity`
  width: 100%;
  height: 52px;

  flex-direction: row;
  align-items: center;

  border: 1px solid ${({ theme }) => theme.colors.purple_200};
  border-radius: 12px;

  background-color: ${({ theme }) => theme.colors.gray_700};

  padding: 14px 16px;

  margin-bottom: 8px;
`;

export const Time = styled.Text`
  font-size: ${({ theme }) => theme.font_size.xs}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.purple_400};
`;

export const Divider = styled.View`
  width: 1px;
  height: 14px;

  background-color: ${({ theme }) => theme.colors.purple_300};

  margin: 0 12px;
`;

export const Name = styled.Text`
  flex: 1;

  font-size: ${({ theme }) => theme.font_size.md}px;
  color: ${({ theme }) => theme.colors.gray_200};
`;

export const Status = styled.View<StatusStyleProps>`
  width: 14px;
  height: 14px;

  border-radius: 7px;

  background-color: ${({ theme, isOnDiet }) =>
    isOnDiet ? theme.colors.green_dark : theme.colors.red_dark};
`;