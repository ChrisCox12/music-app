import React from 'react';
import Songbar from '../Songbar/Songbar';
import './RelatedSongs.css';


export default function RelatedSongs({ data, artistId, isPlaying, activeSong, handlePauseClick, handlePlayClick }) {
    
    return (
        <div className='RelatedSongs'>
            <h1 className='RelatedSongs__head'>Related Songs:</h1>
            
            <div className='RelatedSongs__Songs'>
                {data?.map((song, index) => (
                    <Songbar 
                        key={`${song?.key || song?.id}-${artistId}`}
                        song={song}
                        index={index}
                        artistId={artistId}
                        isPlaying={isPlaying}
                        activeSong={activeSong}
                        handlePauseClick={handlePauseClick}
                        handlePlayClick={handlePlayClick}
                    />
                ))}
            </div>
        </div>
    )
}