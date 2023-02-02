import React from 'react';
import { Link } from 'react-router-dom';
import PlayPause from '../PlayPause';
import ImageNotFound from '../ImageNotFound/ImageNotFound';
import './Songbar.css';


export default function Songbar({ song, index, artistId, isPlaying, activeSong, handlePauseClick, handlePlayClick }) {

    return (
        <div className={`Songbar ${(activeSong?.title && activeSong?.title === song.title && activeSong?.subtitle === song.subtitle) ? '--active' : ''}`}>
            <h3 className='Songbar__Index'>{index + 1}.</h3>

            <div className='Songbar__SongDetails'>
                {song?.attributes?.artwork?.url ? (
                    <img 
                        className='Songbar__SongDetails__Image'
                        src={song.attributes.artwork.url.replace('{w}', '125').replace('{h}', '125')}
                        alt={song?.title}
                    />
                ) : song?.images?.coverart ? (
                    <img 
                        className='Songbar__SongDetails__Image'
                        src={song.images.coverart}
                        alt={song?.title}
                    />
                ) : (
                    <ImageNotFound />
                )}

                <div className='Songbar__SongDetails__Song-Artist'>
                    {!artistId ? (
                        <Link className='Songbar__SongDetails__Song-Artist__Link' to={`/songs/${song?.key}`}>
                            {song?.title}
                        </Link>
                    ) : (
                        <p className='Songbar__SongDetails__Song-Artist__Artist'>
                            {artistId ? song?.attributes?.name : song?.subtitle}
                        </p>
                    )}

                    <p className='Songbar__SongDetails__Artist'>{artistId ? song?.attributes?.albumName : song?.subtitle}</p>
                </div>
            </div>

            {!artistId && (
                <PlayPause 
                    isPlaying={isPlaying}
                    activeSong={activeSong}
                    song={song}
                    handlePause={handlePauseClick}
                    handlePlay={() => handlePlayClick(song, index)}
                />
            )}
        </div>
    )
}