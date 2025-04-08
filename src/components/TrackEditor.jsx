import React, { useState, useEffect, useCallback, } from 'react';
import { Typography, Box, Button, CircularProgress, TextField, FormControl, InputLabel, Select, MenuItem, Paper, Grid, Stack } from '@mui/material';
import { connect, useDispatch, useSelector } from 'react-redux';
import MusicNotation from './MusicNotation';
import { getTrack, updateTrack, updateMusicData } from '../redux/actions/trackActions';
import { useParams, useNavigate } from 'react-router-dom';

function TrackEditor({track: trackFromProps, musicData, getTrack, updateTrack, updateMusicData}) {
    const {projectId, trackId} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const loading = useSelector(state => state.track.loading);
    const error = useSelector(state => state.track.error);
    const track = trackFromProps

    const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);
    const [newKey, setNewKey] = useState('');
    const [newDuration, setNewDuration] = useState('q');

    const [keyToAdd, setKeyToAdd] = useState('c/4');
    const [durationToAdd, setDurationToAdd] = useState('q');

    const [clef, setClef] = useState('treble');
    const [timeSignature, setTimeSignature] = useState('4/4');
        // eg. '[{"keys":["c/4", "e/4", "g/4"],"duration":"q"}, { "keys": ["d/4"], "duration": "q" },{ "keys": ["b/3"], "duration": "qr" },{ "keys": ["c/4", "f/4"], "duration": "8" },{ "keys": ["d/4"], "duration": "8" }]'

    useEffect(() => {
        if (trackId && projectId)
            getTrack(projectId, trackId)
    }, [projectId, trackId, getTrack]);

    useEffect(() => {
        if (track && track.musicalSequence && track.musicalSequence !== musicData) {
            updateMusicData(track.musicalSequence)
            setSelectedNoteIndex(null)
            setNewKey('');
            setNewDuration('q');
        }
        else if (track && !track.musicalSequence && !musicData)
            updateMusicData('[]')
    }, [track, musicData, updateMusicData]);

    const handleMusicDataChange = useCallback((newMusicData) => {
        dispatch(updateMusicData(JSON.stringify(newMusicData)));
    }, [dispatch, updateMusicData]);

    const handleNoteClick = useCallback((noteIndex) => {
        setSelectedNoteIndex(prevIndex => prevIndex === noteIndex ? null : noteIndex);
        // prefill edit fields if a note is selected
        if (noteIndex !== null) {
            try {
                const note = JSON.parse(musicData || '[]')[noteIndex];
                if (!note) return;
                setNewKey(note.keys.join(','));
                setNewDuration(note.duration);
            } catch (error) {
                console.error("Error parsing music data:", error);
            }
        } else {
            setNewKey('');
            setNewDuration('q');
        }
    }, [musicData]);

    const addNote = useCallback((key, duration) => {
        if (!key || !duration) return;
        try {
            const currentNotes = JSON.parse(musicData || '[]');
            const newNote = {keys: [key.split(',').map(k => k.trim())], duration};
            const newNotesData = [ ...currentNotes, newNote];
            handleMusicDataChange(newNotesData);
        } catch (error) {
            console.error("Error parsing music data:", error);
        }
    }, [musicData, handleMusicDataChange]);

    const removeNote = useCallback(() => {
        if (selectedNoteIndex === null) return;
        try {
            const currentNotes = JSON.parse(musicData || '[]');
            if (selectedNoteIndex < 0 || selectedNoteIndex >= currentNotes.length) return;
            const newNotesData = currentNotes.filter((_, index) => index !== selectedNoteIndex);
            handleMusicDataChange(newNotesData);
            setSelectedNoteIndex(null);
            setNewKey('');
            setNewDuration('q');
        } catch (error) {
            console.error("Error parsing music data:", error);
        }
    }, [selectedNoteIndex, musicData, handleMusicDataChange]);
    const handleUpdateNote = useCallback(() => {
        if (selectedNoteIndex === null || !newKey|| !newDuration) return;
        try {
            const currentNotes = JSON.parse(musicData || '[]');
            if (selectedNoteIndex < 0 || selectedNoteIndex >= currentNotes.length) return;
            const updatedNote = {keys: newKey.split(',').map(k => k.trim()), duration: newDuration}; // || { keys: [newKey], duration: newDuration }
            const newNotesData = currentNotes.map((note, index) => 
                index === selectedNoteIndex ? 
                updatedNote : 
                note);
            handleMusicDataChange(newNotesData);
            // setSelectedNoteIndex(null);
            // setNewKey('');
            // setNewDuration('q');
        } catch (error) {
            console.error("Error parsing music data:", error);
        }

    }, [selectedNoteIndex, newKey, newDuration, musicData, handleMusicDataChange]);
    
    const handleSave = () => {
        if (!track || !musicData) return;
        updateTrack(projectId, trackId, {
            musicalSequence: musicData,
        });
        navigate(`/projects/${projectId}`);
    }

    const handleTimeSignatureChange = (event) => {
        setTimeSignature(event.target.value);
    }

    const handleClefChange = (event) => {
        setClef(event.target.value);
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
            <Paper elevation={3} sx = {{p: 2, mb: 3}} >
                <MusicNotation musicData={musicData} 
                    onMusicDataChange={handleMusicDataChange} 
                    clef={clef} 
                    timeSignature={timeSignature} 
                    selectedNoteIndex={selectedNoteIndex} 
                    onNoteClick={handleNoteClick} 
                />
            </Paper>
                {/* Controls section */}
            <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid xs={12} md={4}>
                    <Paper elevation={1} sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>Settings</Typography>
                        <Stack spacing={2}>
                            <FormControl size='small'> 
                                <InputLabel id="clef-select-label">Clef</InputLabel>
                                <Select
                                    labelId="clef-select-label"
                                    value={clef}
                                    id="clef-select"
                                    onChange={handleClefChange}
                                    label="Clef"
                                >
                                    <MenuItem value="treble">Treble</MenuItem>
                                    <MenuItem value="bass">Bass</MenuItem>
                                    <MenuItem value="alto">Alto</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl size='small'> 
                                <InputLabel id="time-sig-select-label">Time Signature</InputLabel>
                                <Select
                                    labelId="time-sig-select-label"
                                    id="time-sig-select"
                                    value={timeSignature}
                                    label="Time Signature"
                                    onChange={handleTimeSignatureChange}>
                                    <MenuItem value="4/4">4/4</MenuItem>
                                    <MenuItem value="3/4">3/4</MenuItem>
                                    <MenuItem value="5/4">5/4</MenuItem>
                                    <MenuItem value="6/8">6/8</MenuItem>
                                    <MenuItem value="7/8">7/8</MenuItem>
                                    <MenuItem value="9/8">9/8</MenuItem>
                                    <MenuItem value="12/8">12/8</MenuItem>
                                    <MenuItem value="2/4">2/4</MenuItem>
                                    <MenuItem value="3/8">3/8</MenuItem>
                                    <MenuItem value="6/4">6/4</MenuItem>
                                    <MenuItem value="8/4">8/4</MenuItem>
                                    <MenuItem value="12/4">12/4</MenuItem>                                                                                                                                                                                                                  
                                </Select>
                            </FormControl>
                        </Stack>
                    </Paper>
                </Grid>
                <Grid xs={12} md={4}>
                    <Paper elevation={1} sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom >Add note</Typography>
                        <Stack spacing={2}>
                            <TextField sx={{mr: 1}} size='small' label="Key (e.g. c/4, f#5)" value={keyToAdd} onChange={(e) => setKeyToAdd(e.target.value)} />
                            <FormControl fullWidth size='small'>
                                 <InputLabel id="duration-add-label">Duration</InputLabel>
                                 <Select
                                    labelId="duration-add-label"
                                    value={durationToAdd}
                                    label="Duration"
                                    onChange={(e) => setDurationToAdd(e.target.value)}
                                 >
                                     <MenuItem value="w">Whole</MenuItem>
                                     <MenuItem value="h">Half</MenuItem>
                                     <MenuItem value="q">Quarter</MenuItem>
                                     <MenuItem value="8">8th</MenuItem>
                                     <MenuItem value="16">16th</MenuItem>
                                     <MenuItem value="32">32nd</MenuItem>
                                     <MenuItem value="64">64th</MenuItem>
                                     <MenuItem value="wr">Whole Rest</MenuItem>
                                     <MenuItem value="hr">Half Rest</MenuItem>
                                     <MenuItem value="qr">Quarter Rest</MenuItem>
                                     <MenuItem value="8r">8th Rest</MenuItem>
                                      {/* Add dotted options if needed*/}
                                 </Select>
                            </FormControl>
                            <Button variant="contained" onClick={() => addNote(keyToAdd, durationToAdd)}>Add Note</Button>
                        </Stack>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper elevation={1} sx={{ p: 2, mt: 2 }}>
                        <Typography variant="h6" gutterBottom>Edit/Remove</Typography>
                        <Stack spacing={2}>
                            <Button variant='outlined' color="error" onClick={removeNote} disabled={selectedNoteIndex === null}>Remove Note</Button>
                            {/* Edit note section */}
                            { selectedNoteIndex !== null && (
                                <Box sx={{mt: '2', p: 2, border: '1px solid lightgray', borderRadius: '1'}}>
                                    <Typography variant="subtitle1" >Edit Note {selectedNoteIndex + 1}</Typography>
                                    <TextField fullwidth sx={{mr: 1}} size='small' label="Key" value={newKey} onChange={(e) => setNewKey(e.target.value)} />
                                    <InputLabel id="duration-edit-label">Duration</InputLabel>
                                    <FormControl fullWidth size='small' sx={{ mb: 2 }}>
                                        <Select
                                            labelId="duration-edit-label"
                                            value={newDuration}
                                            label="Duration"
                                            onChange={(e) => setNewDuration(e.target.value)}
                                        >
                                            <MenuItem value="w">Whole</MenuItem>
                                            <MenuItem value="h">Half</MenuItem>
                                            <MenuItem value="q">Quarter</MenuItem>
                                            <MenuItem value="8">8th</MenuItem>
                                            <MenuItem value="16">16th</MenuItem>
                                            <MenuItem value="32">32nd</MenuItem>
                                            <MenuItem value="64">64th</MenuItem>
                                            <MenuItem value="wr">Whole Rest</MenuItem>
                                            <MenuItem value="hr">Half Rest</MenuItem>
                                            <MenuItem value="qr">Quarter Rest</MenuItem>
                                            <MenuItem value="8r">8th Rest</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <Button variant="contained" size= 'small' onClick={handleUpdateNote}>Update Note</Button>
                                </Box>
                            )}
                        </Stack>
                    </Paper>
                </Grid>
            </Grid>
            {/* Save button */}
            <Button variant="contained" color="primary" onClick={handleSave} sx={{ mt: 3}} disabled={loading}>{loading ? <CircularProgress size = {24}/> : 'Save'}</Button>
            {loading ? <CircularProgress size={24} color="inherit"/> : 'Save Track'}
            <Button variant="contained" color="primary" onClick={handleSave}>Save</Button>
        </Box>
    );
}

const mapStateToProps = (state) => ({
    track: state.track.track,
    musicData: state.track.musicData,
});

const mapDispatchToProps = {
    getTrack,
    updateTrack,
    updateMusicData,
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackEditor);