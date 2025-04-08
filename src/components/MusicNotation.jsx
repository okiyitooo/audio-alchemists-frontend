import React, { useRef, useEffect } from 'react';
import Vex from 'vexflow';
import './css/MusicNotation.css';

function MusicNotation({musicData, clef, timeSignature, selectedNoteIndex, onNoteClick}) {
    const staveDiv = useRef(null);
    const VF = Vex.Flow;

    useEffect(() => {
        if (!staveDiv.current || musicData === null) return;

        let notesData = [];
        try {
            notesData = JSON.parse(musicData);
            if (!Array.isArray(notesData)) {
                throw new Error("Music data is not an array");
            }
        } catch (error) {
            console.error("Error parsing music data:", error);
            return;
        }

        staveDiv.current.innerHTML = ''; // Clear previous content
        const renderer = new VF.Renderer(staveDiv.current, VF.Renderer.Backends.SVG);
        renderer.resize(600, 200);
        const context = renderer.getContext();
        context.setFont("Arial", 10).setBackgroundFillStyle("#eed");

        const stave = new VF.Stave(10, 40, 580);
        stave.addClef(clef).addTimeSignature(timeSignature).setContext(context).draw();

        const notes = notesData.length > 0 ? notesData.map((noteInfo, index) => {
            try {
                const staveNote = new VF.StaveNote(noteInfo);
                staveNote.setAttribute('id', `vf-note-${index}`);
                staveNote.setAttribute('data-index', index);
                staveNote.setAttribute('class', 'vf-stavenote');
                if (selectedNoteIndex === index) {
                    staveNote.setAttribute('class', 'vf-stavenote selected');
                }
                staveNote.setContext(context).draw();
                return staveNote;
            } catch(noteError) {
                console.error("Error creating note at index:", index, noteInfo, noteError);
                return null;
            }
        }).filter(note => note !== null) : [];

        if (notes.length === 0) return; // No valid notes to draw
        const voice = new VF.Voice({ num_beats: parseInt(timeSignature.split('/')[0]),  beat_value: parseInt(timeSignature.split('/')[1]) });
        voice.addTickables(notes);
        voice.setStrict(false);
        try {
            new VF.Formatter().joinVoices([voice]).format([voice], 500);
        }   catch (error) {
            console.error("VexFlow Formatter Error:", error);
        }
        voice.draw(context, stave);

        const svgElement = staveDiv.current.querySelector('svg');
        if (svgElement) {
            const clickHandler = (event) => {
                let target = event.target;
                while (target && !target.classList.contains('vf-stavenote')) {
                    target = target.parentElement;
                }
                if (target) {
                    const index = parseInt(target.getAttribute('data-index'));
                    if (!isNaN(index) && index >= 0 && index < notesData.length) 
                        onNoteClick(index);
                } else {
                    onNoteClick(null); // Clear selection if no note is clicked
                }
                event.stopPropagation(); // Prevent event bubbling
            };
            svgElement.addEventListener('click', clickHandler);
            return () => {
                if (svgElement)
                    svgElement.removeEventListener('click', clickHandler);
            }
        }
    }, [musicData, clef, timeSignature, selectedNoteIndex, onNoteClick, staveDiv, VF]);

    return (
        <div ref={staveDiv} className="music-notation" style={{ width: '100%', overflow: 'auto'}}></div>
    );
}

export default MusicNotation;