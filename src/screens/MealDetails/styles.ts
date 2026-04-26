import styled from 'styled-components/native';

type StatusStyleProps = {
  isOnDiet: boolean;
};

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.gray_700};
`;

export const Content = styled.View`
  flex: 1;
  padding: 32px 24px;
`;

export const MealName = styled.Text`
  font-size: ${({ theme }) => theme.font_size.xl}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.gray_100};

  margin-bottom: 8px;
`;

export const MealDescription = styled.Text`
  font-size: ${({ theme }) => theme.font_size.md}px;
  color: ${({ theme }) => theme.colors.gray_200};

  margin-bottom: 24px;
`;

export const InfoLabel = styled.Text`
  font-size: ${({ theme }) => theme.font_size.sm}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.gray_100};

  margin-bottom: 8px;
`;

export const InfoText = styled.Text`
  font-size: ${({ theme }) => theme.font_size.md}px;
  color: ${({ theme }) => theme.colors.gray_200};

  margin-bottom: 24px;
`;

export const StatusContainer = styled.View`
  align-self: flex-start;

  flex-direction: row;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.gray_600};

  border-radius: 999px;

  padding: 8px 16px;
`;

export const StatusIndicator = styled.View<StatusStyleProps>`
  width: 8px;
  height: 8px;

  border-radius: 4px;

  background-color: ${({ theme, isOnDiet }) =>
    isOnDiet ? theme.colors.green_dark : theme.colors.red_dark};

  margin-right: 8px;
`;

export const StatusText = styled.Text`
  font-size: ${({ theme }) => theme.font_size.sm}px;
  color: ${({ theme }) => theme.colors.gray_100};
`;

export const Footer = styled.View`
  gap: 8px;

  padding: 24px;
`;