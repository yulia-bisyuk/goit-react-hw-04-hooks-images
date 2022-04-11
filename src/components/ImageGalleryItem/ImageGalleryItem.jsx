import React from 'react';
import PropTypes from 'prop-types';
import {
  ImageGalleryItm,
  ImageGalleryItmImage,
} from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ id, smallImg, onClick }) => {
  return (
    <ImageGalleryItm key={id} id={id} onClick={onClick}>
      <ImageGalleryItmImage src={smallImg} alt="" />
    </ImageGalleryItm>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  smallImg: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
