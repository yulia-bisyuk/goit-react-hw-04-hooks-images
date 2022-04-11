import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { Overlay, ImgModalCard, ModalStyled } from './Modal.styled';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.props.onCloseModal);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.props.onCloseModal);
  }

  getImgSrc = () => {
    const { images, id } = this.props;
    const clickedImg = images.find(image => image.id === Number(id));
    return clickedImg.largeImageURL;
  };

  render() {
    const modalRoot = document.querySelector('#modal-root');

    return createPortal(
      <Overlay onClick={this.props.onCloseModal}>
        <ModalStyled>
          <ImgModalCard src={this.getImgSrc()} alt="" />
        </ModalStyled>
      </Overlay>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(PropTypes.shape).isRequired,
  id: PropTypes.string.isRequired,
};

export default Modal;
