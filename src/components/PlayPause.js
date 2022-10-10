import React from 'react';
import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa';


export default function PlayPause({ isPlaying, activeSong, song, handlePause, handlePlay }) {

    return (
        <>
            {/* Display PlayPause button only if the song has a playable action */}
            {song?.hub?.actions ? (
                <div className='PlayPauseButton'>
                    {/* Displays a play or pause icon depending on whether a song is playing and if that song matches this one */}
                    {(isPlaying && activeSong?.title === song.title && activeSong?.subtitle === song.subtitle) ? (
                        <FaPauseCircle size={35} onClick={handlePause} style={{ color: 'white' }} />
                    ) : (
                        <FaPlayCircle size={35} onClick={handlePlay} style={{ color: 'white' }} />
                    )}
                </div>
            ) : ''}
        </>
        
    )
}