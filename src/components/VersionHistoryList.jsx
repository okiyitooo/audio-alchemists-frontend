import React, { useEffect, useState } from 'react';
import {
    Box, Typography, List, ListItem, ListItemText, Button, CircularProgress, Alert,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import { connect } from 'react-redux';
import { getProjectVersions, revertToVersion } from '../redux/actions/projectActions';
import { format } from 'date-fns'; // For formatting timestamps

function VersionHistoryList({
    projectId,
    versions,
    loading,
    reverting,
    versionError,
    revertError,
    getProjectVersions,
    revertToVersion
}) {
    const [revertConfirmOpen, setRevertConfirmOpen] = useState(false);
    const [versionToRevert, setVersionToRevert] = useState(null); // Store { id, timestamp }

    useEffect(() => {
        if (projectId) {
            getProjectVersions(projectId);
        }
    }, [projectId, getProjectVersions]);

    const handleRevertClick = (version) => {
        setVersionToRevert(version);
        setRevertConfirmOpen(true);
    };

    const handleCloseConfirm = () => {
        setRevertConfirmOpen(false);
        setVersionToRevert(null);
    };

    const handleConfirmRevert = async () => {
        if (versionToRevert && projectId) {
            await revertToVersion(projectId, versionToRevert.id);
            // Versions might refresh automatically if getProject triggers a state update
            getProjectVersions(projectId); // explicitly refresh
            handleCloseConfirm(); // Close dialog regardless of success/fail (error shown via state)
        }
    };

    const formatDate = (dateString) => {
        try {
            return format(new Date(dateString), 'Pp'); // e.g., 09/14/2023, 3:30:00 PM
        } catch {
            return 'Invalid Date';
        }
    };

    if (loading) {
        return <CircularProgress size={20} />;
    }

    if (versionError) {
        return <Alert severity="error">Error loading versions: {versionError}</Alert>;
    }

    return (
        <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>Version History</Typography>
            {revertError && <Alert severity="error" sx={{ mb: 2 }}>Revert failed: {revertError}</Alert>}
            {versions && versions.length > 0 ? (
                <List dense>
                    {versions.map((version, index) => (
                        <ListItem
                            key={version.id}
                            divider
                            secondaryAction={
                                // Don't allow reverting to the very latest version (index 0 because sorted desc)
                                index > 0 && (
                                    <Button
                                        size="small"
                                        onClick={() => handleRevertClick(version)}
                                        disabled={reverting} // Disable while a revert is in progress
                                    >
                                        {reverting && versionToRevert?.id === version.id ? <CircularProgress size={16} /> : 'Revert'}
                                    </Button>
                                )
                            }
                        >
                            <ListItemText
                                primary={`${formatDate(version.timestamp)} ${version.description ? `- ${version.description}` : ''}`}
                                secondary={`Saved by: ${version.savedByUsername || 'Unknown'}`}
                            />
                        </ListItem>
                    ))}
                </List>
            ) : (
                <Typography variant="body2">No version history found.</Typography>
            )}

            {/* Revert Confirmation Dialog */}
            <Dialog
                open={revertConfirmOpen}
                onClose={handleCloseConfirm}
            >
                <DialogTitle>Confirm Revert</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to revert the project to the version saved at{' '}
                        <strong>{versionToRevert ? formatDate(versionToRevert.timestamp) : ''}</strong>?
                        Any changes made after this version will be lost.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseConfirm} disabled={reverting}>Cancel</Button>
                    <Button onClick={handleConfirmRevert} color="error" disabled={reverting} autoFocus>
                        {reverting ? <CircularProgress size={20} /> : 'Revert'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

const mapStateToProps = (state) => ({
    versions: state.project.versions,
    loading: state.project.loading, 
    reverting: state.project.reverting,
    versionError: state.project.versionError,
    revertError: state.project.revertError,
});

const mapDispatchToProps = {
    getProjectVersions,
    revertToVersion,
};

export default connect(mapStateToProps, mapDispatchToProps)(VersionHistoryList);