import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GalleryItem, GalleryImage } from './ImageGalleryItem.styled';
import Modal from 'components/Modal';

class ImageGalleryItem extends Component {
  state = {
    showModal: false,
    largeImageURL: this.props.largeImageURL,
  };

  toggleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
    }));
  };

  render() {
    const { largeImageURL, showModal } = this.state;
    const { webformatURL, tags } = this.props;
    const { toggleModal } = this;

    return (
      <>
        <GalleryItem onClick={toggleModal}>
          <GalleryImage src={webformatURL} alt={tags} />
        </GalleryItem>
        {showModal && (
          <Modal onClose={toggleModal} large={largeImageURL} alt={tags} />
        )}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
};

export default ImageGalleryItem;
