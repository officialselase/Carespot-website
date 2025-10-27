import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import GlobalSearch from './GlobalSearch';

describe('GlobalSearch', () => {
  test('renders without crashing', () => {
    render(<GlobalSearch />);
    expect(screen.getByPlaceholderText(/search projects/i)).toBeInTheDocument();
  });

  test('handles search input without infinite re-renders', () => {
    const mockOnSearch = jest.fn();
    render(<GlobalSearch onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText(/search projects/i);
    fireEvent.change(input, { target: { value: 'test' } });
    
    expect(input.value).toBe('test');
    expect(mockOnSearch).not.toHaveBeenCalled(); // Should not be called until form submission
  });

  test('shows suggestions when typing', () => {
    render(<GlobalSearch />);
    
    const input = screen.getByPlaceholderText(/search projects/i);
    fireEvent.change(input, { target: { value: 'RxCare' } });
    
    expect(screen.getByText('RxCare Research')).toBeInTheDocument();
  });

  test('filters suggestions based on selected filter', () => {
    render(<GlobalSearch />);
    
    // Click on Projects filter
    const projectsFilter = screen.getByText('Projects');
    fireEvent.click(projectsFilter);
    
    // Type search term
    const input = screen.getByPlaceholderText(/search projects/i);
    fireEvent.change(input, { target: { value: 'Care' } });
    
    // Should show project results
    expect(screen.getByText('RxCare Research')).toBeInTheDocument();
  });
});