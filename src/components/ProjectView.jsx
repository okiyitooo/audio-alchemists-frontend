import React from 'react';
import { Typography, Box } from '@mui/material';

function ProjectView({ projectId }) {
    return (
        <Box sx={{marginTop: 4}}>
            <Typography variant="h5" gutterBottom>Project {projectId}</Typography>
            <Typography variant="body1" component={"p"}>This is project {projectId}</Typography>
            {/* Add more project content here (e.g., list of tracks) */}
        </Box>
    );
}

export default ProjectView;