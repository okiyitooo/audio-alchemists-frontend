import React from 'react';
import Login from '../components/Login';
import {Box, Container, Typography} from '@mui/material';

function LoginPage() {
  return (
    <Container maxWidth="sm">
        <Box sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Typography variant="h5" component={"h1"}>Login</Typography>
            <Login />
        </Box>
    </Container>
  );
}

export default LoginPage;