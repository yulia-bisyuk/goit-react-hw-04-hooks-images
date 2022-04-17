import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { Overlay, ImgModalCard, ModalStyled } from './Modal.styled';

const Modal = ({ images, id, onCloseModal }) => {
  
  useEffect(() => {
    window.addEventListener('keydown', onCloseModal);

    return () => {
      window.removeEventListener('keydown', onCloseModal);
    }
  })

  const getImgSrc = () => {
    const clickedImg = images.find(image => image.id === Number(id));
    return clickedImg.largeImageURL;
  };

  const modalRoot = document.querySelector('#modal-root');

    return createPortal(
      <Overlay onClick={onCloseModal}>
        <ModalStyled>
          <ImgModalCard src={getImgSrc()} alt="" />
        </ModalStyled>
      </Overlay>,
      modalRoot
    );
  }


Modal.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(PropTypes.shape).isRequired,
  id: PropTypes.string.isRequired,
};

export default Modal;
