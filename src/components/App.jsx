import {useState, useEffect }from 'react';
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

export const App = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [imageId, setImageId] = useState(null);
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [status, setStatus] = useState(Status.IDLE);


  useEffect(() => {
    if (query === '') { return };
    setImages([]);
    setStatus(Status.PENDING);
    setIsButtonVisible(false);



    API.fetchImages(query, 1)
      .then(response => {
        if (response.hits.length === 0 || query.trim() === '') {
          setStatus(Status.IDLE);
          toast.info('Please, type correct search query', {
            position: 'top-center',
          });
        } else {
          setImages([...response.hits]);
          setIsButtonVisible(true);
          setStatus(Status.RESOLVED);
        }
      })
      .catch(error => {
        console.log(error);
        setStatus(Status.REJECTED)
      });
  }, [query]);


  useEffect(() => {
    
    if (query === '') { return };
    
      API.fetchImages(query, page)
        .then(response => {
          setImages(images => [...images, ...response.hits]);
          setStatus(Status.RESOLVED);
        
          if (response.totalHits < page * 12) {
            setIsButtonVisible(false);
            toast.info('You\'ve reached the last page of results ', {
              position: 'bottom-center',
              hideProgressBar: true,
            });
          }
        }).catch(error => {
          console.log(error);
          setStatus(Status.REJECTED)
        });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[page])

  const handleLoadMore = () => {
    setPage(page => page + 1);
  };

  const handleSearchSubmit = userQuery => {
    setQuery(userQuery);
  };

  const handleOpenModal = e => {
    setImageId(e.currentTarget.id)
  };

  const handleCloseModal = e => {
    if (e.target === e.currentTarget || e.code === 'Escape') {
      setImageId(null);
    }
  };

    return (
      <>
        <ToastContainer />
        <Searchbar onSubmit={handleSearchSubmit} />

        {status === 'pending' && <Loader />}

        {status === 'resolved' && (
            <ImageGallery images={images} onOpenModal={handleOpenModal} />
        )}

        {status === 'rejected' && (
          <div>
            <NotificationText>Oops...something went wrong...</NotificationText>
          </div>
        )}

        {isButtonVisible && <Button
          visible={isButtonVisible}
          onloadMore={handleLoadMore} />}

        {imageId && (
          <Modal
            onCloseModal={handleCloseModal}
            id={imageId}
            images={images}
          />
        )}
      </>
    );
  }

