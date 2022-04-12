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

const body = document.querySelector('body');
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
    status: Status.IDLE,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;

    if (query !== prevState.query) {
      this.setState({ images: [], status: Status.PENDING });

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
              status: Status.RESOLVED,
            });
          }
        })
        .catch(error => {
          console.log(error);
          this.setState({ status: Status.REJECTED });
        });
    }

    if (page !== prevState.page) {
      API.fetchImages(query, page)
        .then(response => {
          this.setState({
            images: [...prevState.images, ...response.hits],
            status: Status.RESOLVED,
          });
        })
        .catch(error => {
          console.log(error);
          this.setState({ status: Status.REJECTED });
        });
    }
  }

  handleLoadMore = () => {
    // const { query, page } = this.state;
    this.setState(prevState => ({ page: (prevState.page += 1) }));
   
    //  API.fetchImages(query, page)
    //     .then(response => {
    //       this.setState((prevState) =>
    //       ({
            
    //         images: [
    //           ...prevState.images,
    //           ...response.hits],
    //         status: Status.RESOLVED,
    //         page: (prevState.page += 1),
    //       })
    //       );
    //     })
    //     .catch(error => {
    //       console.log(error);
    //       this.setState({ status: Status.REJECTED });
    //     });
  };

  handleSearchSubmit = userQuery => {
    this.setState({ query: userQuery });
  };

  handleOpenModal = e => {
    this.setState({ imageId: e.currentTarget.id });
    body.style.overflow = 'hidden';
  };

  handleCloseModal = e => {
    if (e.target === e.currentTarget || e.code === 'Escape') {
      this.setState({ imageId: null });
      body.style.overflow = 'auto';
    }
  };

  render() {
    const { images, status, imageId } = this.state;
    console.log(status);
    console.log(this.state.page);
    console.log(images);

    return (
      <>
        <ToastContainer />
        <Searchbar onSubmit={this.handleSearchSubmit} />

        {status === 'pending' && <Loader />}

        {status === 'resolved' && (
          <>
            <ImageGallery images={images} onOpenModal={this.handleOpenModal} />
            <Button onloadMore={this.handleLoadMore} />
          </>
        )}

        {status === 'rejected' && (
          <div>
            <NotificationText>Oops...something went wrong...</NotificationText>
          </div>
        )}

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
