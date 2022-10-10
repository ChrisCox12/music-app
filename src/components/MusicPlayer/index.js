import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nextSong, prevSong, playPause } from '../../redux/slices/playerSlice';
import Controls from './Controls/Controls';
import Player from './Player';
import Seekbar from './SeekBar/Seekbar';
import Track from './Track/Track';
import VolumeBar from './VolumeBar/VolumeBar';
import './index.css';


export default function MusicPlayer() {
    const dispatch = useDispatch();
    const { activeSong, currentSongs, currentIndex, isActive, isPlaying } = useSelector(state => state.player);
    const [duration, setDuration] = useState(0);
    const [seekTime, setSeekTime] = useState(0);
    const [appTime, setAppTime] = useState(0);
    const [volume, setVolume] = useState(0.3);
    const [repeat, setRepeat] = useState(false);
    const [shuffle, setShuffle] = useState(false);

    
    // if the index changes, then automatically play the song at that index
    useEffect(() => {
        if (currentSongs?.length) dispatch( playPause(true) );
    }, [currentIndex]);


    function handlePlayPause() {
        if (!isActive) return;

        if (isPlaying) {
            dispatch( playPause(false) );
        }
        else {
            dispatch( playPause(true) );
        }
    }

    function handleNextSong() {
        dispatch( playPause(false) );

        if (!shuffle) {
            dispatch( nextSong(currentIndex + 1) );
        }
        else {
            dispatch( nextSong( Math.floor(Math.random() * currentSongs.length) ) );
        }
    }

    function handlePrevSong() {
        if (currentIndex === 0) {
            dispatch( prevSong(currentSongs.length - 1) );
        }
        else if (shuffle) {
            dispatch( prevSong( Math.floor(Math.random() * currentSongs.length) ) );
        }
        else {
            dispatch( prevSong(currentIndex - 1) );
        }
    }

    
    return (
        <div className='MusicPlayer'>
            <Track isPlaying={isPlaying} isActive={isActive} activeSong={activeSong} />

            <div className='MusicPlayer__actions'>
                <Controls 
                    isPlaying={isPlaying}
                    isActive={isActive}
                    repeat={repeat}
                    setRepeat={setRepeat}
                    shuffle={shuffle}
                    setShuffle={setShuffle}
                    currentSongs={currentSongs}
                    handlePlayPause={handlePlayPause}
                    handlePrevSong={handlePrevSong}
                    handleNextSong={handleNextSong}
                />

                <Seekbar 
                    value={appTime}
                    min={0}
                    max={duration}
                    onInput={(e) => setSeekTime(e.target.value)}
                    setSeekTime={setSeekTime}
                    appTime={appTime}
                />

                <Player 
                    activeSong={activeSong}
                    volume={volume}
                    isPlaying={isPlaying}
                    seekTime={seekTime}
                    repeat={repeat}
                    currentIndex={currentIndex}
                    onEnded={handleNextSong}
                    onTimeUpdate={(e) => setAppTime(e.target.currentTime)}
                    onLoadedData={(e) => setDuration(e.target.duration)}
                />
            </div>

            <VolumeBar 
                value={volume} 
                min={0} 
                max={1} 
                onChange={(e) => setVolume(e.target.value)} 
                setVolume={setVolume} 
            />
        </div>
    )
}