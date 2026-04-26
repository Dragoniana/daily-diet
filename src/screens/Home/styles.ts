import styled from 'styled-components/native';

type PercentCardStyleProps = {
  isOnDiet: boolean;
};

type FilterButtonStyleProps = {
  isActive: boolean;
  filterType: 'all' | 'onDiet' | 'offDiet';
};

type FilterButtonTextStyleProps = {
  isActive: boolean;
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

export const FilterRow = styled.View`
  width: 100%;

  flex-direction: row;
  gap: 8px;

  margin-bottom: 16px;
`;

export const FilterButton = styled.TouchableOpacity<FilterButtonStyleProps>`
  flex: 1;
  height: 38px;

  align-items: center;
  justify-content: center;

  border-radius: 999px;

  background-color: ${({ theme, isActive, filterType }) => {
    if (!isActive) {
      return theme.colors.gray_600;
    }

    if (filterType === 'onDiet') {
      return theme.colors.green_light;
    }

    if (filterType === 'offDiet') {
      return theme.colors.red_light;
    }

    return theme.colors.purple_200;
  }};

  border: 1px solid
    ${({ theme, isActive, filterType }) => {
      if (!isActive) {
        return theme.colors.gray_500;
      }

      if (filterType === 'onDiet') {
        return theme.colors.green_dark;
      }

      if (filterType === 'offDiet') {
        return theme.colors.red_dark;
      }

      return theme.colors.purple_400;
    }};
`;

export const FilterButtonText = styled.Text<FilterButtonTextStyleProps>`
  font-size: ${({ theme }) => theme.font_size.sm}px;
  font-weight: bold;

  color: ${({ theme, isActive }) =>
    isActive ? theme.colors.gray_100 : theme.colors.gray_300};
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