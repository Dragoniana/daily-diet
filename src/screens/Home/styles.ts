import styled from 'styled-components/native';

type PercentCardStyleProps = {
  isOnDiet: boolean;
};

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.purple_100};
  padding: 56px 24px 0;
`;

export const Header = styled.View`
  width: 100%;
  margin-bottom: 28px;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Logo = styled.Text`
  font-size: ${({ theme }) => theme.font_size.xl}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.purple_400};
`;

export const PercentCard = styled.TouchableOpacity<PercentCardStyleProps>`
  width: 100%;
  height: 112px;

  border-radius: 18px;

  align-items: center;
  justify-content: center;

  margin-bottom: 32px;

  border: 1px solid
    ${({ theme, isOnDiet }) =>
      isOnDiet ? theme.colors.green_mid : theme.colors.red_mid};

  background-color: ${({ theme, isOnDiet }) =>
    isOnDiet ? theme.colors.green_light : theme.colors.red_light};

  elevation: 3;
`;

export const PercentTitle = styled.Text`
  font-size: ${({ theme }) => theme.font_size.xxl}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.gray_100};
`;

export const PercentSubtitle = styled.Text`
  font-size: ${({ theme }) => theme.font_size.sm}px;
  color: ${({ theme }) => theme.colors.gray_200};
`;

export const Content = styled.View`
  flex: 1;

  background-color: ${({ theme }) => theme.colors.white};

  border-top-left-radius: 24px;
  border-top-right-radius: 24px;

  padding: 24px 16px 0;
  margin: 0 -24px;
`;

export const NewMealTitle = styled.Text`
  font-size: ${({ theme }) => theme.font_size.md}px;
  color: ${({ theme }) => theme.colors.gray_100};

  margin-bottom: 8px;
`;

export const SectionTitle = styled.Text`
  font-size: ${({ theme }) => theme.font_size.lg}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.purple_400};

  margin-top: 32px;
  margin-bottom: 8px;
`;

export const EmptyText = styled.Text`
  flex: 1;

  text-align: center;
  margin-top: 48px;

  font-size: ${({ theme }) => theme.font_size.md}px;
  color: ${({ theme }) => theme.colors.gray_300};
`;