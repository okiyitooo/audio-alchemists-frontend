import React, { useEffect } from 'react';
import { Container, Box, Typography, CircularProgress } from '@mui/material';
import EditProjectForm from '../components/EditProjectForm';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProject } from '../redux/actions/projectActions';
import {Link} from "@mui/material";
import Button from "@mui/material/Button";

function EditProjectPage({ project, loading, error, getProject }) {
    const { id } = useParams();

    useEffect(() => {
        getProject(id);
    }, [id, getProject]);

    if (loading) {
        return (
            <Container maxWidth="sm">
                <Box sx={{ mt: 4, display: 'flex', alignItems: 'center' }}>
                    <CircularProgress />
                </Box>
            </Container>
        );
    }

    if (error) {
        return (
            <Container maxWidth="sm">
                <Box sx={{ mt: 4 }}>
                    <Typography variant="body1" color="error">Error: {error}</Typography>
                </Box>
            </Container>
        );
    }

    if (!project) {
        return (
            <Container maxWidth="sm">
                <Box sx={{ mt: 4 }}>
                    <Typography variant="body1">Project not found.</Typography>
                </Box>
            </Container>
        );
    }

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5">Edit Project</Typography>
                <EditProjectForm project={project} />
                <Link href={`/project/${id}`} underline="none">
                    <Button variant="contained" color="primary" sx={{ mt: 2 }}>Cancel</Button>
                </Link>
            </Box>
        </Container>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditProjectPage);