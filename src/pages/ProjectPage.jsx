import React from 'react';
import ProjectView from '../components/ProjectView';
import { useParams } from 'react-router-dom';
import { Container } from '@mui/material';

function ProjectPage() {
    const { id } = useParams();
    return (
        <Container maxWidth="md">
            <ProjectView projectId={id} />
        </Container>
    );
}

export default ProjectPage;