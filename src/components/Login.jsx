import React, { useState } from 'react';
import { TextField, Button, Grid2, Box, Alert } from '@mui/material';
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';
import { useNavigate } from 'react-router-dom';

const Login = ({ loginUser, error }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await loginUser({ username, password });
        if (success) {
            navigate('/dashboard'); 
        }
    }

    return (
        <Box sx={{mt: 2}} component="form" noValidate onSubmit={handleSubmit}>
            <Grid2 container spacing={2}>
                <Grid2 item xs={12}>
                    <TextField
                        required
                        fullWidth
                        id='username'
                        name='username'
                        autoComplete='username'
                        label="Username"
                        variant="outlined"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Grid2>
                <Grid2 item xs={12}>
                    <TextField
                        required
                        fullWidth
                        name='password'
                        label="Password"
                        type="password"
                        id='password'
                        autoComplete='current-password'
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Grid2>
            </Grid2>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Login
            </Button>
            
            {error && <Alert severity="error">{error}</Alert>}
        </Box>
    );
};

const mapStateToProps = (state) => ({
    error: state.user.error, // get error from user reducer
});

const mapDispatchToProps = {
    loginUser, // action creator
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);