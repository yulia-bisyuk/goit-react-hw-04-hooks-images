import React from 'react';
import PropTypes from 'prop-types';
import { LoadMoreButton } from './Button.styled';

const Button = ({ onloadMore }) => {
  return (
    <LoadMoreButton type="button" onClick={onloadMore}>
      Load more
    </LoadMoreButton>
  );
};

export default Button;

Button.propTypes = {
  onloadMore: PropTypes.func.isRequired,
};
