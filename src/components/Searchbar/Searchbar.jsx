import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { BiSearchAlt } from 'react-icons/bi';
import {
  SearchButton,
  StyledForm,
  Input,
  StyledSearchbar,
} from './Searchbar.styled';

function Searchbar({ onSubmit }) {
  const initialValue = { value: '' };

  function handleSubmit(values, { resetForm }) {
    onSubmit(values.value.trim());
    resetForm();
  }

  return (
    <Formik initialValues={initialValue} onSubmit={handleSubmit}>
      {({ isSubmitting }) => {
        return (
          <StyledSearchbar>
            <StyledForm>
              <SearchButton type="submit" disabled={isSubmitting}>
                <BiSearchAlt size={'70%'} color={'#0e7545'} />
              </SearchButton>

              <Input
                name="value"
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
              />
            </StyledForm>
          </StyledSearchbar>
        );
      }}
    </Formik>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
