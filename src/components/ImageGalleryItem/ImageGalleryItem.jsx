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
    return (
      <>
        <GalleryItem onClick={this.toggleModal}>
          <GalleryImage src={this.props.webformatURL} alt={this.props.tags} />
        </GalleryItem>
        {showModal && (
          <Modal
            onClose={this.toggleModal}
            large={largeImageURL}
            alt={this.props.tags}
          />
        )}
      </>
    );
  }
}
// function ImageGalleryItem({
//   webformatURL,
//   largeImageURL,
//   tags,
//   onClick,
//   showModal,
// }) {
//   console.log(onClick);
//   return (
//     <GalleryItem
//       onClick={() => {
//         onClick(largeImageURL);
//       }}
//     >
//       <GalleryImage src={webformatURL} alt={tags} />
//       {onClick && (
//         <Modal>
//           <img src={largeImageURL} alt={tags} />
//         </Modal>
//       )}
//     </GalleryItem>
//   );
// }

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  // onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
