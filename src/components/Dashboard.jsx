import React, { useEffect } from 'react';
import { Grid2, Container, Typography, Box, CircularProgress, List, ListItem, ListItemText, Button, Alert, Paper } from '@mui/material';
import { connect } from 'react-redux';
import { getAllProjects, clearSearchResults } from '../redux/actions/projectActions';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import SearchResultsList from './SearchResultList';
import RecommendedUsers from './RecommendedUsers';
import RecommendedProjects from './RecommendedProjects';

function Dashboard({ projects, loading, error, getAllProjects, clearSearchResults }) {
    useEffect(() => {
        getAllProjects();
        // Clear search results when the component mounts
        return () => {
            clearSearchResults()
        }
    }, [getAllProjects, clearSearchResults]);

    const renderProjectList =() =>{
        if (loading & (!projects.length || projects.length === 0)) {
            return (
                <CircularProgress />
            );
        }

        if (error) {
            return (
                <Alert severity="error" sx={{ mt: 2 }}>
                    Error fetching projects: {error}
                </Alert>
            )
        }

        if (!loading && projects || projects.length === 0) {
            return (
                <Typography variant="h6">No projects found. Create One!</Typography>
            );
        }

        if (projects && projects.length > 0) { 
            return (
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    {projects.map((project) => (
                        <ListItem key={project.id} button component={Link} to={`/projects/${project.id}`}>
                            <ListItemText primary={project.title} secondary={project.description} />
                        </ListItem>
                    ))}
                </List>
            )
        }
        return null;           
    }

    return (
        <Container maxWidth="md">
            <Box sx={{marginTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Typography variant="h5" gutterBottom>Dashboard</Typography>
                <SearchBar />
                <SearchResultsList />
                <Grid2 container spacing={2} sx={{ mt: 4 }}>
                    <Grid2 item xs={12} md={8}>
                        <Paper elevation={1} sx={{ p: 2, mt: 3 }}>
                            <Typography variant="subtitle2" sx={{ p: 1, backgroundColor: '#f9f9f9' }}>Your Projects:</Typography>
                            {renderProjectList()}
                            <Button variant="contained" color="primary" component={Link} to="/create-project" sx={{mt: 2}}>Create Project</Button>
                        </Paper>
                    </Grid2>
                    {/* Recommendedations */}
                    <Grid2 item xs={12} md={4}>
                        <Box sx={{ p: 2, backgroundColor: '#f5f5f5', borderRadius: 1, height: '100%' }}>
                            <RecommendedUsers />
                            <RecommendedProjects />
                        </Box>
                    </Grid2>
                    {/* Add more dashboard content here (e.g., list of projects) */}
                </Grid2>
            </Box>
        </Container>
    );
}

const mapStateToProps = (state) => ({
    projects: state.project.projects,
    loading: state.project.loading,
    error: state.project.error,
});

const mapDispatchToProps = {
    getAllProjects,
    clearSearchResults,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);