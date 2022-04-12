import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem';
import { ImgGallery } from './ImageGallery.styled';

const ImageGallery = ({ images, onOpenModal }) => {

  return (
    <ImgGallery>
      {images.map(image => (
        <ImageGalleryItem
          key={image.id}
          id={image.id}
          smallImg={image.webformatURL}
          largeImg={image.largeImageURL}
          onClick={onOpenModal}
        />
      ))}
    </ImgGallery>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape).isRequired,
  onOpenModal: PropTypes.func.isRequired,
};

export default ImageGallery;
