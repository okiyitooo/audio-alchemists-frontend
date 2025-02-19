import React from 'react';
import { useParams } from 'react-router-dom';
import TrackEditor from '../components/TrackEditor';
import { Container } from '@mui/material';

function TrackEditorPage() {
    const { projectId, trackId } = useParams();
    return (
        <Container maxWidth="md">
            <TrackEditor projectId={projectId} trackId={trackId} />
        </Container>
    );
}

export default TrackEditorPage;