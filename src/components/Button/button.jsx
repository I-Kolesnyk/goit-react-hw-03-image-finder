import PropTypes from 'prop-types';

const Button = ({ onClick }) => (
  <button type="button" onClick={onClick}>
    Load More
  </button>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
