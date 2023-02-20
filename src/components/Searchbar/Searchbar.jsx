import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';

function Searchbar({ onSubmit }) {
  const initialValue = { value: '' };

  function handleSubmit(values, { resetForm }) {
    onSubmit(values);
    resetForm();
  }

  return (
    <Formik initialValues={initialValue} onSubmit={handleSubmit}>
      <header>
        <Form>
          <button type="submit">
            <span>Search</span>
          </button>

          <Field
            name="value"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </Form>
      </header>
    </Formik>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
