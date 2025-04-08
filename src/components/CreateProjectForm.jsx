import React, { useState } from 'react';
import { TextField, Button, Grid, Box, CircularProgress, Alert } from '@mui/material';
import { connect } from 'react-redux';
import { createProject } from '../redux/actions/projectActions';
import { useNavigate } from 'react-router-dom';

function CreateProjectForm({createProject, loading, error}) {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [genre, setGenre] = useState('');
    const [tempo, setTempo] = useState('');
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const projectData = {
            title,
            description,
            genre,
            tempo: parseInt(tempo),
        };
        const success = await createProject(projectData);
        if (success)
            navigate('/dashboard');
    }

    return (
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        id="title"
                        label="Title"
                        name="title"
                        autoComplete="title"
                        variant="outlined"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        disabled={loading}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        id="description"
                        label="Description"
                        name="description"
                        autoComplete="description"
                        variant="outlined"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        disabled={loading}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        id="genre"
                        label="Genre"
                        name="genre"
                        autoComplete="genre"
                        variant="outlined"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        disabled={loading}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        id="tempo"
                        label="Tempo"
                        name="tempo"
                        type="number"
                        variant="outlined"
                        value={tempo}
                        onChange={(e) => setTempo(e.target.value)}
                        disabled={loading}
                    />
                </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={loading}>
                {loading ? <CircularProgress size={24}/> : 'Create Project'}
            </Button>
            {error && <Alert severity="error">{error}</Alert>}
        </Box>);
}

const mapStateToProps = (state) => ({
    loading: state.project.loading,
    error: state.project.error,
});

const mapDispatchToProps = {
    createProject,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateProjectForm);