import React from 'react';
import { Container, Typography, Box } from '@mui/material';

function Dashboard() {  
    return (
        <Container maxWidth="md">
            <Box sx={{marginTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Typography variant="h5" gutterBottom>Dashboard</Typography>
                <Typography variant="body1" component={"p"}>Welcome to your dashboard</Typography>
                {/* Add more dashboard content here (e.g., list of projects) */}
            </Box>
        </Container>
    );
}

export default Dashboard;