import React, { useState, useEffect } from 'react';
import { Typography, Box, Button, CircularProgress, TextField } from '@mui/material';
import { connect } from 'react-redux';
import MusicNotation from './MusicNotation';
import { getTrack, updateTrack } from '../redux/actions/trackActions';
import { useParams, useNavigate } from 'react-router-dom';

function TrackEditor({track, loading, error, getTrack, updateTrack}) {
    const {projectId, trackId} = {id1:1,id2:2};
    // const navigate = useNavigate();
    const [musicalSequence, setMusicalSequence] = useState(track?.musicalSequence);
        // eg. '[{"keys":["c/4", "e/4", "g/4"],"duration":"q"}, { "keys": ["d/4"], "duration": "q" },{ "keys": ["b/3"], "duration": "qr" },{ "keys": ["c/4", "f/4"], "duration": "8" },{ "keys": ["d/4"], "duration": "8" }]'

    useEffect(() => {
        if (trackId && projectId)
            getTrack(projectId, trackId);
    }, [projectId, trackId, getTrack]);

    useEffect(() => {
        if (track)
            setMusicalSequence(track.musicalSequence || '');
    }, [track]);

    const handleSequenceChange = (e) => {
        setMusicalSequence(musicalSequence+e);
    }

    const handleSave = async () => {
        if (!track) return;
        const trackData = {
            musicalSequence,
        };
        const success = await updateTrack(projectId, trackId, trackData);
        // if (success)
        //     navigate(`/projects/${projectId}`);
    }

    if (loading) {
        return (
            <Box sx={{display: 'flex', justifyContent: 'center', mt: 4}}>
                <CircularProgress />
            </Box>);
    }

    if (error) {
        return (
            <Box sx={{color: 'red', mt: 4}}>
                <Typography variant="body1" component="p" color="error">Error: {error}</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>Track Editor</Typography>
            <MusicNotation musicData={musicalSequence} onMusicDataChange={handleSequenceChange} />
            <TextField
                multiline
                fullWidth
                rows={4}
                label="Musical Sequence"
                value={musicalSequence}
                onChange={handleSequenceChange}

                id="musicalSequence"
                name="musicalSequence"
                variant="outlined"
                disabled={loading}
            />
            <Button variant="contained" color="primary" onClick={handleSave}>Save</Button>
        </Box>
    );
}

const mapStateToProps = (state) => ({
    track: state.track.track,
    loading: state.track.loading,
    error: state.track.error,
});

const mapDispatchToProps = {
    getTrack,
    updateTrack,
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackEditor);