import { useState, useEffect, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import Button from '../../atoms/Button';
import Input from '../../atoms/Input';
import Icon from '../../atoms/Icon';

const GlobalSearch = ({
  placeholder = 'Search projects, articles, team members...',
  onSearch,
  onFilter,
  suggestions = [],
  filters = [],
  className = '',
  size = 'medium',
  showFilters = true,
  maxSuggestions = 5,
  ...props
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const searchRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Memoized default suggestions data to prevent infinite re-renders
  const defaultSuggestions = useMemo(() => [
    { id: 1, text: 'RxCare Research', type: 'project', category: 'Projects' },
    { id: 2, text: 'Health Screenings', type: 'project', category: 'Projects' },
    { id: 3, text: 'Community Outreach', type: 'project', category: 'Projects' },
    { id: 4, text: 'Nutrition Programs', type: 'project', category: 'Projects' },
    { id: 5, text: 'About CareSpot', type: 'page', category: 'Pages' },
    { id: 6, text: 'Our Team', type: 'page', category: 'Pages' },
    { id: 7, text: 'Contact Us', type: 'page', category: 'Pages' },
    { id: 8, text: 'Donate', type: 'page', category: 'Pages' },
    { id: 9, text: 'Volunteer Opportunities', type: 'content', category: 'Content' },
    { id: 10, text: 'Impact Stories', type: 'content', category: 'Content' }
  ], []);

  const allSuggestions = useMemo(() =>
    suggestions.length > 0 ? suggestions : defaultSuggestions,
    [suggestions, defaultSuggestions]
  );

  const defaultFilters = useMemo(() => [
    { id: 'all', label: 'All', icon: 'search' },
    { id: 'projects', label: 'Projects', icon: 'folder' },
    { id: 'pages', label: 'Pages', icon: 'document' },
    { id: 'content', label: 'Content', icon: 'article' }
  ], []);

  const allFilters = useMemo(() =>
    filters.length > 0 ? filters : defaultFilters,
    [filters, defaultFilters]
  );

  // Memoize filtered suggestions to prevent unnecessary recalculations
  const filteredSuggestionsData = useMemo(() => {
    if (searchTerm.length === 0) {
      return [];
    }

    let filtered = allSuggestions.filter(suggestion =>
      suggestion.text.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (selectedFilter !== 'all') {
      filtered = filtered.filter(suggestion =>
        suggestion.type === selectedFilter || suggestion.category.toLowerCase() === selectedFilter
      );
    }

    return filtered.slice(0, maxSuggestions);
  }, [searchTerm, selectedFilter, allSuggestions, maxSuggestions]);

  useEffect(() => {
    setFilteredSuggestions(filteredSuggestionsData);

    if (searchTerm.length > 0) {
      setIsOpen(true);
      setHighlightedIndex(-1);
    } else {
      setIsOpen(false);
      setHighlightedIndex(-1);
    }
  }, [filteredSuggestionsData, searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (highlightedIndex >= 0 && filteredSuggestions[highlightedIndex]) {
      handleSuggestionClick(filteredSuggestions[highlightedIndex]);
    } else if (onSearch) {
      onSearch(searchTerm, selectedFilter);
    }
    setIsOpen(false);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev =>
          prev < filteredSuggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Escape':
        setIsOpen(false);
        setHighlightedIndex(-1);
        searchRef.current?.querySelector('input')?.blur();
        break;
      case 'Tab':
        setIsOpen(false);
        setHighlightedIndex(-1);
        break;
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.text);
    setIsOpen(false);
    setHighlightedIndex(-1);
    if (onSearch) {
      onSearch(suggestion.text, selectedFilter, suggestion);
    }
  };

  const handleFilterChange = (filterId) => {
    setSelectedFilter(filterId);
    if (onFilter) {
      onFilter(filterId);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setIsOpen(false);
    setHighlightedIndex(-1);
    searchRef.current?.querySelector('input')?.focus();
  };

  return (
    <div ref={searchRef} className={`relative ${className}`} {...props}>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="flex-1 relative">
          <Input
            type="text"
            placeholder={placeholder}
            value={searchTerm}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => searchTerm && setIsOpen(true)}
            size={size}
            className="pr-20"
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-autocomplete="list"
            role="combobox"
          />

          {/* Clear button */}
          {searchTerm && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-12 top-1/2 transform -translate-y-1/2 text-color-text-tertiary hover:text-color-text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-color-interactive-primary rounded-full p-1"
              aria-label="Clear search"
            >
              <Icon name="x" size="small" />
            </button>
          )}

          {/* Search icon */}
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-color-text-tertiary">
            <Icon name="search" size="small" />
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          size={size}
          className="flex-shrink-0"
          aria-label="Search"
        >
          Search
        </Button>
      </form>

      {/* Filters */}
      {showFilters && (
        <div className="flex gap-2 mt-3 flex-wrap">
          {allFilters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              onClick={() => handleFilterChange(filter.id)}
              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-color-interactive-primary focus:ring-offset-2 ${selectedFilter === filter.id
                  ? 'bg-color-interactive-primary text-white'
                  : 'bg-color-bg-secondary text-color-text-secondary hover:bg-color-bg-tertiary hover:text-color-text-primary'
                }`}
            >
              <Icon name={filter.icon} size="small" />
              {filter.label}
            </button>
          ))}
        </div>
      )}

      {/* Suggestions dropdown */}
      {isOpen && filteredSuggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-1 bg-color-bg-primary border border-color-border-primary rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto"
          role="listbox"
        >
          {filteredSuggestions.map((suggestion, index) => (
            <button
              key={suggestion.id}
              type="button"
              onClick={() => handleSuggestionClick(suggestion)}
              className={`w-full text-left px-4 py-3 hover:bg-color-bg-secondary transition-colors duration-200 focus:outline-none focus:bg-color-bg-secondary border-b border-color-border-primary last:border-b-0 ${index === highlightedIndex ? 'bg-color-bg-secondary' : ''
                }`}
              role="option"
              aria-selected={index === highlightedIndex}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Icon
                    name={suggestion.type === 'project' ? 'folder' : suggestion.type === 'page' ? 'document' : 'article'}
                    size="small"
                    className="text-color-text-tertiary"
                  />
                  <span className="text-color-text-primary font-medium">
                    {suggestion.text}
                  </span>
                </div>
                <span className="text-xs text-color-text-tertiary bg-color-bg-tertiary px-2 py-1 rounded-full">
                  {suggestion.category}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* No results message */}
      {isOpen && searchTerm && filteredSuggestions.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-color-bg-primary border border-color-border-primary rounded-lg shadow-lg z-50 p-4 text-center">
          <Icon name="search" size="medium" className="text-color-text-tertiary mx-auto mb-2" />
          <p className="text-color-text-secondary">No results found for "{searchTerm}"</p>
          <p className="text-color-text-tertiary text-sm mt-1">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

GlobalSearch.propTypes = {
  placeholder: PropTypes.string,
  onSearch: PropTypes.func,
  onFilter: PropTypes.func,
  suggestions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      text: PropTypes.string.isRequired,
      type: PropTypes.string,
      category: PropTypes.string
    })
  ),
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      icon: PropTypes.string
    })
  ),
  className: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  showFilters: PropTypes.bool,
  maxSuggestions: PropTypes.number
};

export default GlobalSearch;