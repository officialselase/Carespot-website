# GlobalSearch Component Fix

## Issue
The GlobalSearch component was causing a "Maximum update depth exceeded" error due to infinite re-renders. This was happening because:

1. The `defaultSuggestions` and `allSuggestions` arrays were being recreated on every render
2. These arrays were used as dependencies in a `useEffect`, causing it to run infinitely
3. The `useEffect` was updating state, which triggered another render, creating an infinite loop

## Solution
Fixed the infinite re-render issue by:

1. **Memoizing static data**: Used `useMemo` to memoize `defaultSuggestions`, `allSuggestions`, `defaultFilters`, and `allFilters` to prevent unnecessary recreations
2. **Optimizing filtered suggestions**: Moved the filtering logic to a `useMemo` hook to prevent recalculation on every render
3. **Simplifying useEffect**: Reduced the `useEffect` to only handle state updates based on memoized data

## Changes Made

### Before (Problematic Code)
```javascript
const defaultSuggestions = [/* array */]; // Recreated every render
const allSuggestions = suggestions.length > 0 ? suggestions : defaultSuggestions; // New reference every render

useEffect(() => {
  // Filtering logic here
  setFilteredSuggestions(filtered);
}, [searchTerm, selectedFilter, allSuggestions, maxSuggestions]); // allSuggestions causes infinite loop
```

### After (Fixed Code)
```javascript
const defaultSuggestions = useMemo(() => [/* array */], []); // Memoized
const allSuggestions = useMemo(() => 
  suggestions.length > 0 ? suggestions : defaultSuggestions,
  [suggestions, defaultSuggestions]
); // Stable reference

const filteredSuggestionsData = useMemo(() => {
  // Filtering logic here
}, [searchTerm, selectedFilter, allSuggestions, maxSuggestions]); // Memoized calculation

useEffect(() => {
  setFilteredSuggestions(filteredSuggestionsData); // Simple state update
}, [filteredSuggestionsData, searchTerm]); // Stable dependencies
```

## Performance Benefits
- Eliminates infinite re-renders
- Reduces unnecessary recalculations
- Improves component stability
- Better memory usage

## Testing
Added basic tests to ensure the component:
- Renders without crashing
- Handles input changes properly
- Shows suggestions correctly
- Filters work as expected

The component is now stable and performant.