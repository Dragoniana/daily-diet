import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: 104px;

  background-color: ${({ theme }) => theme.colors.gray_500};

  align-items: center;
  justify-content: center;

  padding-top: 32px;
`;

export const BackButton = styled.TouchableOpacity`
  position: absolute;
  left: 24px;
  top: 54px;

  width: 32px;
  height: 32px;

  align-items: center;
  justify-content: center;
`;

export const BackButtonText = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.gray_200};
`;

export const Title = styled.Text`
  font-size: ${({ theme }) => theme.font_size.lg}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.gray_100};
`;