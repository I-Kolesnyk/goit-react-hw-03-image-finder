import styled from '@emotion/styled';

export const StyledButton = styled.button`
  margin: 0 auto;
  padding: 8px 16px;
  border-radius: 5px;
  background-color: ${({ theme }) => {
    return theme.colors.mainColor;
  }};
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
  text-align: center;
  display: inline-block;
  color: #646464;
  border: 0;
  text-decoration: none;
  cursor: pointer;
  font-family: inherit;
  font-size: ${({ theme }) => {
    return theme.fontStyles.size;
  }};
  line-height: ${({ theme }) => {
    return theme.fontStyles.lineHeight;
  }};
  font-style: ${({ theme }) => {
    return theme.fontStyles.fontStyle;
  }};
  font-weight: ${({ theme }) => {
    return theme.fontStyles.fontWeight;
  }};
  min-width: 180px;
  box-shadow: ${({ theme }) => {
    return theme.boxShadow;
  }};
  &:hover,
  &:focus {
    background-color: ${({ theme }) => {
      return theme.colors.accentColor;
    }};
    color: ${({ theme }) => {
      return theme.colors.backgroundColor;
    }};
  }
`;
