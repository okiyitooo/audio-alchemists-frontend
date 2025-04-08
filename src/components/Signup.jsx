import React, { useState } from 'react';
import { TextField, Button, Grid, Box, CircularProgress, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import userService from '../services/userService';

const Signup = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await userService.register(username, email, password);
            navigate('/login');
        } catch (error) {
            setError(error || 'Signup failed. Please try again.');
            console.error('Signup error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{ mt: 2 }}
            component="form"
            noValidate
            onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        variant="outlined"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        disabled={loading}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loading}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={loading}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        id="confirmPassword"
                        autoComplete="new-password"
                        variant="outlined"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        disabled={loading}
                        error={password !== confirmPassword}
                        helperText={password !== confirmPassword ? 'Passwords do not match' : ''}
                    />
                </Grid>
            </Grid>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading || password !== confirmPassword}>
                {loading ? <CircularProgress size={24} /> : 'Signup'}</Button>
            {error && 
            <Box sx={{ color: 'red', mt: 2 }}>
                <Alert severity="error">{error}</Alert>
            </Box>}
        </Box>
    );
};

export default Signup;