import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { StyledModal, Backdrop } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');
class Modal extends Component {
  static propTypes = {
    onClick: PropTypes.func,
    onClose: PropTypes.func,
    children: PropTypes.node.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <Backdrop onClick={this.handleBackdropClick}>
        <StyledModal>{this.props.children}</StyledModal>
      </Backdrop>,
      modalRoot
    );
  }
}
export default Modal;
