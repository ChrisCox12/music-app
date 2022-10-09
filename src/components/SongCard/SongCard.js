import React from 'react';
import './SongCard.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PlayPause from '../PlayPause';
import { playPause, setActiveSong } from '../../redux/slices/playerSlice';


export default function SongCard({ song, index, isPlaying, activeSong, data }) {
    const dispatch = useDispatch();


    function handlePauseClick() {
        dispatch( playPause(false) );
    }

    function handlePlayClick() {
        dispatch( setActiveSong({ song, data, index }) );
        dispatch( playPause(true) );
    }


    return (
        <div className='SongCard'>
            <div className='SongCard__art'>
                <div className={`${activeSong?.title === song.title ? 'currentSong': 'hidden'}`}>
                    <PlayPause 
                        song={song} 
                        handlePause={handlePauseClick} 
                        handlePlay={handlePlayClick}
                        isPlaying={isPlaying}
                        activeSong={activeSong} 
                    />
                </div>

                <img alt='cover art' src={song.images?.coverart} />
            </div>

            <div className='SongCard__details'>
                <p className='SongCard__details__title'>
                    <Link to={`/songs/${song?.key}`}>{song.title}</Link>
                </p>
                
                <p className='SongCard__details__artist'>
                    <Link to={song.artists ? `/artists/${song?.artists[0]?.adamid}` : '/top-artists' }>{song.subtitle}</Link>
                </p>
            </div>
        </div>
    )
}