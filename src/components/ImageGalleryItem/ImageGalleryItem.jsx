import PropTypes from 'prop-types';

function ImageGalleryItem({ webformatURL, largeImageURL, tags, onClick }) {
  return (
    <li
      onClick={() => {
        onClick(largeImageURL);
      }}
    >
      <img src={webformatURL} alt={tags} />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
