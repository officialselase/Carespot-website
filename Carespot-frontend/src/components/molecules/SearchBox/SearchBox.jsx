import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../../atoms/Button';
import Input from '../../atoms/Input';
import Icon from '../../atoms/Icon';

const SearchBox = ({
  placeholder = 'Search...',
  onSearch,
  className = '',
  size = 'medium',
  ...props
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    }
  };
  
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  return (
    <form onSubmit={handleSubmit} className={`flex gap-2 ${className}`} {...props}>
      <div className="flex-1">
        <Input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleInputChange}
          size={size}
          className="pr-10"
        />
      </div>
      <Button
        type="submit"
        variant="primary"
        size={size}
        className="flex-shrink-0"
      >
        <Icon name="search" size="small" />
        <span className="sr-only">Search</span>
      </Button>
    </form>
  );
};

SearchBox.propTypes = {
  placeholder: PropTypes.string,
  onSearch: PropTypes.func,
  className: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large'])
};

export default SearchBox;