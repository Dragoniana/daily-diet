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

export const IconCircle = styled.View<FeedbackStyleProps>`
  width: 180px;
  height: 180px;

  border-radius: 90px;

  align-items: center;
  justify-content: center;

  background-color: ${({ theme, isOnDiet }) =>
    isOnDiet ? theme.colors.green_light : theme.colors.red_light};

  border: 5px solid
    ${({ theme, isOnDiet }) =>
      isOnDiet ? theme.colors.green_dark : theme.colors.red_dark};

  margin-bottom: 40px;
`;

export const CheckWrapper = styled.View`
  width: 110px;
  height: 90px;

  position: relative;
`;

export const CheckShort = styled.View`
  position: absolute;

  width: 42px;
  height: 16px;

  left: 15px;
  top: 48px;

  border-radius: 8px;

  background-color: ${({ theme }) => theme.colors.green_dark};

  transform: rotate(45deg);
`;

export const CheckLong = styled.View`
  position: absolute;

  width: 78px;
  height: 16px;

  left: 42px;
  top: 39px;

  border-radius: 8px;

  background-color: ${({ theme }) => theme.colors.green_dark};

  transform: rotate(-45deg);
`;

export const XWrapper = styled.View`
  width: 100px;
  height: 100px;

  align-items: center;
  justify-content: center;

  position: relative;
`;

export const XLineLeft = styled.View`
  position: absolute;

  width: 90px;
  height: 16px;

  border-radius: 8px;

  background-color: ${({ theme }) => theme.colors.red_dark};

  transform: rotate(45deg);
`;

export const XLineRight = styled.View`
  position: absolute;

  width: 90px;
  height: 16px;

  border-radius: 8px;

  background-color: ${({ theme }) => theme.colors.red_dark};

  transform: rotate(-45deg);
`;