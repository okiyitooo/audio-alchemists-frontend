import React from 'react';
import Signup from '../components/Signup';
import {Box, Container, Typography} from '@mui/material';

function SignupPage() {
  return (
    <Container maxWidth="sm">
        <Box sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Typography variant="h5" component={"h1"}>Signup</Typography>
            <Signup />
        </Box>
    </Container>
  );
}

export default SignupPage;