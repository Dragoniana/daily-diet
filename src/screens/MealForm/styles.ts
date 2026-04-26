import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.gray_700};
`;

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingBottom: 32,
  },
})`
  flex: 1;
  padding: 32px 24px;
`;

export const DateTimeRow = styled.View`
  width: 100%;
  flex-direction: row;
  gap: 16px;
`;

export const DateTimeInputWrapper = styled.View`
  flex: 1;
`;

export const DietTitle = styled.Text`
  font-size: ${({ theme }) => theme.font_size.sm}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.gray_200};

  margin-bottom: 8px;
`;

export const SelectRow = styled.View`
  width: 100%;
  flex-direction: row;
  gap: 8px;

  margin-bottom: 32px;
`;