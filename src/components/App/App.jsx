import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Modal from 'components/Modal';
import Loader from 'components/Loader';
import Button from 'components/Button';
import { fetchImages } from 'service/fetchImages';

class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    error: null,
    isLoading: false,
    showModal: false,
    largeImageURL: null,
  };

  componentDidUpdate(_, prevState) {
    if (prevState.error !== this.state.error && this.state.error) {
      toast.error(this.state.error);

      this.setState({
        error: null,
      });
    }

    if (
      prevState.query !== this.state.query ||
      (prevState.page !== this.state.page && this.state.page !== 1)
    ) {
      this.fetchImages();
    }
  }

  handleSearch = values => {
    if (!values.value.trim()) {
      this.setState({ error: 'Please enter your search query!' });
      return;
    }

    if (values.value === this.state.query) {
      this.setState({
        error:
          'You are seeing the images by this query. Please, change your query.',
      });
      return;
    }

    this.setState({ query: values.value, images: [], page: 1, error: null });
  };

  fetchImages = () => {
    const { query, page } = this.state;
    const perPage = 12;

    this.setState({ isLoading: true });

    fetchImages(query, page, perPage)
      .then(({ hits, totalHits }) => {
        const totalPages = Math.ceil(totalHits / perPage);

        if (hits.length === 0) {
          return toast.error('Sorry, no images found. Please, try again!');
        }

        if (page === 1) {
          toast.success(`Hooray! We found ${totalHits} images.`);
        }

        if (page === totalPages) {
          toast.info("You've reached the end of search results.");
        }

        const data = hits.map(({ id, webformatURL, largeImageURL, tags }) => {
          return {
            id,
            webformatURL,
            largeImageURL,
            tags,
          };
        });
        this.setState(({ images }) => ({
          images: [...images, ...data],
          total: totalHits,
        }));
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  onLoadMore = () => {
    this.setState(({ page }) => ({
      page: page + 1,
      isLoading: true,
    }));
  };

  toggleModal = largeImageURL => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
    this.setState({ largeImageURL: largeImageURL });
  };

  render() {
    const { images, isLoading, showModal, largeImageURL, tags, total } =
      this.state;
    const totalImages = this.state.images.length;
    const loadImages = totalImages !== 0;
    const isLastPage = images.length === total;
    const loadMoreBtn = loadImages && !isLoading && !isLastPage;

    return (
      <div>
        <Searchbar onSubmit={this.handleSearch} />

        {this.state.isLoading && <Loader />}
        {totalImages !== 0 && (
          <ImageGallery images={images} onClick={this.toggleModal} />
        )}

        {loadMoreBtn && <Button onClick={this.onLoadMore}>Load more</Button>}

        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImageURL} alt={tags} />
          </Modal>
        )}

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    );
  }
}

export default App;
