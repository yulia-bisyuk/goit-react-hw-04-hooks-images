import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { IconContext } from 'react-icons';
import { ImSearch } from 'react-icons/im';
import {
  SearchHeader,
  Form,
  SearchButton,
  FormInput,
} from './Searchbar.styled';

class Searchbar extends Component {
  state = {
    query: '',
  };

  handleChange = e => {
    this.setState({ query: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
  };

  render() {
    return (
      <SearchHeader>
        <Form onSubmit={this.handleSubmit}>
          <IconContext.Provider value={{ color: 'green', size: '24px' }}>
            <SearchButton type="submit">
              <ImSearch />
            </SearchButton>
          </IconContext.Provider>

          <FormInput
            onChange={this.handleChange}
            value={this.state.query}
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </Form>
      </SearchHeader>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
