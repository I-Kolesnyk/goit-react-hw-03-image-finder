import PropTypes from 'prop-types';

const Button = ({ children, onClick }) => (
  <button type="button" onClick={onClick}>
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
};

export default Button;
