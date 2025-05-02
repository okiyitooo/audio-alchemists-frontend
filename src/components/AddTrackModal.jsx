import React, { useState } from 'react';
import {
    Button, Dialog, DialogActions, DialogContent, DialogContentText,
    DialogTitle, TextField, Box, CircularProgress, Alert
} from '@mui/material';
import { connect } from 'react-redux';
import { createTrack } from '../redux/actions/trackActions'; // Import the createTrack action

function AddTrackModal({
    open,
    onClose,
    projectId,
    // Redux props
    createTrack,
    isCreatingTrack,
    createTrackError
}) {
    const [instrumentName, setInstrumentName] = useState('');

    const handleCreate = async () => {
        if (!instrumentName.trim()) {
            // Basic validation - could add more sophisticated checks
            alert("Please enter an instrument name.");
            return;
        }

        const trackData = {
            instrument: instrumentName,
            musicalSequence: '[]', // Start with an empty sequence (JSON array string)
            // Backend should associate with projectId based on the URL
        };

        const success = await createTrack(projectId, trackData);

        if (success) {
            handleClose(); // Close modal on successful creation
        }
        // Error state (createTrackError) is managed by Redux and can be displayed
    };

    const handleClose = () => {
        setInstrumentName(''); // Reset form field on close
        onClose(); // Call the parent's close handler
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
            <DialogTitle>Add New Track</DialogTitle>
            <DialogContent>
                {createTrackError && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        Error creating track: {createTrackError}
                    </Alert>
                )}
                <DialogContentText sx={{ mb: 2 }}>
                    Enter the name of the instrument for this track.
                </DialogContentText>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="instrument"
                    label="Instrument Name"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={instrumentName}
                    onChange={(e) => setInstrumentName(e.target.value)}
                    disabled={isCreatingTrack}
                />
            </DialogContent>
            <DialogActions sx={{ p: '16px 24px' }}>
                <Button onClick={handleClose} disabled={isCreatingTrack} color="secondary">
                    Cancel
                </Button>
                <Button
                    onClick={handleCreate}
                    variant="contained"
                    disabled={isCreatingTrack || !instrumentName.trim()}
                >
                    {isCreatingTrack ? <CircularProgress size={24} color="inherit" /> : 'Create Track'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

// Map relevant Redux state to props
const mapStateToProps = (state) => ({
    // Assuming track reducer has specific state for creation loading/error
    // If not, you might reuse state.track.loading/error, but dedicated state is cleaner
    isCreatingTrack: state.track.loading, // Or a specific 'isCreating' flag
    createTrackError: state.track.error, // Or a specific 'createError' flag
});

// Map createTrack action dispatcher to props
const mapDispatchToProps = {
    createTrack,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTrackModal);