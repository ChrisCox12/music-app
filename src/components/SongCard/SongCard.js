import React from 'react';
import './SongCard.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PlayPause from '../PlayPause';
import ImageNotFound from '../ImageNotFound/ImageNotFound';
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
                <div className={`${(activeSong?.title === song.title && activeSong?.subtitle === song.subtitle) ? 'currentSong': 'hidden'}`}>
                    <PlayPause 
                        song={song} 
                        handlePause={handlePauseClick} 
                        handlePlay={handlePlayClick}
                        isPlaying={isPlaying}
                        activeSong={activeSong} 
                    />
                </div>

                {song?.images?.coverart ? (
                    <img alt='cover art' src={song.images.coverart} />
                ) : (
                    <ImageNotFound />
                )}
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