import React, { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Loader from 'components/Loader';
import ButtonLoadMore from 'components/Button';
import { ToastWrapper } from 'components/ToastContainer/ToastContainer';

import { fetchImages } from 'service/fetchImages';
import { StyledApp } from './App.styled';

class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    pages: 0,
    status: 'idle',
    error: { type: '', message: '' }, // type: error, info, success
  };

  componentDidUpdate(_, prevState) {
    const { query, page, error } = this.state;
    const { addImages, handleError } = this;

    if (prevState.query !== query || (prevState.page !== page && page !== 1)) {
      addImages();
    }

    if (prevState.error !== error && error) {
      handleError();
    }
  }

  handleError = () => {
    const errorType = this.state.error.type;
    const notification = this.state.error.message;

    if (errorType === 'info') {
      toast.info(notification);
      this.setState({
        error: { type: '', message: '' },
      });
    }
    if (errorType === 'error') {
      toast.error(notification);
      this.setState({
        error: { type: '', message: '' },
      });
    }
    if (errorType === 'success') {
      toast.success(notification);
      this.setState({
        error: { type: '', message: '' },
      });
    }
  };

  handleSearch = ({ value }) => {
    if (!value.trim()) {
      this.setState({
        error: { type: 'info', message: 'Please enter your search query!' },
      });
      return;
    }

    if (value === this.state.query) {
      this.setState({
        error: {
          type: 'info',
          message:
            'You are seeing the images by this query. Please, change your query.',
        },
      });
      return;
    }

    this.setState({
      query: value,
      images: [],
      page: 1,
      error: {
        type: '',
        message: '',
      },
      status: 'idle',
    });
  };

  addImages = async () => {
    const { query, page } = this.state;
    const perPage = 12;

    this.setState({ status: 'pending' });

    try {
      const { hits, totalHits } = await fetchImages(query, page, perPage);

      const totalPages = Math.ceil(totalHits / perPage);

      if (hits.length === 0) {
        this.setState({
          error: {
            type: 'error',
            message:
              'Sorry, there are no images matching your search query. Please try again.',
          },
        });
      }
      if (hits.length !== 0 && page === 1) {
        this.setState({
          error: {
            type: 'success',
            message: `Hooray! We found ${totalHits} images.`,
          },
        });
      }
      if (page === totalPages && page !== 1) {
        this.setState({
          error: {
            type: 'info',
            message: 'You have reached the end of search results.',
          },
        });
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
        status: 'resolved',
        pages: totalPages,
      }));
    } catch (error) {
      this.setState({
        error: {
          type: 'error',
          message: 'There are some problems! Try again later.',
        },
        status: 'reject',
      });
    }
  };

  onLoadMore = () => {
    this.setState(({ page }) => ({
      page: page + 1,
      status: 'pending',
    }));
  };

  render() {
    const { images, status, page, pages } = this.state;
    const { handleSearch, onLoadMore } = this;

    return (
      <StyledApp>
        <Searchbar onSubmit={handleSearch} />

        {status === 'pending' && <Loader />}

        {(status === 'resolved' || (status === 'pending' && page !== 1)) && (
          <ImageGallery images={images} />
        )}

        {(page < pages || (status === 'pending' && page > 1)) && (
          <ButtonLoadMore onClick={onLoadMore} />
        )}

        <ToastWrapper />
      </StyledApp>
    );
  }
}

export default App;
