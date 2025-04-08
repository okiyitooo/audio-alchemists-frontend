import React, { useEffect } from 'react';
import { Typography, Box, Button, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProject } from '../redux/actions/projectActions';

function ProjectView({ project, loading, error, getProject }) {

    const {projectId} = useParams();

    useEffect(() => {
        getProject(projectId);
    }, [projectId, getProject]);

    if (loading) {
        return (
            <Box sx={{display: 'flex', justifyContent: 'center', mt: 4}}>
                <CircularProgress />
            </Box>);
    }

    if (error) {
        return (
            <Box sx={{color: 'red', mt: 4}}>
                <Typography variant="body1" component="p" color="error">Error: {error}</Typography>
            </Box>
        );
    }

    if (!project) {
        return (
            <Box sx={{mt: 4}}>
                <Typography variant="body1">Project not found.</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{marginTop: 4}}>
            <Typography variant="h5" gutterBottom>{project.title}</Typography>
            <Typography variant="body1" component={"p"}>{project.description}</Typography>
            {/* Display other project details, tracks, comments, etc. here */}
            <Button variant="contained" color="primary">Edit Project</Button>
        </Box>
    );
}

const mapStateToProps = (state) => ({
    project: state.project.project,
    loading: state.project.loading,
    error: state.project.error,
});

const mapDispatchToProps = {
    getProject,
};


export default connect(mapStateToProps, mapDispatchToProps)(ProjectView);