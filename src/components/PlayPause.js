import React from 'react';
import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa';


export default function PlayPause({ isPlaying, activeSong, song, handlePause, handlePlay }) {

    return (
        <div>
            {/* Displays a play or pause icon depending on whether a song is playing and if that song matches this one */}
            {(isPlaying && activeSong?.title === song.title) ? (
                <FaPauseCircle size={35} onClick={handlePause} style={{ color: 'white' }} />
            ) : (
                <FaPlayCircle size={35} onClick={handlePlay} style={{ color: 'white' }} />
            )}
        </div>
    )
}