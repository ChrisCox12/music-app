import React from 'react';
import './Controls.css';
import { MdSkipNext, MdSkipPrevious } from 'react-icons/md';
import { BsArrowRepeat, BsFillPauseFill, BsFillPlayFill, BsShuffle } from 'react-icons/bs';


export default function Controls({ 
    isPlaying, 
    repeat, setRepeat, 
    shuffle, setShuffle, 
    currentSongs, handlePlayPause, 
    handlePrevSong, handleNextSong 
}) {

    return (
        <div className='Controls'>
            <BsArrowRepeat className='Controls__repeat' size={20} color={repeat ? 'red' : 'white'} onClick={() => setRepeat(prev => !prev)} />

            {currentSongs?.length && <MdSkipPrevious className='Controls__skip-prev' size={30} color='#fff' onClick={handlePrevSong} />}

            {isPlaying ? (
                    <BsFillPauseFill className='Controls__pause' size={45} color='#fff' onClick={handlePlayPause} />
                ) : (
                    <BsFillPlayFill className='Controls__play' size={45} color='#fff' onClick={handlePlayPause} />
                )
            }

            {currentSongs?.length && <MdSkipNext className='Controls__skip-next' size={30} color='#fff' onClick={handleNextSong} />}

            <BsShuffle className='Controls__shuffle' size={20} color={shuffle ? 'red' : 'white'} onClick={() => setShuffle(prev => !prev)} />
        </div>
    )
}