import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Loader from 'components/Loader';
import Button from 'components/Button';
import { fetchImages } from 'service/fetchImages';

class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    pages: 0,
    status: 'idle',
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      (prevState.page !== this.state.page && this.state.page !== 1)
    ) {
      this.addImages();
    }
    if (prevState.error !== this.state.error && this.state.error) {
      toast.error(this.state.error);
      this.setState({
        error: null,
      });
    }
  }

  handleSearch = values => {
    if (!values.value.trim()) {
      this.setState({
        error: 'Please enter your search query!',
        status: 'idle',
      });
      return;
    }

    if (values.value === this.state.query) {
      this.setState({
        error:
          'You are seeing the images by this query. Please, change your query.',
      });
      return;
    }

    this.setState({
      query: values.value,
      images: [],
      page: 1,
      error: null,
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
        this.setState({ status: 'idle' });
        return toast.error('Sorry, no images found. Please, try again!');
        // this.setState({ query: '', status: 'idle', images: [] });
        // return;
      }
      if (hits.length !== 0 && page === 1) {
        toast.success(`Hooray! We found ${totalHits} images.`);
      }
      if (page === totalPages && page !== 1) {
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
        status: 'resolved',
        pages: Math.ceil([totalHits] / 12),
      }));
    } catch (error) {
      this.setState({ error, status: 'reject' });
    }
  };

  onLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      status: 'pending',
    }));
  };

  render() {
    const { images, status, page, pages } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleSearch} />

        {status === 'pending' && <Loader />}
        {(status === 'resolved' ||
          (status === 'pending' && this.state.page !== 1)) && (
          <ImageGallery images={images} />
        )}

        {status === 'resolved' && page < pages && (
          <Button onClick={this.onLoadMore}>Load more</Button>
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
