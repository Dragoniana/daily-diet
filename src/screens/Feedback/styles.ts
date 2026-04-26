import styled from 'styled-components/native';

type FeedbackStyleProps = {
  isOnDiet: boolean;
};

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.purple_100};

  align-items: center;
  justify-content: center;

  padding: 24px;
`;

export const Content = styled.View`
  width: 100%;
  align-items: center;
`;

export const Title = styled.Text<FeedbackStyleProps>`
  font-size: ${({ theme }) => theme.font_size.xl}px;
  font-weight: bold;

  color: ${({ theme, isOnDiet }) =>
    isOnDiet ? theme.colors.green_dark : theme.colors.red_dark};

  margin-bottom: 8px;
`;

export const Subtitle = styled.Text`
  max-width: 300px;

  text-align: center;

  font-size: ${({ theme }) => theme.font_size.md}px;
  color: ${({ theme }) => theme.colors.gray_100};

  margin-bottom: 40px;
`;

export const Highlight = styled.Text`
  font-weight: bold;
`;

export const AnimationCircle = styled.View<FeedbackStyleProps>`
  width: 180px;
  height: 180px;

  border-radius: 90px;

  align-items: center;
  justify-content: center;

  background-color: ${({ theme, isOnDiet }) =>
    isOnDiet ? theme.colors.green_light : theme.colors.red_light};

  border: 4px solid
    ${({ theme, isOnDiet }) =>
      isOnDiet ? theme.colors.green_dark : theme.colors.red_dark};

  margin-bottom: 40px;
`;

export const AnimationIcon = styled.Text`
  font-size: 96px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.gray_100};
`;