import { Component } from 'react';
import { createPortal } from 'react-dom';
// import PropTypes from 'prop-types';
import { StyledModal, Backdrop } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');
class Modal extends Component {
  // static propTypes = {
  //   onClick: PropTypes.func,
  //   onClose: PropTypes.func,
  //   children: PropTypes.node.isRequired,
  // };

  // componentDidMount() {
  //   window.addEventListener('keydown', this.handleKeyDown);
  // }

  // componentWillUnmount() {
  //   window.removeEventListener('keydown', this.handleKeyDown);
  // }

  // handleKeyDown = e => {
  //   if (e.code === 'Escape') {
  //     this.props.onClose();
  //   }
  // };

  // handleBackdropClick = e => {
  //   if (e.currentTarget === e.target) {
  //     this.props.onClose();
  //   }
  // };
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  // closeModal = event => {
  //   console.log('event.target', event.target);
  //   console.log('event.currentTarget', event.currentTarget);
  //   console.log(event);

  //   if (event.target !== event.currentTarget || event.code === 'Escape') {
  //     this.props.onClose();
  //   }
  // };
  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = event => {
    console.log('event.target', event.target);
    console.log('event.currentTarget', event.currentTarget);

    if (event.target !== event.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <Backdrop onClick={this.handleBackdropClick}>
        <StyledModal>
          <img src={this.props.large} alt={this.props.tag} />
        </StyledModal>
      </Backdrop>,
      modalRoot
    );
  }
}
export default Modal;
