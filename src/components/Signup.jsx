import React, { useState } from 'react';
import { TextField, Button, Grid2, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { userService } from '../services/userService';

const Signup = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await userService.register(username, email, password);
            navigate('/login');
        } catch (error) {
            console.error('Signup error:', error);
        }
    };

    return (
        <Box
            sx={{ mt: 2 }}
            component="form"
            noValidate
            onSubmit={handleSubmit}>
            <Grid2 container spacing={2}>
                <Grid2 item xs={12}>
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
                    />
                </Grid2>
                <Grid2 item xs={12}>
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
                    />
                </Grid2>
                <Grid2 item xs={12}>
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
                    />
                </Grid2>
            </Grid2>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}>
                Signup</Button>
        </Box>
    );
};

export default Signup;