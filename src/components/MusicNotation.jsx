import { keys } from '@mui/system';
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Vex, Factory } from 'vexflow';
import './css/MusicNotation.css';

function MusicNotation({musicData, onMusicDataChange}) {
    const staveDiv = useRef(null);
    const [selectedNote, setSelectedNote] = useState(null);
    const [notesData, setNotesData] = useState(()=>{
        try {
            return musicData ? JSON.parse(musicData):
            [
                { keys: ["c/4", "e/4", "g/4"], duration: "q" },
                { keys: ["d/4"], duration: "q" },
                { keys: ["b/3"], duration: "q" },
                { keys: ["c/4", "f/4"], duration: "8" },
                { keys: ["d/4"], duration: "8" },
                { keys: ["e/4"], duration: "8" },
                { keys: ["f/4"], duration: "8" },
                { keys: ["g/4"], duration: "8" },
            ];
        } catch (error) {
            console.error('Error parsing music data:', error);
            return [];
        }
    });
    const VF = Vex.Flow;

    const addNote = useCallback((key, duration) => {
        const newNote = { keys: [key], duration };
        setNotesData(prevNotesData => {
            const newNotes = [...prevNotesData, newNote];
            onMusicDataChange(JSON.stringify(newNotes));
            return newNotes;
        })
        setSelectedNote(null);
    }, [notesData, onMusicDataChange]);

    const removeNote = useCallback((index) => {
        setNotesData(prevNotesData => {
            const newNotes = prevNotesData.filter((_, i) => i !== index);
            onMusicDataChange(JSON.stringify(newNotes));
            return newNotes;
        });
        setSelectedNote(null);
    }, [notesData, onMusicDataChange]);

    useEffect(() => {
        if (!staveDiv.current) return;


        // clear existing notation
        staveDiv.current.innerHTML = '';

        // Create an SVG renderer and attach it to the DIV element
        const renderer = new VF.Renderer(staveDiv.current, VF.Renderer.Backends.SVG);
        
        // Configure the rendering context.
        const context = renderer.getContext();

        // group notes into voices
        const voices = [];
        let currentVoice = new VF.Voice({num_beats: 4, beat_value: 4}).setMode(VF.Voice.Mode.FULL);
        let currentTicks = 0;
        notesData.forEach((noteInfo, index) => {
            const note = new VF.StaveNote({
                clef: 'treble',
                keys: noteInfo.keys,
                duration: noteInfo.duration,
            });
            note.setAttribute('id', index+'');
            note.setAttribute('tabindex', index+'');
            note.setAttribute('style', 'cursor: pointer');
            // if duration is too long for current voice, create a new voice
            const ticks = note.getTicks().value();
            if (currentTicks + ticks <= 4096 * 4) {
                currentVoice.addTickable(note);
                currentTicks += ticks;
            } else {
                voices.push(currentVoice);
                currentVoice = new VF.Voice({num_beats: 4, beat_value: 4}).setMode(VF.Voice.Mode.FULL);
                currentVoice.addTickable(note);
                currentTicks = ticks;
            }
        });
        voices.push(currentVoice);

        // one stave per voice
        const staveWidth = 500;
        const staveHeight = 100;
        const numStaves = voices.length;
        const staveSpacing = 10;
        const staveHeightWithSpacing = staveHeight + staveSpacing;
        const totalHeight = numStaves * staveHeightWithSpacing;
        const staves = voices.map((voice, i) => {
            const stave = new VF.Stave(20, staveHeightWithSpacing * i, staveWidth);
            stave.setClef('treble').setTimeSignature('4/4');
            stave.setContext(context).draw();
            voice.setStave(stave);
            return stave
        });

        const singleLeftConnector = new VF.StaveConnector(staves[0], staves[staves.length - 1])
            .setType(VF.StaveConnector.type.SINGLE_LEFT)
            .setContext(context)
            .draw();

        const braceConnector = new VF.StaveConnector(staves[0], staves[staves.length - 1])
            .setType(VF.StaveConnector.type.BRACE)
            .setContext(context)
            .draw();

        
        // Resize the renderer to fit the staves
        renderer.resize(600, totalHeight);

        // Format and justify the notes to 500 pixels
        const formatter = new VF.Formatter().joinVoices(voices).format(voices, staveWidth);

        // Render voices
        voices.forEach(voice => voice.draw(context, staves[voices.indexOf(voice)]));

        if (staveDiv.current){
            console.log('Adding click event listener');
            const svgElement = staveDiv.current.querySelector('svg');
            svgElement.setAttribute('overflow', 'scroll');
            svgElement.setAttribute('height', totalHeight);
            console.log('SVG Element:', svgElement);
            if (!svgElement) return;
            svgElement.onclick = (e) => {
                let target = e.target;
                // get parent element of target while classname is not vf-stavenote
                while (target && !target.classList?.contains('vf-stavenote')) {
                    target = target.parentElement;
                }
                console.log('Target:', target);
                if (target?.classList?.contains('vf-stavenote')) {
                    const noteIndex = parseInt(target.getAttribute('id').split('-')[1]);
                    // set target as the focused element
                    target.focus();
                    console.log(target)
                    setSelectedNote(noteIndex);
                }
            };
        }

        // basic ui for adding notes
        const addButton = document.createElement('button');
        addButton.innerText = 'Add C4 Quarter ';
        addButton.onclick = () => addNote('c/4', '8');

        const removeButton = document.createElement('button');
        removeButton.innerText = 'Remove Note';
        removeButton.onclick = () => {
            if (selectedNote !== null) {
                removeNote(selectedNote);
            }
        };

        staveDiv.current.appendChild(addButton);
        staveDiv.current.appendChild(removeButton);
        
    }, [musicData, onMusicDataChange, selectedNote]);

    return (
        <div id="stave-container" style={{'overflow': 'scroll'}}>
            <div ref={staveDiv}></div>
        </div>
    );
}

export default MusicNotation;