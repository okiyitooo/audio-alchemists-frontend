import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/actions/userActions';

function Layout({ children }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none' }}>
                        Audio Alchemists
                    </Typography>
                    {localStorage.getItem('token') ? (
                        <>
                            <Button component={Link} to="/dashboard" color="inherit">Dashboard</Button>
                            <Button onClick={handleLogout} color="inherit">Logout</Button>
                        </>
                    ) : (
                        <>
                            <Button component={Link} to="/login" color="inherit">Login</Button>
                            <Button component={Link} to="/signup" color="inherit">Sign Up</Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>
            <Container component="main" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
                {children}
            </Container>
            <Box component="footer" sx={{ bgcolor: 'background.paper', p: 2, mt: 'auto' }}>
                 <Typography variant="body2" color="text.secondary" align="center">
                   © {new Date().getFullYear()} Audio Alchemists
                 </Typography>
            </Box>
        </Box>
    );
}

export default Layout;