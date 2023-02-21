import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem';
import { GalleryList } from './ImageGallery.styled';

function ImageGallery({ images, onClick }) {
  return (
    <GalleryList>
      {images.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          largeImageURL={largeImageURL}
          tags={tags}
          // onClick={onClick}
        />
      ))}
    </GalleryList>
  );
}

// class ImageGallery extends Component {
//   state = {
//     images: this.props.images,
//     showModal: false,
//     largeImageURL: null,
//   };

//   toggleModal = largeImageURL => {
//     this.setState(({ showModal }) => ({
//       showModal: !showModal,
//     }));
//     this.setState({ largeImageURL: largeImageURL });
//   };

//   render() {
//     const { images } = this.state;
//     return (
//       <GalleryList>
//         {images.map(({ id, webformatURL, largeImageURL, tags }) => (
//           <ImageGalleryItem
//             key={id}
//             webformatURL={webformatURL}
//             largeImageURL={largeImageURL}
//             tags={tags}
//             onClick={this.toggleModal}
//           />
//         ))}
//       </GalleryList>
//     );
//   }
// }

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
  // onClick: PropTypes.func.isRequired,
};

export default ImageGallery;
