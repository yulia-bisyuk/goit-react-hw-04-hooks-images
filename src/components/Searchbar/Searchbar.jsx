import { useState } from 'react';
import PropTypes from 'prop-types';
import { IconContext } from 'react-icons';
import { ImSearch } from 'react-icons/im';
import {
  SearchHeader,
  Form,
  SearchButton,
  FormInput,
} from './Searchbar.styled';

const Searchbar = ({ onSubmit }) => {
  const [userQuery, setUserQuery] = useState('');
  
  const handleChange = e => {
    setUserQuery(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(userQuery);
    setUserQuery('');
  }

    return (
      <SearchHeader>
        <Form onSubmit={handleSubmit}>
          <IconContext.Provider value={{ color: 'green', size: '24px' }}>
            <SearchButton type="submit">
              <ImSearch />
            </SearchButton>
          </IconContext.Provider>

          <FormInput
            onChange={handleChange}
            value={userQuery}
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </Form>
      </SearchHeader>
    );
  
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
