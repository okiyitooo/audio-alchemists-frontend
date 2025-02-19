import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button } from '@mui/material';

const NotFoundPage = () => {
    return (
        <Container style={{ textAlign: 'center', marginTop: '50px' }}>
            <Typography variant="h3" component="h1" gutterBottom>
                404 - Page Not Found
            </Typography>
            <Typography variant="h6" component="p" gutterBottom>
                Sorry, the page you are looking for does not exist.
            </Typography>
            <Button variant="contained" color="primary" component={Link} to="/">
                Go to Home
            </Button>
        </Container>
    );
};

export default NotFoundPage;