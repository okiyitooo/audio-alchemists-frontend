import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import CreateProjectForm from '../components/CreateProjectForm'; // Import the form component
import {Link} from "react-router-dom";
import Button from "@mui/material/Button";

function CreateProjectPage() {
    return (
    <Container maxWidth="sm">
        <Box sx={{ my: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography component="h1" variant="h6">
                Create a New Project
            </Typography>
            <CreateProjectForm />
            <Button component={Link} to="/dashboard" variant="contained" color="primary" sx={{ mt: 3 }}>
                Go to Dashboard
            </Button>
        </Box>
    </Container>);
}

export default CreateProjectPage;