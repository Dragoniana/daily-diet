import styled from 'styled-components/native';

type ContainerStyleProps = {
  isOnDiet: boolean;
};

type HalfCardStyleProps = {
  type: 'positive' | 'negative';
};

export const Container = styled.View<ContainerStyleProps>`
  flex: 1;

  background-color: ${({ theme, isOnDiet }) =>
    isOnDiet ? theme.colors.green_light : theme.colors.red_light};
`;

export const Content = styled.View`
  flex: 1;

  background-color: ${({ theme }) => theme.colors.gray_700};

  border-top-left-radius: 20px;
  border-top-right-radius: 20px;

  padding: 32px 24px;
`;

export const PercentTitle = styled.Text`
  font-size: ${({ theme }) => theme.font_size.xxl}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.gray_100};

  text-align: center;
`;

export const PercentSubtitle = styled.Text`
  font-size: ${({ theme }) => theme.font_size.sm}px;
  color: ${({ theme }) => theme.colors.gray_200};

  text-align: center;

  margin-bottom: 24px;
`;

export const Card = styled.View`
  width: 100%;
  min-height: 89px;

  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme.colors.gray_600};

  border-radius: 8px;

  padding: 16px;

  margin-bottom: 12px;
`;

export const CardTitle = styled.Text`
  font-size: ${({ theme }) => theme.font_size.xl}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.gray_100};

  text-align: center;
`;

export const CardSubtitle = styled.Text`
  font-size: ${({ theme }) => theme.font_size.sm}px;
  color: ${({ theme }) => theme.colors.gray_200};

  text-align: center;
`;

export const Row = styled.View`
  width: 100%;

  flex-direction: row;
  gap: 12px;
`;

export const HalfCard = styled.View<HalfCardStyleProps>`
  flex: 1;
  min-height: 107px;

  align-items: center;
  justify-content: center;

  border-radius: 8px;

  padding: 16px;

  background-color: ${({ theme, type }) =>
    type === 'positive' ? theme.colors.green_light : theme.colors.red_light};
`;