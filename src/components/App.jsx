import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API from '../helpers/fetch-images-api';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Modal from './Modal';
import Button from './Button';
import Loader from './Loader';
import { NotificationText } from './App.styled';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export class App extends Component {
  state = {
    images: [],
    page: 1,
    query: '',
    imageId: null,
    isButtonVisible: false,
    status: Status.IDLE,
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    if (query !== prevState.query) {
      this.setState({ images: [], status: Status.PENDING, isButtonVisible: false });
      //timeout set for spinner appearance;
      setTimeout(() => {
        API.fetchImages(query, page)
          .then(response => {
          if (response.hits.length === 0 || query.trim() === '') {
            this.setState({ status: Status.IDLE });
            toast.info('Please, type correct search query', {
              position: 'top-center',
            });
          } else {
            this.setState({
              page: 1,
              images: [...response.hits],
              isButtonVisible: true,
              status: Status.RESOLVED,
            });
          }
        })
        .catch(error => {
          console.log(error);
          this.setState({ status: Status.REJECTED });
        });
      }, 3000);
    }
    
    if (page !== prevState.page) {
      API.fetchImages(query, page)
        .then(response => {
          this.setState({
            images: [...prevState.images, ...response.hits],
            status: Status.RESOLVED,
          });

          if (response.totalHits < page * 12) {
            this.setState({ isButtonVisible: false })
            toast.info('You\'ve reached the last page of results ', {
              position: 'bottom-center',
              hideProgressBar: true,
            });
          }
        })
        .catch(error => {
          console.log(error);
          this.setState({ status: Status.REJECTED });
        });
    }
  }

  handleLoadMore = () => {
    this.setState(prevState => ({ page: (prevState.page + 1) }));

  };

  handleSearchSubmit = userQuery => {
    this.setState({ query: userQuery });
  };

  handleOpenModal = e => {
    this.setState({ imageId: e.currentTarget.id });
  };

  handleCloseModal = e => {
    if (e.target === e.currentTarget || e.code === 'Escape') {
      this.setState({ imageId: null });
    }
  };

  render() {
    const { images, status, imageId, isButtonVisible } = this.state;

    return (
      <>
        <ToastContainer />
        <Searchbar onSubmit={this.handleSearchSubmit} />

        {status === 'pending' && <Loader />}

        {status === 'resolved' && (
            <ImageGallery images={images} onOpenModal={this.handleOpenModal} />
        )}

        {status === 'rejected' && (
          <div>
            <NotificationText>Oops...something went wrong...</NotificationText>
          </div>
        )}

        {isButtonVisible && <Button
          visible={isButtonVisible}
          onloadMore={this.handleLoadMore} />}

        {imageId && (
          <Modal
            onCloseModal={this.handleCloseModal}
            id={imageId}
            images={images}
          />
        )}
      </>
    );
  }
}
