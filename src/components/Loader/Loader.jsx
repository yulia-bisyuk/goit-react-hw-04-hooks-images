import React from 'react';
import { LoaderBox } from './Loader.styled';
var Spinner = require('react-spinkit');


const Loader = () => {
  return (
    <LoaderBox>
      <Spinner name="three-bounce" color="green"/>
    </LoaderBox>
  );
};

export default Loader;
