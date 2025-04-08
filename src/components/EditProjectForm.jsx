import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Box, CircularProgress } from '@mui/material';
import { connect } from 'react-redux';
import { updateProject } from '../redux/actions/projectActions';
import { useNavigate } from 'react-router-dom';

function EditProjectForm({ project, updateProject, loading, error }) {
    const [title, setTitle] = useState(project?.title || '');
    const [description, setDescription] = useState(project?.description || '');
    const [genre, setGenre] = useState(project?.genre || '');
    const [tempo, setTempo] = useState(project?.tempo || '');
    const navigate = useNavigate();

    useEffect(() => {
        setTitle(project?.title || '');
        setDescription(project?.description || '');
        setGenre(project?.genre || '');
        setTempo(project?.tempo || '');
    }, [project]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const projectData = {
            title,
            description,
            genre,
            tempo: parseInt(tempo),
        };
        const success = await updateProject(project.id, projectData);
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
                        fullWidth
                        id="description"
                        label="Description"
                        name="description"
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
                        variant="outlined"
                        value={tempo}
                        onChange={(e) => setTempo(e.target.value)}
                        disabled={loading}
                    />
                </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={loading}>
                {loading ? <CircularProgress size={24} /> : 'Update Project'}
            </Button>
        </Box>
    );
}

const mapStateToProps = (state) => ({
    loading: state.project.loading,
    error: state.project.error,
});

const mapDispatchToProps = {
    updateProject,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProjectForm);