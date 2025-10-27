import GlobalSearch from './GlobalSearch';

export default {
  title: 'Molecules/GlobalSearch',
  component: GlobalSearch,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
  },
};

const Template = (args) => <GlobalSearch {...args} />;

export const Default = Template.bind({});
Default.args = {
  onSearch: (term, filter, suggestion) => {
    console.log('Search:', { term, filter, suggestion });
    alert(`Searching for: "${term}" with filter: "${filter}"`);
  },
  onFilter: (filterId) => {
    console.log('Filter changed:', filterId);
  }
};

export const WithCustomSuggestions = Template.bind({});
WithCustomSuggestions.args = {
  suggestions: [
    { id: 1, text: 'Maternal Health Program', type: 'project', category: 'Health' },
    { id: 2, text: 'Child Nutrition Initiative', type: 'project', category: 'Nutrition' },
    { id: 3, text: 'Community Health Workers', type: 'content', category: 'Team' },
    { id: 4, text: 'Annual Report 2024', type: 'content', category: 'Reports' },
    { id: 5, text: 'Volunteer Application', type: 'page', category: 'Forms' }
  ],
  onSearch: (term, filter, suggestion) => {
    console.log('Search:', { term, filter, suggestion });
  }
};

export const WithCustomFilters = Template.bind({});
WithCustomFilters.args = {
  filters: [
    { id: 'all', label: 'All', icon: 'search' },
    { id: 'health', label: 'Health', icon: 'heart' },
    { id: 'nutrition', label: 'Nutrition', icon: 'apple' },
    { id: 'education', label: 'Education', icon: 'book' },
    { id: 'reports', label: 'Reports', icon: 'chart' }
  ],
  onSearch: (term, filter, suggestion) => {
    console.log('Search:', { term, filter, suggestion });
  }
};

export const WithoutFilters = Template.bind({});
WithoutFilters.args = {
  showFilters: false,
  placeholder: 'Search without filters...',
  onSearch: (term, filter, suggestion) => {
    console.log('Search:', { term, filter, suggestion });
  }
};

export const SmallSize = Template.bind({});
SmallSize.args = {
  size: 'small',
  maxSuggestions: 3,
  onSearch: (term, filter, suggestion) => {
    console.log('Search:', { term, filter, suggestion });
  }
};

export const LargeSize = Template.bind({});
LargeSize.args = {
  size: 'large',
  placeholder: 'Search our entire platform...',
  maxSuggestions: 8,
  onSearch: (term, filter, suggestion) => {
    console.log('Search:', { term, filter, suggestion });
  }
};