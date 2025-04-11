import React, { useState, useEffect, useCallback } from 'react';
import {
    Box, Typography, Paper, List, ListItem, ListItemText, Button, Divider,
    TextField, CircularProgress, Alert, Chip, Avatar // Added Chip, Avatar
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { connect, useDispatch, useSelector } from 'react-redux';
import AddIcon from '@mui/icons-material/Add'; // For Create Track button
import EditIcon from '@mui/icons-material/Edit'; // For Edit Project button
import SaveIcon from '@mui/icons-material/Save'; // For Save Version button

// --- Import Redux Actions ---
import { updateProject, saveNewVersion } from '../redux/actions/projectActions'; // Assuming saveNewVersion exists
import { getAllTracks } from '../redux/actions/trackActions'; // Action to get tracks for this project
import { getAllComments, createComment } from '../redux/actions/commentActions'; // Actions for comments

// --- Import Child Components ---
import VersionHistoryList from './VersionHistoryList';

// Receive the main 'project' object as a prop from ProjectPage
function ProjectView({
    project,
    // Props from connect/Redux for related data
    tracks,
    comments,
    isTracksLoading,
    tracksError,
    isCommentsLoading,
    commentsError,
    isCreatingComment,
    createCommentError,
    isSavingVersion,
    saveVersionError,
    // Action dispatchers from connect
    getAllTracks,
    getAllComments,
    createComment,
    saveNewVersion
}) {
    const navigate = useNavigate();
    const dispatch = useDispatch(); // Use dispatch directly for some actions if preferred
    const [newCommentText, setNewCommentText] = useState('');
    const currentUser = useSelector(state => state.user.user); // Get current user for comments etc.

    // Fetch related data (tracks, comments) when the project prop is available
    useEffect(() => {
        if (project && project.id) {
            getAllTracks(project.id); // Fetch tracks for this specific project
            getAllComments(project.id); // Fetch comments for this specific project
        }
    }, [project, getAllTracks, getAllComments]); // Re-run if project changes

    const handleCreateComment = useCallback(async () => {
        if (!newCommentText.trim() || !project || !currentUser) return;

        const commentData = {
            text: newCommentText,
            // Backend service will link project and user based on path/auth
        };

        // Dispatch createComment action
        const success = await createComment(project.id, commentData);
        if (success) {
            setNewCommentText(''); // Clear input on success
            // Comments list should update via Redux state change triggered by createCommentSuccess
        }
        // Error state (createCommentError) will be updated by Redux if it fails
    }, [newCommentText, project, currentUser, createComment]);

    const handleSaveVersion = useCallback(() => {
        if (!project) return;
        // Prompt for description or use a default? For simplicity, using default.
        const description = `Manual save by ${currentUser?.username || 'user'}`;
        saveNewVersion(project.id, description); // Dispatch the save version action
    }, [project, currentUser, saveNewVersion]);


    // --- Render Logic ---

    if (!project) {
        return <Typography sx={{ mt: 4 }}>Project data not available.</Typography>;
    }

    return (
        <Box sx={{ mt: 2, mb: 4 }}>
            {/* Project Header */}
            <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box>
                        <Typography variant="h4" component="h1" gutterBottom>
                            {project.title}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" paragraph>
                            {project.description || 'No description provided.'}
                        </Typography>
                    </Box>
                    <Button
                        component={Link}
                        to={`/projects/${project.id}/edit`}
                        variant="outlined"
                        size="small"
                        startIcon={<EditIcon />}
                    >
                        Edit Project
                    </Button>
                </Box>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    <Chip label={`Genre: ${project.genre || 'N/A'}`} size="small" />
                    <Chip label={`Tempo: ${project.tempo || 'N/A'} BPM`} size="small" />
                    <Chip
                        avatar={<Avatar sx={{ width: 24, height: 24 }}>{project.owner?.username?.charAt(0).toUpperCase() || '?'}</Avatar>}
                        label={`Owner: ${project.owner?.username || 'Unknown'}`}
                        size="small"
                        variant="outlined"
                    />
                    {/* Add Collaborators display here later */}
                </Box>
            </Paper>

            {/* Tracks Section */}
            <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="h6">Tracks</Typography>
                    <Button
                        // component={Link}
                        // to={`/projects/${project.id}/tracks/new`} // Or open a modal
                        variant="contained"
                        size="small"
                        startIcon={<AddIcon />}
                        // onClick={() => { /* TODO: Implement track creation trigger */ }}
                        disabled // Disable until implemented
                    >
                        Add Track
                    </Button>
                </Box>
                <Divider sx={{ mb: 2 }} />
                {isTracksLoading && <CircularProgress size={24} />}
                {tracksError && <Alert severity="error">Error loading tracks: {tracksError}</Alert>}
                {!isTracksLoading && !tracksError && tracks && tracks.length > 0 ? (
                    <List dense>
                        {tracks.map(track => (
                            <ListItem
                                key={track.id}
                                button
                                component={Link}
                                to={`/projects/${project.id}/tracks/${track.id}`} // Link to TrackEditor
                                divider
                            >
                                <ListItemText
                                    primary={track.instrument || `Track ${track.id}`}
                                    // secondary={`Last updated: ${formatDistanceToNow(new Date(track.updatedAt))} ago`} // Example using date-fns
                                />
                                {/* Add play button or other track actions here? */}
                            </ListItem>
                        ))}
                    </List>
                ) : (
                    !isTracksLoading && !tracksError && <Typography variant="body2">No tracks yet.</Typography>
                )}
            </Paper>

            {/* Comments Section */}
            <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
                <Typography variant="h6" gutterBottom>Comments</Typography>
                <Divider sx={{ mb: 2 }} />
                {isCommentsLoading && <CircularProgress size={24} />}
                {commentsError && <Alert severity="error">Error loading comments: {commentsError}</Alert>}
                 {/* Comment List */}
                 {!isCommentsLoading && !commentsError && comments && comments.length > 0 ? (
                     <List dense sx={{ maxHeight: 300, overflowY: 'auto', mb: 2 }}>
                         {comments.map(comment => (
                             <ListItem key={comment.id} alignItems="flex-start" divider>
                                <ListItemText
                                     primary={comment.text}
                                     secondary={`— ${comment.user?.username || 'Unknown User'} on ${new Date(comment.timestamp).toLocaleDateString()}`} // Basic date formatting
                                 />
                                {/* Add delete button if user is owner/admin */}
                             </ListItem>
                         ))}
                     </List>
                 ) : (
                    !isCommentsLoading && !commentsError && <Typography variant="body2" sx={{ mb: 2 }}>No comments yet.</Typography>
                 )}

                {/* Add Comment Form */}
                <Box component="form" onSubmit={(e) => { e.preventDefault(); handleCreateComment(); }} sx={{ display: 'flex', gap: 1 }}>
                    <TextField
                        fullWidth
                        size="small"
                        label="Add a comment..."
                        value={newCommentText}
                        onChange={(e) => setNewCommentText(e.target.value)}
                        disabled={isCreatingComment}
                        multiline
                        maxRows={3}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        size="small"
                        disabled={!newCommentText.trim() || isCreatingComment}
                    >
                        {isCreatingComment ? <CircularProgress size={20} /> : 'Post'}
                    </Button>
                </Box>
                 {createCommentError && <Alert severity="error" sx={{ mt: 1 }}>{createCommentError}</Alert>}
            </Paper>

             {/* Version History Section */}
             <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                     <Typography variant="h6">History</Typography>
                     <Button
                         variant="contained"
                         size="small"
                         startIcon={<SaveIcon />}
                         onClick={handleSaveVersion}
                         disabled={isSavingVersion}
                     >
                          {isSavingVersion ? <CircularProgress size={20} /> : 'Save Current Version'}
                     </Button>
                 </Box>
                 {saveVersionError && <Alert severity="error" sx={{ mb: 1 }}>{saveVersionError}</Alert>}
                 <Divider sx={{ mb: 2 }} />
                 <VersionHistoryList projectId={project.id} />
             </Paper>

        </Box>
    );
}

// Map relevant parts of Redux state to props
const mapStateToProps = (state) => ({
    tracks: state.track.tracks, 
    comments: state.comment.comments, 
    isTracksLoading: state.track.loading,
    tracksError: state.track.error,
    isCommentsLoading: state.comment.loading,
    commentsError: state.comment.error,
    isCreatingComment: state.comment.loading, 
    createCommentError: state.comment.error, 
    isSavingVersion: state.project.loading, 
    saveVersionError: state.project.error, 
});

const mapDispatchToProps = {
    getAllTracks,
    getAllComments,
    createComment,
    saveNewVersion,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectView);