import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, List, ListItem, ListItemText, CircularProgress, Alert, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { fetchProjectRecommendations } from '../redux/actions/recommendationActions';

function RecommendedProjects() {
    const dispatch = useDispatch();
    const { projectRecs, projectRecsLoading, projectRecsError } = useSelector((state) => state.recommendations);

    useEffect(() => {
        dispatch(fetchProjectRecommendations()); // Fetch on mount
    }, [dispatch]);

    if (projectRecsLoading) {
        return <CircularProgress size={20} />;
    }

    if (projectRecsError) {
        return <Alert severity="warning" variant="outlined" sx={{ mt: 1 }}>Could not load project recommendations.</Alert>;
    }

    if (!projectRecs || projectRecs.length === 0) {
        return null; // Don't render anything if no recommendations
    }

    return (
        <Paper elevation={1} sx={{ p: 2, mt: 3 }}>
            <Typography variant="h6" gutterBottom>Recommended Projects</Typography>
            <List dense>
                {projectRecs.map((project) => (
                    <ListItem key={project.id} button component={Link} to={`/projects/${project.id}`} divider>
                        <ListItemText
                            primary={project.title}
                            secondary={project.reason || `Owned by ${project.ownerUsername}`}
                        />
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
}

export default RecommendedProjects;