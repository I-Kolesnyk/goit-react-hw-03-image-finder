import axios from 'axios';

const BASE_URL = 'https://pixabay.com';
const API_KEY = '32639885-f1e4dacd717d4e1c1fb5816a4';

export const fetchImages = async (query, page) => {
  const response = await axios.get(
    `${BASE_URL}/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  const images = response.data.hits.map(
    ({ id, webformatURL, largeImageURL, tags }) => {
      return {
        id,
        webformatURL,
        largeImageURL,
        tags,
      };
    }
  );
  return { images, totalImages: response.data.totalHits };
};
