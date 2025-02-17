import React from "react";
import { Link } from "react-router-dom";
import { Box, Container, Typography, Button } from "@mui/material";

const HomePage = () => {
    return (
        <Container maxWidth="sm">
            <Box sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Typography variant="h5" component={"h1"}>Welcome to Audio Alchemists</Typography>
                <Typography variant="body1" component={"p"}>The best place to find and collaborate on music projects</Typography>
                <Box sx = {{marginTop: 3}}>
                    <Button component={Link} to="/login" variant="contained" sx={{marginRight: 2}} color="primary">Login</Button>
                    <Button component={Link} to="/signup" variant="outlined" color="primary">Signup</Button>
                </Box>
            </Box>
        </Container>
    );
}

export default HomePage;