import React, { useEffect } from 'react';
import { Container, Typography, Box, CircularProgress, List, ListItem, ListItemText, Button } from '@mui/material';
import { connect } from 'react-redux';
import { getAllProjects } from '../redux/actions/projectActions';
import { Link } from 'react-router-dom';

function Dashboard({ projects, loading, error, getAllProjects }) {
    useEffect(() => {
        getAllProjects();
    }, [getAllProjects]);

    if (loading) {
        return (
            <Container maxWidth="md">
                <Box sx={{display: 'flex', justifyContent: 'center', mt: '4'}} >
                    <CircularProgress />
                </Box>
            </Container>
        );
    }

    if (error) {
        return (
            <Container maxWidth="md">
                <Box sx={{display: 'flex', justifyContent: 'center', mt: '4'}} >
                    <Typography variant="body1" component="p" color="error">Error: {error}</Typography>
                </Box>
            </Container>
        )
    }


    return (
        <Container maxWidth="md">
            <Box sx={{marginTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Typography variant="h5" gutterBottom>Dashboard</Typography>
                {
                    projects ? (
                        <List>
                            {projects.map(project => (
                                <ListItem key={project.id} button component={Link} to={`/projects/${project.id}`}>
                                    <ListItemText primary={project.title} secondary={project.description} />
                                </ListItem>
                            ))}
                        </List>
                    ) : (
                        <Typography variant="body1" component="p">No projects found.</Typography>
                    )
                }
                <Button variant="contained" color="primary" component={Link} to="/create-project" sx={{mt: 2}}>Create Project</Button>
                {/* Add more dashboard content here (e.g., list of projects) */}
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);