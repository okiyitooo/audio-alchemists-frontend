import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, List, ListItem, ListItemText, CircularProgress, Alert } from '@mui/material';
import { Link } from 'react-router-dom';

function SearchResultsList() {
    const { searchResults, searchLoading, searchError } = useSelector((state) => state.project);

    if (searchLoading) {
        return <CircularProgress size={20} sx={{ display: 'block', margin: '20px auto' }} />;
    }

    if (searchError) {
        return <Alert severity="error" sx={{ mt: 2 }}>Search Error: {searchError}</Alert>;
    }

    if (!searchResults || searchResults.length === 0) {
        // Don't show anything if there are no results yet, unless explicitly searching
        // You might want different behavior (e.g., "No results found" after a search attempt)
         return null; // Or <Typography sx={{mt: 2}}>No results found.</Typography>
    }

    return (
        <Box sx={{ mt: 2, border: '1px solid #eee', borderRadius: 1, maxHeight: 400, overflowY: 'auto' }}>
             <Typography variant="subtitle2" sx={{ p: 1, backgroundColor: '#f9f9f9' }}>Search Results:</Typography>
            <List dense>
                {searchResults.map((project) => (
                    <ListItem
                        key={project.id}
                        button
                        component={Link}
                        to={`/projects/${project.id}`}
                        divider
                    >
                        <ListItemText
                            primary={project.title}
                            secondary={project.description?.substring(0, 100) + (project.description?.length > 100 ? '...' : '')} // Show snippet
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}

export default SearchResultsList;