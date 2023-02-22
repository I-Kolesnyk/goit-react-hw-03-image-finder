import styled from '@emotion/styled';
import { Form, Field } from 'formik';

export const SearchButton = styled.button`
  display: inline-block;
  width: 52px;
  height: 48px;
  border: 0;
  border-radius: ${({ theme }) => {
    return theme.borderRadius;
  }};
  background-color: ${({ theme }) => {
    return theme.colors.searchButtonBackgroundColor;
  }};
  background-size: 40%;
  background-repeat: no-repeat;
  background-position: center;
  opacity: 0.6;
  transition: opacity 250ms cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  outline: none;
  &:hover {
    opacity: 1;
  }
`;

export const StyledForm = styled(Form)`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 600px;
  background-color: ${({ theme }) => {
    return theme.colors.backgroundColor;
  }};
  border-radius: ${({ theme }) => {
    return theme.borderRadius;
  }};
  overflow: hidden;
`;

export const Input = styled(Field)`
  display: inline-block;
  width: 100%;
  font: inherit;
  font-size: 20px;
  border: none;
  outline: none;
  padding-left: 14px;
  padding-right: 4px;
  &::placeholder {
    font: inherit;
    font-size: ${({ theme }) => {
      return theme.fontStyles.size;
    }};
  }
`;
export const StyledSearchbar = styled.header`
  top: 0;
  left: 0;
  position: sticky;
  z-index: 1100;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 74px;
  padding-right: 24px;
  padding-left: 24px;
  padding-top: 12px;
  padding-bottom: 12px;
  color: ${({ theme }) => {
    return theme.colors.backgroundColor;
  }};
  background-color: ${({ theme }) => {
    return theme.colors.mainColor;
  }};
  box-shadow: ${({ theme }) => {
    return theme.boxShadow;
  }};
`;
