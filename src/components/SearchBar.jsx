import React, { useState, useCallback } from 'react';
import { TextField, IconButton, InputAdornment, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear'; // For clearing the input
import { useDispatch } from 'react-redux';
import { searchProjects, clearSearchResults } from '../redux/actions/projectActions';
import { debounce } from 'lodash';

function SearchBar() {
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();

    // Debounced search function
    const debouncedSearch = useCallback(
        ()=>debounce((searchQuery) => {
            if (searchQuery.trim()) {
                dispatch(searchProjects(searchQuery));
            } else {
                dispatch(clearSearchResults()); // Clear results if query is empty/whitespace
            }
        }, 500), // Adjust debounce time (ms) as needed
        [dispatch] // dispatch is stable
    );

    const handleInputChange = (event) => {
        const newQuery = event.target.value;
        setQuery(newQuery);
        debouncedSearch(newQuery);
    };

    const handleClear = () => {
        setQuery('');
        dispatch(clearSearchResults());
    };

    return (
        <Box sx={{ width: '100%', maxWidth: 500, my: 2 }}> {/* Adjust styling */}
            <TextField
                fullWidth
                variant="outlined"
                size="small"
                placeholder="Search projects by title or description..."
                value={query}
                onChange={handleInputChange}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment position="end">
                            {query && ( // Show clear button only when there's input
                                <IconButton onClick={handleClear} edge="end" size="small">
                                    <ClearIcon fontSize="small"/>
                                </IconButton>
                            )}
                        </InputAdornment>
                    ),
                }}
            />
        </Box>
    );
}

export default SearchBar;